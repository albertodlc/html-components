/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        'facebook-color': '#4267B2',
        'instagram-color': '#C13584',
        'linkedin-color': '#0077b5',
        'twitter-color': '#1DA1F2'
      },
      display: ["group-hover"],
      fontFamily: {
        'libre-baskerville': ['"Libre Baskerville"', 'serif'],
      },
    },
  },
  plugins: [],
}

