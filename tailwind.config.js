const { gridTemplateColumns } = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'image-content': 'min-content auto',
      },
      keyframes: {
        fade: {
          from: {
            opacity: 0.1
          },
          to: {
            opacity: 1
          }
        }
      },
      animation: {
        fadeIn: 'fade 0.5s ease-in'
      }
    },

  }
}
