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

## 🚀 - Quick Start

### Config

Create a `.env` file in the project directory. Use the `.env.example` file as a template.

### Frontend

```bash
cd front ; npm i ; npm run dev
```

### Backend

Start backend with dev data:

```bash
cd back ; npm i ; npm run seed ; npm run dev
```

Tests:

```bash
cd back ; npm run test
```

## 🧱 - Frontend

### Stores

In most Pinia stores, the `perPage` value in the `pagination` object is almost always a 12 multiple (12, 24, 36, ...). This is to ensure a good display in all screen sizes.

## 🚢 - Deployment

### Flow

Push to `preprod` branch to deploy on preproduction server.
```sh
git checkout preprod
git pull ; git add . ; git commit -m 'Remove release date from musics' ; git push
```

Merge `preprod` branch into `main` branch to deploy on production.
```sh
git checkout main ; git pull origin preprod ; git push
git checkout preprod    
```

### Secrets

Those secrets are required in the deployment environment:
- `PROD_SERVER_IP`: The server IP address
- `PROD_SERVER_USER`: The server user
- `PROD_SERVER_PRIVATE_KEY`: The private key to connect to the server (could use `cat ~/.ssh/id_rsa` on local machine to get it)
- `PROD_VITE_*`: The Vite environment variables, they're all stored as secrets in github and used to recreate the `.env` right before the build
- 
- `PREPROD_SERVER_IP`: The server IP address
- `PREPROD_SERVER_USER`: The server user
- `PREPROD_SERVER_PRIVATE_KEY`: The private key to connect to the server (could use `cat ~/.ssh/id_rsa` on local machine to get it)
- `PREPROD_VITE_*`: The Vite environment variables, they're all stored as secrets in github and used to recreate the `.env` right before the build

### Environment

In production or preproduction, `.env` file must be created in the project directory to feed backend. Use the `.env.prod` or `.env.preprod` file as a template.

PM2 is used to manage the Node.js process. Make sure to install it on the server.

```bash
# Install NPM
sudo apt install npm

# Install PM2
npm i -g pm2
```

### Web server

Apache is used to serve the frontend. Make sure to install it on the server.

Use the `apache.*.conf` files to configure all virtuals hosts.

### Database

MySQL is used to store the data. Make sure to install it on the server.

Use the `mysql.prod.sql` file to configure the database.

> NOTE: For now, no migration system is used. Which mean adding a new field in the database will require to update the database manually on production.

E.g. After removing `user.homePageEnableLasts` and adding `user.homePageEnableLastsEvents` and `user.homePageEnableLastsSeasons`, I had to run this SQL query on both preprod and prod databases:
```sql
ALTER TABLE `user`
DROP COLUMN `homePageEnableLasts`;

ALTER TABLE `user`
ADD `homePageEnableLastsEvents` tinyint(1) NOT NULL DEFAULT 1;
ALTER TABLE `user`
ADD `homePageEnableLastsSeasons` tinyint(1) NOT NULL DEFAULT 1;
```
