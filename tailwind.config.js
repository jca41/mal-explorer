module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  }
}
