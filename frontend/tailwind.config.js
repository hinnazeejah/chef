const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'food-orange': '#D94E1F',
        'food-cream': '#FFF9F2',
        'food-sage': '#7C9082',
        'food-brown': '#2C1810',
        'food-peach': '#FFDED4',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'bounce-sm': 'bounce-sm 0.5s ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200%' },
          '100%': { backgroundPosition: '200%' },
        },
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
}