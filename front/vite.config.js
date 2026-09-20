/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';
import path from 'path';
import { VITE_APP_NAME, VITE_APP_SHORT_NAME, VITE_APP_DESCRIPTION, VITE_APP_THEME_COLOR, VITE_APP_BG_COLOR } from './config.js';

// Resolve the path to the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Get the version from package.json
const version = require('./package.json')?.version || '0.0.0';
process.env.VITE_APP_VERSION = version;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [
        /^\/api\/.*$/
      ],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^\/api\/.*$/,
            handler: 'NetworkOnly',
            options: {
              cacheableResponse: {
                statuses: [200, 201, 202, 204, 206, 304] // Cache only successful responses
              }
            }
          }
        ]
      },
      manifest: {
        name: VITE_APP_NAME,
        short_name: VITE_APP_SHORT_NAME,
        description: VITE_APP_DESCRIPTION,
        theme_color: `#${VITE_APP_THEME_COLOR}`, // Due to the pipe creating front .env file, we cannot use '#'
        background_color: `#${VITE_APP_BG_COLOR}`,
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
  },
})

