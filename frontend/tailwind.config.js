const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9B2C2C',         // Deep red
        'primary-light': '#C53030',   // Lighter red
        'secondary': '#8B4513',       // Saddle brown
        'food-brown': '#5C4033',      // Rich brown
        'food-tan': '#D2B48C',        // Tan
        'neutral': '#f8fafc',         // Light background
        'dark': '#2D1810',           // Dark brown text
        'success': '#2F855A',        // Forest green
        'warning': '#C05621',        // Burnt orange
        'error': '#9B2C2C',          // Deep red
      },
      animation: {
        'bounce-sm': 'bounce-sm 0.5s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-in',
      },
      keyframes: {
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}