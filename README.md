# 💌 - Memo Minder

## 📖 Technos

- Node.js
- Express
- Vue.js
- Tailwind
- Headless UI

## 🚀 Quick Start

### Config

Create a `.env` file in the project directory. Use the `.env.example` file as a template.

### Backend

```bash
cd back/ && npm i && npm run dev
```

### Frontend

```bash
cd front/ && npm i && npm run dev
```

### Seed data

Seed test data:
```bash
cd back/ && npm run seed
```

### Tests
```bash
cd back/ && npm run test
```

## 🚢 Deployment

### Secrets

Those secrets are required in the deployment environment:
- `PROD_SERVER_IP`: The server IP address
- `PROD_SERVER_USER`: The server user
- `PROD_SERVER_PRIVATE_KEY`: The private key to connect to the server (use `cat ~/.ssh/id_rsa` on local machine to get it)

### Environment

PM2 is used to manage the Node.js process. Make sure to install it on the server.

```bash
# Install NPM
sudo apt install npm

# Install PM2
npm i -g pm2
```
### Web server

Apache is used to serve the frontend. Make sure to install it on the server.

Use the `prod-apache.conf` file to configure the virtual host.
