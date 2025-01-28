const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'food-orange': '#FF6B35',
        'food-sage': '#8BB174',
        'food-cream': '#FFF9F0',
        'food-brown': '#2D1810',
        'primary': '#FF6B35',
        'primary-light': '#FF8B60',
        'secondary': '#FFFDE3',       // Light cream
        'secondary-light': '#CFE8A9', // Sage green
        'food-brown-light': '#E64848', // Lighter red
        'neutral': '#F7F7F7',
        'dark': '#1F1F1F',           // Darker text for better contrast
        'success': '#CFE8A9',        // Sage green for success
        'warning': '#E64848',        // Lighter red for warnings
        'error': '#C21010',          // Deep red for errors
      },
      animation: {
        'bounce-sm': 'bounce-sm 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out'
      },
      keyframes: {
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideUp': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      fontFamily: {
        cinderela: ['Cinderela', 'cursive'],
      },
    },
  },
  plugins: [],
}