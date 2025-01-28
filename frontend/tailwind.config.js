const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C21010',         // Deep red
        'primary-light': '#E64848',   // Lighter red
        'secondary': '#FFFDE3',       // Light cream
        'secondary-light': '#CFE8A9', // Sage green
        'food-brown': '#C21010',      // Deep red (same as primary)
        'food-brown-light': '#E64848', // Lighter red
        'neutral': '#FFFFFF',         // Pure white background
        'dark': '#1F1F1F',           // Darker text for better contrast
        'success': '#CFE8A9',        // Sage green for success
        'warning': '#E64848',        // Lighter red for warnings
        'error': '#C21010',          // Deep red for errors
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