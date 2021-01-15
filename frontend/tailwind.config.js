module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens: {
    //   '2xl': { max: '1535px' },
    //   // => @media (max-width: 1535px) { ... }

    //   'xl': { max: '1279px' },
    //   // => @media (max-width: 1279px) { ... }

    //   'lg': { max: '1023px' },
    //   // => @media (max-width: 1023px) { ... }

    //   'md': { max: '767px' },
    //   // => @media (max-width: 767px) { ... }

    //   'sm': { max: '639px' }
    //   // => @media (max-width: 639px) { ... }
    // },
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif']
      },
      colors: {
        'app-bg': {
          light: '#666666',
          DEFAULT: '#2E2E2E',
          dark: '#050505'
        },
        'app-bg-sec': {
          light: '#CCCCCC',
          DEFAULT: '#969696',
          dark: '#666666'
        },
        'app-primary': {
          light: '#6791E0',
          DEFAULT: '#4D7FDB',
          dark: '#2A62CB'
        },
        'app-accent': {
          light: '#F7DB8D',
          DEFAULT: '#F2C649',
          dark: '#E5AC10'
        },
        'app-typeface': {
          DEFAULT: '#F0F0F0',
          alt: '#D6D6D6',
          dark: '#474747',
          muted: '#F0F0F088'
        },
        'app-error': {
          bg: '#CC7676',
          text: '#9C4343'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
