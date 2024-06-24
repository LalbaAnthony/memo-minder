// src/config.js

// ! To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code
// ! https://stackoverflow.com/questions/67378099/import-meta-env-undefined-on-production-build-vitejs

export const VITE_SITE_NAME = import.meta.env.VITE_VITE_SITE_NAME;
export const VITE_COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME;
export const VITE_APP_URL = import.meta.env.VITE_APP_URL;
export const BACK_API_URL = import.meta.env.BACK_API_URL;
