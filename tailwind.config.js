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
    },

  }
}
