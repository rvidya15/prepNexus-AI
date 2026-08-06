/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0B0C10',
        darker: '#1F2833',
        lightBg: '#F8FAFC',
        lightCard: '#FFFFFF',
        neonCyan: '#66FCF1',
        neonTeal: '#45A29E',
        textLight: '#C5C6C7',
        textDark: '#0F172A',
      }
    },
  },
  plugins: [],
}
