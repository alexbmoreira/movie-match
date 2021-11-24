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
    colors: {
      transparent: 'transparent',
      'background': {
        DEFAULT: '#404142'
      },
      'panel': {
        DEFAULT: '#7D7E88'
      },
      'primary': {
        disabled: '#9EAEE7',
        light: '#5D72BA',
        DEFAULT: '#495C9C',
        dark: '#3B4C84'
      },
      'secondary': {
        DEFAULT: '#DF3131'
      },
      'accent': {
        DEFAULT: '#F2C649'
      },
      'typeface': {
        light: '#FAFAFA',
        DEFAULT: '#F0F0F2',
        dark: '#DEDEE3'
      },
      'app-like': {
        DEFAULT: '#D13115'
      },
      'error': {
        bg: '#CC7676',
        text: '#ED1F1F'
      }
    },
    extend: {
      backgroundImage: () => ({
        'poster-collage': "linear-gradient(#2E2E2EE5, #050505E5), url('../images/backdrop.png')",
        'not-found': "linear-gradient(#2E2E2E88, #2E2E2E88), url('../images/404_backdrop.jpg')"
      }),
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif']
      },
      transitionProperty: {
        height: 'height',
        width: 'width'
      },
      zIndex: {
        '-10': '-10'
      },
      fontSize: {
        '2xs': '0.66rem'
      },
      width: {
        'poster-sm': '92px',
        'poster-md': '154px',
        'poster-lg': '500px',
        'poster-og': '1000px'
      },
      height: {
        'poster-sm': '138px',
        'poster-md': '231px',
        'poster-lg': '750px',
        'poster-og': '1500px'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: []
}
