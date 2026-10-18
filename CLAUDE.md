# CLAUDE.md

## Overview

Memo Minder ("Your Personal Time Capsule") is a personal journaling PWA: each user records events, seasons (time periods), people and music, links them to each other and to moods. Vue 3 SPA in `front/`, Express REST API in `back/`, MySQL, all run through Docker Compose.

## Tech stack

- Runtime: Node.js 24 (`node:24-alpine3.24` in every Dockerfile; no `engines` field or `.nvmrc`). npm, one `package-lock.json` per package. No root `package.json`, no workspaces.
- Backend (`back/`): plain JavaScript, CommonJS. Express 4, Sequelize 6 + `mysql2`, `jsonwebtoken`, `bcrypt`, Jest 29, nodemon.
- Frontend (`front/`): plain JavaScript, ESM. Vue 3 (`<script setup>` SFCs), Vite 5, vue-router 4 (history mode), Pinia 2 + `pinia-plugin-persistedstate`, Tailwind CSS 3, Headless UI, Heroicons, axios, `vue-toastification`, `@vuepic/vue-datepicker`, `vite-plugin-pwa`. ESLint 8 + Prettier 3.
- Database: MySQL 8.4, `utf8mb4` / `utf8mb4_general_ci`.
- Infra: Docker Compose v2.22+ (Compose Watch), `nginx-unprivileged` in `front-prod`, Apache on the prod host for TLS only.

## Structure

```text
back/
  main.js                         Express entry: middlewares, /api router, schema sync, listen, graceful shutdown
  seed.js                         Destructive seeder (drops all tables)
  src/database.js                 Sequelize instance, model registry, associations
  src/routes.js                   Every API route (mounted under /api)
  src/controllers/                One controller per entity
  src/composables/baseController.js  Generic CRUD handler factories used by most controllers
  src/models/                     Sequelize model factories
  src/middlewares/                auth.js (JWT check), logging.js (request log file)
  src/helpers/                    frmtr (response envelope), logConsole, logFile, code/token generators
  src/seeds/*.json                Seed data
  src/tests/                      Jest tests
  public/                         Favicon/icons served by Express
front/
  src/main.js                     Vue entry (Pinia + persistedstate, router, Toast)
  src/config.js                   App constants + VITE_* re-exports; also imported by vite.config.js (Node)
  src/router/                     routes.js (lazy-loaded pages + meta), index.js (auth guard)
  src/stores/                     Pinia stores; entity stores built with composables/baseStore.js
  src/composables/                api.js (axios wrapper), baseStore.js, helpers
  src/pages/  src/components/  src/layouts/  src/icons/  src/assets/
  vite.config.js                  Vite + PWA config, dev /api proxy
  nginx.conf                      Prod server config (SPA, /api proxy, cache headers, /healthz)
.github/workflows/                CI/CD: *.flow.yml entry workflows (triggers) include *.inc.yml reusable workflows (jobs)
docker-compose.yml                dev and prod profiles
apache.conf                       Reference host vhost (not deployed automatically)
script-setup.ps1                  One-shot local bootstrap (see Gotchas)
.env.example                      Template for the single root .env
```

## Commands

Docker commands come from `README.md` and `docker-compose.yml`. `docker compose config` validates for both profiles, but these commands were not run when this file was written. Commands tagged `(verified)` were run successfully on the host.

Setup:

```bash
cp .env.example .env    # then set secrets; COMPOSE_PROFILES selects dev|prod
```

Dev stack (hot reload through Compose Watch):

```bash
docker compose --profile dev up --build --watch
docker compose --profile dev exec back-dev npm run seed    # first start only: DROPS ALL TABLES
docker compose --profile dev logs -f back-dev
docker compose --profile dev down                          # add -v to drop the db-dev-data volume
```

Tests (backend only):

```bash
docker compose --profile dev exec back-dev npm test
cd back && npm test                                          # (verified)
cd back && npx jest src/tests/helpers/generateCode.test.js   # single file (verified)
```

Lint / format (frontend only; nothing configured for the backend):

```bash
cd front && npx eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore   # check only (verified, passes)
cd front && npm run lint            # same, with --fix (mutates files)
cd front && npx prettier --write <file>
cd front && npm run format          # prettier --write src/ (rewrites the whole tree)
```

Build / prod:

```bash
cd front && npm run build           # vite build -> front/dist (not verified: the host run aborted with a native Node crash after chunk rendering)
docker build -f front/Dockerfile.prod --build-arg VITE_FRONT_URL=https://memo-minder.dev-it.app --build-arg VITE_BACK_API_URL=/api front   # Linux build, as in CI (verified)
docker compose --profile prod up -d --build   # manual fallback; prod deploys go through .github/workflows/deploy.flow.yml
```

CI workflows (lint after editing `.github/workflows/`; from Git Bash prefix `MSYS_NO_PATHCONV=1` and mount `$(pwd -W)`):

```bash
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest   # (verified)
```

Add a dependency without host Node (Compose Watch rebuilds the image on lockfile change; same pattern for `front`):

```bash
docker run --rm -v "$PWD/back:/app" -w /app node:24-alpine3.24 npm install --package-lock-only <package>
```

No typecheck (no TypeScript). For production deploys (CI/CD and the GitHub settings it needs), migrating from the former host MySQL database, backups and logs, see `README.md` § Production.

## Architecture

Request flow:

- Dev: browser -> `front-dev` (Vite on 5173, published on `127.0.0.1:${FRONT_HOST_PORT}`) -> `/api` proxied to `back-dev:3000` via `DEV_API_PROXY_TARGET` -> `db-dev` (also published on `127.0.0.1:${DATABASE_HOST_PORT}`).
- Prod: Apache (host, TLS + ACME) -> `127.0.0.1:${FRONT_HOST_PORT}` -> `front-prod` (nginx :8080, serves `dist/`, proxies `/api/` to `back-prod:3000`) -> `db-prod` on the internal `data` network.
- The browser always calls same-origin `/api` (`VITE_BACK_API_URL`).

Backend:

- Routes in `back/src/routes.js`. Plural path for list/create (`GET|POST /api/events`), singular path for one item (`GET|PUT|DELETE /api/event/:id`). JWT-protected CRUD for events, seasons, people and musics. `moods` are read-only, public, global reference data. User/auth: `/register`, `/login`, `/verify-email`, `/forgot-password`, `/reset-password`, `/user/:id`. Extra: `GET /api/season/current`, `GET /api/people/upcoming-birthdays`.
- Ownership: the user always comes from the verified JWT (`req.user.userId`, set by `back/src/middlewares/auth.js`), never from the request. Every query on user data is scoped with it: another user's record answers 404, `userId` in a body is overwritten, and `/user/:id` answers 403 unless `:id` is the caller's own id.
- CRUD controllers are built with `baseController.getAll|getById|create|update|remove(Model, { searchFields, defaultSort, associations, requiredFields, toSetAssociations })`. `getAll` reads query params `page`, `perPage` (default 10), `search` (LIKE on `searchFields`) and `sort` (array of `{ orderBy, order }`). Many-to-many links are written by sending id arrays under the association alias (`musics`, `people`, `seasons`, `events`). Every id must be numeric and belong to the same user, otherwise the request answers 400 before anything is written. The links are applied via `item.set<Alias>()`.
- Every response goes through `frmtr(status, data, message, pagination)` -> `{ status: 'success'|'error', message, data, pagination? }`.
- Models: `module.exports = (sequelize) => sequelize.define(...)`, optional `Model.associate(models)`, registered in `back/src/database.js`. PK is `<entity>Id`; `tableName` is singular lowercase with `freezeTableName`; `createdAt`/`updatedAt` are `DATEONLY`. Domain rows carry a `userId` FK (`CASCADE`). Event and Season have an optional `moodId`. Implicit join tables: `eventMusic`, `eventPerson`, `eventSeason`, `seasonMusic`, `seasonPerson`, `personMusic`.

Frontend:

- Entity stores (`event`, `season`, `person`, `music`) are `createBaseStore(config)` with `{ name, primaryKey, nicename, endpoints: { all, one, create, update, delete }, pagination, initItem, mapRelations, state, actions, getters }`. State shape: `items { loading, data, pagination }`, `item { loading, data }`. `mapRelations` turns related objects into id arrays before POST/PUT. Stores still pass `userId: authStore.user.userId` as a query param on reads and set it on new items (`initItem`); the API ignores it.
- `front/src/composables/api.js` exports `api.get|post|put|del` and adds `Authorization: Bearer <token>` from the auth store.
- `front/src/stores/auth.js` is persisted (localStorage) and holds `user`, `token` (`connectionToken` from `/login`) and `authenticated`. The guard in `front/src/router/index.js` logs out on `meta.private` routes when unauthenticated.
- Routes (`front/src/router/routes.js`) lazy-load pages and carry meta `{ title, private, displayInSearch, tags, mobileMainClass }`.
- PWA: `generateSW` with `autoUpdate`; `/api/*` is `NetworkOnly` and excluded from the navigate fallback.
- External call from the browser: the home-page quote from `https://quotes-api-self.vercel.app` (`front/src/stores/quote.js`, cached 24 h).

## Conventions

- Backend: CommonJS `require`, 4-space indent, semicolons. No linter or formatter; match the surrounding code. New CRUD entities go through `baseController` plus a model registered in `back/src/database.js`. Routes on user data must use the `checkToken` middleware, and handlers take the user from `req.user.userId`.
- Frontend: ESM, `@/` alias -> `front/src/`. SFCs use `<script setup>` with the template first. Pages are `front/src/pages/<entity>/*Page.vue`; most shared components use the `*Component.vue` suffix, entity cards use `*Item.vue`.
- Prettier (`front/.prettierrc.json`): no semicolons, single quotes, 2 spaces, width 100, no trailing commas. ESLint: `plugin:vue/vue3-essential` + `eslint:recommended`, formatting rules skipped. The existing code is not Prettier-clean (84 files fail `prettier --check`), so format only the files you touch.
- Tailwind: `theme.colors` in `front/tailwind.config.js` replaces the default palette (it is not under `extend`). Only the custom names exist (`primary`, `dark`, `gray-light`, `success`, `warning`, `danger`, their `-light`/`-dark` variants, etc.). Extra breakpoint `xsm` = 460px.
- Pagination: README asks for `perPage` multiples of 12 so grids fill evenly. Current values: event 24, person 12, music 26, season 4.
- Env var prefixes: `BACK_*` backend, `VITE_*` inlined into the frontend bundle, `DATABASE_*` / `COMPOSE_*` / `FRONT_HOST_PORT` for Compose.

## Testing

- Jest 29, backend only; no frontend tests. Files under `back/src/tests/` matching `*.test.js` / `*.spec.js` (`jest.testMatch` in `back/package.json`).
- No test needs a database. Requiring a controller creates the Sequelize instance without connecting. Controller tests mock the models with `jest.mock('../../database', ...)`, and `baseController` tests pass in stub models (see `back/src/tests/composables/baseController.test.js`).
- Coverage: auth middleware, `baseController` ownership scoping, the `/user/:id` ownership check, scoping in the custom person/season handlers, and helper smoke tests.
- Jest is a devDependency, so it exists in `back-dev` and on the host but not in the `back-prod` image.
- Single test: `cd back && npx jest <path>`, or `docker compose --profile dev exec back-dev npx jest <path>`.

## Environment

A single `.env` lives at the repo root (template `.env.example`, git-ignored). Compose interpolates it and passes each container only the variables listed in `docker-compose.yml`; `.env*` is excluded from every Docker build context. Host processes load it with dotenv from `../.env` (`back/main.js`, `back/seed.js`, `back/src/database.js`, `front/vite.config.js`).

| Variable                                         | Consumer         | Notes                                                                                                                                                         |
| ------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `COMPOSE_PROFILES`                               | Compose          | `dev` or `prod`                                                                                                                                               |
| `FRONT_HOST_PORT`                                | Compose          | Loopback port of `front-dev`/`front-prod`; prod value must match `apache.conf` (4560)                                                                         |
| `DATABASE_HOST_PORT`                             | Compose          | Dev only, loopback port of `db-dev`; keep the key in prod to avoid warnings                                                                                   |
| `BACK_DATABASE_ROOT_PASSWORD`                         | `db-*`           | MySQL root password                                                                                                                                           |
| `BACK_DATABASE_NAME` / `_USERNAME` / `_PASSWORD` | `back-*`, `db-*` | Also creates the MySQL database and user on first start                                                                                                       |
| `BACK_TOKEN_SECRET_KEY`                          | `back-*`         | JWT secret (`openssl rand -hex 64`)                                                                                                                           |
| `BACK_TOKEN_EXPIRES_IN`                          | `back-*`         | e.g. `14d`                                                                                                                                                    |
| `BACK_APP_NAME`                                  | `back-*`         | Console log prefix                                                                                                                                            |
| `BACK_EMAIL_FROM` / `_USER` / `_PASSWORD`        | `back-*`         | Passed in but unused (no mailer wired, see Gotchas)                                                                                                           |
| `VITE_FRONT_URL`                                 | front, back      | Prod build arg; backend uses it in logs and the email validation link                                                                                         |
| `VITE_BACK_API_URL`                              | front            | `/api`; prod build arg                                                                                                                                        |
| `BACK_IMAGE` / `FRONT_IMAGE`                     | Compose          | Prod only: written into the server `.env` by `deploy.flow.yml` (registry `sha-<commit>` images). Unset: local `--build` tags                                 |

Set outside `.env`: `NODE_ENV`, `BACK_ENV`, `BACK_PORT=3000` (Dockerfiles); `BACK_DATABASE_HOST`, `BACK_DATABASE_PORT` (Compose; `database.js` falls back to `127.0.0.1:3306`); `DEV_API_PROXY_TARGET` (Compose, `front-dev` only).

External services: MySQL 8.4 (container), the public quotes API (called from the browser), Docker Hub (prod images) and GitHub Actions (CI/CD, see `README.md` § CI/CD).

## Gotchas

- No migrations. In dev the backend runs `sequelize.sync({ alter: true })` on startup (`BACK_ENV=development`). Prod runs a plain `sync()`, which only creates missing tables, so changing an existing table needs manual SQL on `db-prod`.
- Declare unique constraints as named model `indexes`, never as column `unique: true`: every `alter` sync re-adds a column-level UNIQUE as a new index (see the comment in `back/src/models/userModel.js`).
- `seed.js` / `npm run seed` runs `sync({ force: true })` and drops every table. Moods are always inserted; sample users/data only when `BACK_ENV=development`. The seeded dev account (email already validated) is in `back/src/seeds/users.json`.
- Per-user isolation depends on `req.user.userId`. A new handler that reads `userId` from query, body or params, or a query on user data that is not scoped by `userId`, reopens cross-user access. Included associations are not filtered by `userId` on read; they are safe only because link ids are ownership-checked on write.
- No email is ever sent: `back/src/helpers/email.js` is never imported and `nodemailer` is not installed. `userController` `console.log`s the registration validation link and the reset-password code; read them with `docker compose --profile dev logs back-dev`. Login is refused until the email is validated.
- Handlers built by `baseController`, plus `getCurrentSeason` and `getUpcommingBirthdaysPeople`, have no try/catch. Express 4 does not forward rejected promises, so a DB error leaves the request hanging. The `catch` in `userController.login` is commented out, with the same effect.
- `front/src/composables/api.js`: `validateStatus` accepts any status < 500, so 4xx responses resolve and callers must check `resp.status`. 401 triggers a logout, 204 returns `undefined`, and 5xx or network errors hard-redirect to `/error-server`.
- `VITE_*` values are inlined at build time, so changing them means rebuilding `front-prod`. `front/src/config.js` also runs in Node (imported by `vite.config.js`): keep it free of browser-only APIs and read env through `import.meta.env?.`.
- `npm run lint` applies `--fix`, and `npm run format` rewrites all of `front/src/`.
- Running the apps directly on the host is not wired up: `BACK_PORT`/`BACK_ENV` are only set in the Dockerfiles and `DEV_API_PROXY_TARGET` only in Compose. Without them the backend listens on a random port and Vite does not proxy `/api`.
- Prod `back-prod`/`front-prod` run as non-root with a read-only root filesystem, `cap_drop: ALL` and a `/tmp` tmpfs. The backend can only write `logs/` (volume `back-prod-logs`), and `logFile` uses the cwd-relative path `logs/logs.log`. Any new write path needs a volume or tmpfs.
- `back-prod`'s healthcheck is a TCP probe on purpose: an HTTP probe would add a line to `logs/logs.log` on every check.
- Compose Watch syncs sources (never `node_modules`) and rebuilds the image when `package.json`/`package-lock.json` changes.
- `script-setup.ps1` overwrites `.env` with `.env.example` (`Copy-Item`) and seeds the database (drops all tables). Do not run it on a configured checkout.
- `apache.conf` is a reference copy, not deployed; its proxy port (4560) must match the prod `FRONT_HOST_PORT`.
- `deploy.flow.yml` rewrites the server `.env` on every deploy from its `Generate .env` step. A new variable in `docker-compose.yml` must be added there and as a GitHub secret, otherwise Compose interpolates an empty string in prod.
- The workflows read every setting from `secrets`, none from `vars`. The `secrets` context is unavailable in `strategy`, in the `with:` of a reusable workflow call and in `environment.url`: pass values through `secrets:` and step `env`/`with`. A job output that contains a secret value is dropped by the runner.
- The image references contain the Docker Hub namespace, which equals the `DOCKERHUB_USERNAME` secret, so `docker.inc.yml` cannot return them as outputs. `deploy.flow.yml` owns `IMAGE_PREFIX` (passed to `docker.inc.yml` as `image-prefix`) and rebuilds `<IMAGE_PREFIX>-<service>:sha-<commit>` itself: change the tag scheme in both files together.
- `tests-*.flow.yml` are path-filtered and skip PRs into `main` (`deploy.flow.yml` runs every suite there). Marking one of their checks as required would block PRs that do not touch that side.
- The deploy prunes this project's unused images on the server by the `org.opencontainers.image.source` label set in `docker.inc.yml`: change both together.
