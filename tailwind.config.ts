import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
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
  plugins: [require('flowbite/plugin')],
};
export default config;
