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
        dark: '#1E1E2E', // Soft dark lavender/indigo for dark mode
        darker: '#181825',
        lightBg: '#F8F9FA', // Clean white/gray
        lightCard: '#FFFFFF',
        neonCyan: '#B4BEFE', // Soft Lavender/Periwinkle
        neonTeal: '#CBA6F7', // Deep Lavender
        textLight: '#CDD6F4',
        textDark: '#4C4F69',
      }
    },
  },
  plugins: [],
}
