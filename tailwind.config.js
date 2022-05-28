module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
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
