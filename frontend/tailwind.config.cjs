import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        rsBlue: '#17242D',
        rsRed: '#E5303E',
        rsGrey: '#677D7C'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
