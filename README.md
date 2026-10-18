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

| Profile | Services | Purpose |
| --- | --- | --- |
| `dev` | `db-dev`, `back-dev`, `front-dev` | Hot reload through Compose Watch, MySQL |
| `prod` | `db-prod`, `back-prod`, `front-prod` | Optimized images, MySQL, behind the host reverse proxy |

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

### Server setup

1. Install Docker Engine and the Compose plugin.
2. Clone the repository and create `.env` from `.env.example` with `COMPOSE_PROFILES=prod`, `FRONT_HOST_PORT=4560`, `VITE_FRONT_URL=https://memo-minder.dev-it.app` and strong secrets (`openssl rand -hex 64`). Restrict it with `chmod 600 .env`.
3. Install `apache.conf` as the virtual host (its proxy port must match `FRONT_HOST_PORT`), enable the required modules with `a2enmod proxy proxy_http headers ssl rewrite http2`, then reload Apache.
4. Start the stack:

```bash
docker compose --profile prod up -d --build
```

`VITE_*` variables are inlined into the frontend bundle at build time: any change to them requires rebuilding `front-prod`.

### Database initialization

Fresh install: `seed.js` drops all tables, then inserts the reference moods (sample data is skipped in production). Never run it on a database holding real data.

```bash
docker compose --profile prod run --rm back-prod node seed.js
```

Migration from the former host MySQL database:

```bash
# On the host, before switching to Docker
mysqldump --single-transaction -u root -p memo-minder > memo-minder.sql

# Start the database container alone, import the dump, then start the full stack
docker compose --profile prod up -d db-prod
docker compose --profile prod exec -T db-prod sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < memo-minder.sql
docker compose --profile prod up -d --build
```

### Deploy an update

```bash
git pull
docker compose --profile prod up -d --build
docker image prune -f
```

### Operations

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
