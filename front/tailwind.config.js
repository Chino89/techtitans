// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
    theme: {
    extend: {
      colors: {
        'noc-orange': '#f46c18',
        'noc-blue': '#0033a0',
        'noc-white': '#fcfcfc',
        'noc-black': '#2a2a2a',
      },

    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
