/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'default': '#222222',
        'section': '#1a1a1a',
      },
      // fontFamily: {
      //   'poppins': ['Poppins', 'sans-serif'],
      // },
    },
  },
  plugins: [],
};
