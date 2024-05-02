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
      'light-success': '#34d399',
      success: '#10b981',
      'dark-success': '#047857',
      'light-warning': '#fbbf24',
      warning: '#f59e0b',
      'dark-warning': '#d97706',
      'light-danger': '#ef4444',
      danger: '#dc2626',
      'dark-danger': '#991b1b',    
    },
  },
  plugins: [],
}