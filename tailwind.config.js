/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#F5E6D3',
          200: '#E6D0B8',
          500: '#8B4513',
        },
        peach: {
          100: '#FFDAB9',
          200: '#FFDAB9',
        },
      },
    },
  },
  plugins: [],
};
