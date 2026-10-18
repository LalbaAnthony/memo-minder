// src/config.js

// ! Also imported by vite.config.js (PWA manifest), where it runs in Node: import.meta.env is undefined there, hence the `?.`
// ! To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code
// ! https://stackoverflow.com/questions/67378099/import-meta-env-undefined-on-production-build-vitejs

export const VITE_APP_SHORT_NAME='Memo Minder';
export const VITE_APP_NAME='Memo Minder';
export const VITE_APP_COMPANY_NAME='Memo Minder';
export const VITE_APP_AUTHOR_NAME='Anthony Lalba';
export const VITE_APP_DESCRIPTION='Your Personal Time Capsule';
export const VITE_APP_THEME_COLOR='1e2938';
export const VITE_APP_BG_COLOR='1f2937';
export const VITE_FRONT_URL=import.meta.env?.VITE_FRONT_URL;
export const VITE_BACK_API_URL=import.meta.env?.VITE_BACK_API_URL;
export const VITE_GIT_REPO='https://github.com/LalbaAnthony/memo-minder';
export const VITE_APP_VERSION = import.meta.env?.VITE_APP_VERSION;
