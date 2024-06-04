export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", 'sans-serif'],
      },
      colors: {
        'custom-red': '#1434A4', 
      },
      textColor: theme => ({
        ...theme('colors'),
        'custom-red': '#1434A4',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        'custom-red': '#1434A4',
      }),
      screens: {
        'max-sm': {'max': '639px'}, 
      },
    },
  },
  plugins: [],
}