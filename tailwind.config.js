/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        worksans: ['Work Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
