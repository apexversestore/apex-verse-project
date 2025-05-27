/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          primary: '#3b82f6',
          secondary: '#10b981',
          dark: '#1e293b',
          light: '#f8fafc',
          accent: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}