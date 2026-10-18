# 📝 - Memo Minder

## 📰 - Credits

This web app have been inspired by [this youtube video](https://www.youtube.com/watch?v=X7ZxomW71Vs).
This web app use [https://github.com/well300/quotes-api](https://github.com/well300/quotes-api) to fetch quotes in the home page.

## 📖 - Technos

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Vue.js](https://vuejs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [Docker](https://docs.docker.com/)

## 🚀 - Quick Start

### Requirements

Docker Engine (or Docker Desktop) with Compose v2.22+ for Compose Watch. Node.js is not required on the host.

### Config

Create a `.env` file at the project root, using `.env.example` as a template. It is the single configuration source: Docker Compose interpolates it and passes each container only the variables it needs. `COMPOSE_PROFILES` selects the stack (`dev` or `prod`), so `--profile` can be omitted once it is set.

| Profile | Services                             | Purpose                                                |
| ------- | ------------------------------------ | ------------------------------------------------------ |
| `dev`   | `db-dev`, `back-dev`, `front-dev`    | Hot reload through Compose Watch, MySQL                |
| `prod`  | `db-prod`, `back-prod`, `front-prod` | Optimized images, MySQL, behind the host reverse proxy |

### Development

```bash
docker compose --profile dev up --build --watch
```

The app is served on `http://localhost:<FRONT_HOST_PORT>`. The browser only talks to Vite, which proxies `/api` to `back-dev` (same origin as in production).

Compose Watch syncs `back/` and `front/` into the containers: nodemon restarts the backend and Vite hot-reloads the frontend. Any change to a `package.json` or `package-lock.json` rebuilds the matching image. `--build` makes sure the images match the current sources when the stack starts.

The dev database is MySQL, same image and settings as in production, running in `db-dev` with its data in the `db-dev-data` volume. It is reachable from the host on `127.0.0.1:<DATABASE_HOST_PORT>` for SQL clients. In development the backend syncs the schema with the models on startup (`sync({ alter: true })`). Seed it on first start (drops and recreates all tables, then inserts sample data):

```bash
docker compose --profile dev exec back-dev npm run seed
```

Tests:

```bash
docker compose --profile dev exec back-dev npm test
```

Add a dependency by updating the manifest and lockfile on the host, Compose Watch then rebuilds the image (no host Node.js needed):

```bash
docker run --rm -v "$PWD/back:/app" -w /app node:24-alpine3.24 npm install --package-lock-only <package>
```

Stop the stack with `docker compose --profile dev down` (add `-v` to also drop the database volume).

## 🚢 - Production

### Architecture

```text
Internet -> Apache (host: TLS + ACME) -> 127.0.0.1:FRONT_HOST_PORT -> front-prod (nginx: SPA + /api proxy) -> back-prod (Express) -> db-prod (MySQL)
```

Only `front-prod` is published, and only on the loopback interface: Docker-published ports bypass host firewalls such as ufw. `db-prod` sits on an internal network that only `back-prod` can reach. `back-prod` and `front-prod` run as non-root users with a read-only root filesystem and no Linux capabilities.

### CI/CD

GitHub Actions workflows live in `.github/workflows/`. Reusable workflows (`*.inc.yml`) hold the jobs, entry workflows (`*.flow.yml`) define the triggers and include them.

| Workflow                          | Runs on                                                                     | Jobs                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `tests-back.flow.yml`             | Push on `develop` and PRs into any branch but `main`, when `back/` changes  | Jest (`tests-back.inc.yml`)                                                                        |
| `tests-front.flow.yml`            | Push on `develop` and PRs into any branch but `main`, when `front/` changes | ESLint check and Vite build (`tests-front.inc.yml`)                                                |
| `deploy.flow.yml` (`CI & Deploy`) | Push and PRs on `main` when app files change, the 2nd of each month, manual | Both test suites, prod image build (`docker.inc.yml`). On `main` only: push to Docker Hub, deploy |

On `main`, the images are pushed to `docker.io/lalbaanthony/memo-minder-back` and `docker.io/lalbaanthony/memo-minder-front`, tagged `main` and `sha-<commit>`. They are built for `linux/amd64`. The Docker Hub repositories must be public, otherwise run `docker login` as the deploy user on the server. The deploy job connects over SSH, uploads `docker-compose.yml` and a `.env` generated from the GitHub settings to `DEPLOY_PATH`, then runs `docker compose pull` and `docker compose up -d --wait`. That `.env` pins the deployed `sha-<commit>` images (`BACK_IMAGE`, `FRONT_IMAGE`), so manual Compose commands on the server keep running them. It is rewritten on every deploy: change values in GitHub, not on the server. The monthly run rebuilds and redeploys `main` so the images pick up base image security patches.

GitHub settings, all of them Actions secrets :

| Scope                    | Name                                                                     | Notes                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Repository               | `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`                                  | Docker Hub access token with read & write access                                                              |
| Repository               | `VITE_FRONT_URL`                                                         | `https://memo-minder.dev-it.app`. Repository level: the image build runs outside the `production` environment |
| Repository               | `VITE_BACK_API_URL`                                                      | Optional, defaults to `/api`                                                                                  |
| `production` environment | `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`                                | Deploy user and its private key (no passphrase)                                                               |
| `production` environment | `SSH_PORT`                                                               | Optional, defaults to `22`                                                                                    |
| `production` environment | `DEPLOY_PATH`                                                            | Absolute path of the stack folder on the server                                                               |
| `production` environment | `BACK_TOKEN_SECRET_KEY`, `BACK_DATABASE_ROOT_PASSWORD`                        |                                                                                                               |
| `production` environment | `BACK_DATABASE_NAME`, `BACK_DATABASE_USERNAME`, `BACK_DATABASE_PASSWORD` |                                                                                                               |
| `production` environment | `FRONT_HOST_PORT`, `BACK_APP_NAME`, `BACK_TOKEN_EXPIRES_IN`              | Optional, default to `4570`, `Memo Minder` and `14d`                                                          |
| `production` environment | `BACK_EMAIL_FROM`, `BACK_EMAIL_USER`, `BACK_EMAIL_PASSWORD`              | Optional, no mailer is wired                                                                                  |

Values must not contain single quotes or line breaks (the `.env` is written single-quoted). GitHub masks every occurrence of a secret value in the logs, short values included: a set `FRONT_HOST_PORT` turns each `4570` into `***`. Restrict the `production` environment to the `main` branch (Settings > Environments > Deployment branches). The database values must match the existing volume: MySQL only applies them when it initializes an empty data directory.

### Server setup

1. Install Docker Engine and the Compose plugin. Create a deploy user in the `docker` group and add the public key matching `SSH_PRIVATE_KEY` to its `~/.ssh/authorized_keys`.
2. Install `apache.conf` as the virtual host (its proxy port must match `FRONT_HOST_PORT`), enable the required modules with `a2enmod proxy proxy_http headers ssl rewrite http2`, then reload Apache.
3. Fill in the GitHub settings above, then push to `main` or run `CI & Deploy` on `main` from the Actions tab. No clone is needed: the deploy creates `DEPLOY_PATH` and writes `docker-compose.yml` and `.env` (mode 600) there.

`VITE_*` variables are inlined into the frontend bundle when the image is built: changing them requires a new `CI & Deploy` run.

Switching from a stack started from a clone: the Compose project is always named `memo-minder` (top-level `name`), so its containers and volumes are reused whatever `DEPLOY_PATH` is. Copy the values of its `.env` into the GitHub settings before the first CI deploy.

Without CI, the stack still builds on the server from a clone: leave `BACK_IMAGE` and `FRONT_IMAGE` unset in `.env` and run `docker compose --profile prod up -d --build`.

### Database initialization

The deploy never seeds the database. Commands below run from `DEPLOY_PATH`, after the first deploy has written `docker-compose.yml` and `.env` there.

Fresh install: `seed.js` drops all tables, then inserts the reference moods (sample data is skipped in production). Never run it on a database holding real data.

```bash
docker compose --profile prod run --rm back-prod node seed.js
```

Migration from the former host MySQL database:

```bash
# On the host, before switching to Docker
mysqldump --single-transaction -u root -p memo-minder > memo-minder.sql

# Stop the app, import the dump over the empty tables created on startup, then restart it
docker compose --profile prod stop front-prod back-prod
gunzip -c memo-minder-2026-08-10.sql.gz | docker compose --profile prod exec -T db-prod sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"'
docker compose --profile prod up -d
```

### Deploy an update

Merge into `main`: `CI & Deploy` tests, builds, pushes and deploys it.

Rollback: re-run the `🚀 Deploy to Production` job of an earlier successful `CI & Deploy` run (GitHub allows re-runs for 30 days). It redeploys that run's `sha-<commit>` images with the current settings. Without CI, set `BACK_IMAGE` and `FRONT_IMAGE` in the server `.env` to an older `sha-<commit>` tag and run `docker compose --profile prod up -d`; the next deploy overwrites them.

### Operations

From `DEPLOY_PATH` on the server:

```bash
# Container logs
docker compose --profile prod logs -f back-prod

# Request log file (back-prod-logs volume)
docker compose --profile prod exec back-prod tail -f logs/logs.log

# Database backup
docker compose --profile prod exec -T db-prod sh -c 'exec mysqldump --single-transaction -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' > backup.sql
```

## 🧱 - Frontend

### Stores

In most Pinia stores, the `perPage` value in the `pagination` object is almost always a 12 multiple (12, 24, 36, ...). This is to ensure a good display in all screen sizes.
