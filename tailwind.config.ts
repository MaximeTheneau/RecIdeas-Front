import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // borderWidth: {
    //   DEFAULT: '1px',
    //   1: '0.05rem',
    // },
    extend: {
      colors: {
        primary: '#ffd676',
        secondaryLight: '#f1f0ef',
        secondary: '#98dddf',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
        black: '#111011',
        blackOpacity: '#1807e7e',
        link: '#012B73',
        form: '#717388',
      },
      boxShadow: {
        custom: '0px -20px 20px 100vh rgba(151, 151, 151, 0.8)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
      },
      animation: {
        spin: 'spin 1s ease-in-out infinite',
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },

};
export default config;
