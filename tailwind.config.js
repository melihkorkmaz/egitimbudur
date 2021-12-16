const theme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      ...theme.boxShadow,
      lg: '0 4px 24px 0 rgb(34 41 47 / 10%);',
    },
    extend: {
      colors: {
        primary: {
          light: '#04cf8b',
          DEFAULT: '#03b97c',
        },
      },
      fontFamily: {
        'sans-serif': "'Jost', sans-serif"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
