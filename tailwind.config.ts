import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/ui/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
