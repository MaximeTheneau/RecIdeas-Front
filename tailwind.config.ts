import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      1: '0.05rem',
    },
    extend: {
      colors: {
        primary: '#fa8305',
        secondaryLight: '#f1f0ef',
        secondary: '#d1c9c0',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
        black: '#111011',
        blackOpacity: '#1807e7e',
        link: '#012B73',
      },
      boxShadow: {
        custom: '0px -20px 20px 100vh rgba(151, 151, 151, 0.8)',
      },
    },
  },

};
export default config;
