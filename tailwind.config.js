/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['bumblebee', 'sunset','dracula','dark','luxury'],
  },
  theme: {},
}
