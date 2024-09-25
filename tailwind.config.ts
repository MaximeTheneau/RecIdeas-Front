import type { Config } from 'tailwindcss';

const flowbite = require('flowbite-react/tailwind');

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
    './src/**/**/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
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
    },
  },

  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
