/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      screens: {
        min700: "700px"
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
