/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        patriot: {
          red: '#B22234',
          blue: '#3C3B6E',
          white: '#FFFFFF',
        }
      }
    },
  },
  plugins: [],
}
