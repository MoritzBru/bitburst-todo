/* eslint-env node */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      blue: {
        light: '#41A0FF',
        DEFAULT: '#0080FF',
        dark: '#005FBC',
      },
      white: '#FFFFFF',
      chrome: '#EEEEEE',
      gray: {
        light: '#CCCCCC',
        DEFAULT: '#BBBBBB',
        dark: '#AAAAAA',
      },
      black: '#121212',
    },
    extend: {
      screens: {
        container: '844px',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        container: '812px',
      },
      fontSize: {
        xxs: ['0.625rem', '0.75rem'], // 10px, 12px
        small: ['0.8125rem', '0.9375rem'], // 13px, 15px
        regular: ['0.9375rem', '1.125rem'], // 15px, 18px
        '2.5xl': ['1.75rem', '2rem'], // 28px, 32px
      },
    },
  },
  plugins: [],
};
