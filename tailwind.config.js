
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require("daisyui")
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
        "fade-in": 'fade 0.8s ease-in-out',
        "fade-in-fast": 'fade 0.5s ease-in-out',
      }
    },
  },
  daisyui: {
    themes: ['dracula', 'cupcake', 'business', 'winter', 'night', 'fantasy', 'autumn', 'valentine']
  }
}
