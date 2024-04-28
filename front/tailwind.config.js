// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: '#248f89',
      'primary-light': '#4dcfc1',
      light: '#ffffff',
      gray: '#4B5563',
      dark: '#090E16',
      'light-dark': '#121826',
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