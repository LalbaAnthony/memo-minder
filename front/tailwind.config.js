// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: '#76a9fa',
      light: '#ffffff',
      'light-gray': '#9ca3af',
      gray: '#4b5563',
      'dark-gray': '#374151',
      'light-dark': '#1f2937',
      dark: '#111827',
      success: '#3caf57',
      'light-success': '#b8ffc9',
      warning: '#cf4a02',
      'light-warning': '#fabd9c',
      danger: '#cf0d0d',
      'light-danger': '#fda8a8',
    },
  },
  plugins: [],
}