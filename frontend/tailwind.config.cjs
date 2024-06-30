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
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#FFE5E7',
              100: '#FFCCD1',
              200: '#FFB3BA',
              300: '#FF99A3',
              400: '#FF808C',
              500: '#FF6675',
              600: '#E5303E',
              700: '#CC2B36',
              800: '#B3252F',
              900: '#991F27',
              DEFAULT: '#E5303E',
              foreground: '#ffffff'
            },
            secondary: {
              50: '#EDF0F0',
              100: '#D8E0DF',
              200: '#C2D0CF',
              300: '#ACBFBE',
              400: '#96AFAD',
              500: '#7F9E9C',
              600: '#677D7C',
              700: '#5E7372',
              800: '#556867',
              900: '#4C5E5D',
              DEFAULT: '#677D7C',
              foreground: '#ffffff'
            }
          }
        }
      }
    })
  ]
};
