// src/config.js

// ! Single source of truth is ../config.js, also consumed by vite.config.js for the PWA manifest:
// ! static app metadata is hardcoded there, deployment-specific values come from import.meta.env
// ! To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ are exposed to your Vite-processed code
// ! https://stackoverflow.com/questions/67378099/import-meta-env-undefined-on-production-build-vitejs

export * from '../config.js'
