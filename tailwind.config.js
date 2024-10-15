/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-brown': 'var(--color-light-brown)',
        'light-peach': 'var(--color-light-peach)',
        'red': 'var(--color-red)',
      },
    },
  },
  plugins: [],
};
