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
