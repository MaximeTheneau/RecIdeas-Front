import type { Config } from 'tailwindcss';

const flowbite = require('flowbite-react/tailwind');

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),

  ],
  theme: {
    extend: {
      colors: {
        primary: '#fa8305',
        secondaryLight: '#F1FAEE',
        secondary: '#A8DADC',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
        black: '##111011',
        link: '#012B73',
      },
      boxShadow: {
        custom: '0px -20px 20px 100vh rgba(151, 151, 151, 0.8)',
      },
    },
  },

  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
