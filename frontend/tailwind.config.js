module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { max: '639px' }
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'roboto-slab': ['Roboto Slab', 'serif']
    },
    colors: {
      'app-bg': {
        light: '#707070',
        DEFAULT: '#616161',
        dark: '#5C5C5C'
      },
      'app-bg-sec': {
        light: '#D6D6D6',
        DEFAULT: '#CBCBCB',
        dark: '#C2C2C2'
      },
      'app-primary': {
        dark: '#60548C',
        DEFAULT: '#534879',
        light: '#4F4573'
      },
      'app-accent': {
        dark: '#E9CD5D',
        DEFAULT: '#E5C442',
        light: '#E4C23A'
      },
      'app-typeface': {
        dark: '#EBEBEB',
        DEFAULT: '#F0F0F0',
        light: '#FFFFFF'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
