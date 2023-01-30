/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': 'var(--secondary-colour)',
      },
      backgroundColor: {
        'primary': 'var(--primary-colour)',
        'secondary': 'var(--secondary-colour)',
      },
      borderColor: {
        'primary': 'var(--secondary-colour)',
      }
    },
    colors: {
      'primary': 'var(--primary-colour)',
      'secondary': 'var(--secondary-colour)',
    }
  },
  plugins: [],
}
