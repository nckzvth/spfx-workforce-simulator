/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        msBlue: {
          DEFAULT: '#0078D4',
          dark: '#005A9E',
          light: '#2B88D8',
          subtle: '#EFF6FC'
        },
        msGray: {
          bg: '#F3F2F1',
          border: '#EDEBE9',
          card: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
