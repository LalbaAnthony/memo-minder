// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      'primary-light': '#a6c8ff',
      primary: '#76a9fa',
      'primary-dark': '#5b96f7',
      light: '#ffffff',
      'gray-light': '#9ca3af',
      gray: '#4b5563',
      'gray-dark': '#374151',
      'dark-light': '#1f2937',
      dark: '#111827',
      'success-light': '#34d399',
      success: '#10b981',
      'success-dark': '#047857',
      'warning-light': '#fbbf24',
      warning: '#f59e0b',
      'warning-dark': '#d97706',
      'danger-light': '#ef4444',
      danger: '#dc2626',
      'danger-dark': '#991b1b',
      'password-step-1': '#dc2626',
      'password-step-2': '#dc7e26',
      'password-step-3': '#dcd926',
      'password-step-4': '#78dc26',
      'password-step-5': '#29af00',
    },
    screens: {
      'xsm': '460px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}