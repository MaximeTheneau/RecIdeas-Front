import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B461A8',
        secondaryLight: '#B461A801',
        secondary: '#B461A7',
        white: '#ffffff',
        whiteOpacity: 'rgba(255, 255, 255, 0.5)',
        black: '#B461A8',
      },
    },
  },
  
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
