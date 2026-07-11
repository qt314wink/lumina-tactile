import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lumina-purple': '#7C3AED',
        'lumina-blue': '#2563EB',
        'lumina-lit': '#A78BFA',
        'lumina-dark': '#0F0F1A',
      },
      boxShadow: {
        'neo-skeuo': '6px 6px 12px rgba(0,0,0,0.4), -3px -3px 8px rgba(255,255,255,0.08)',
        'neo-skeuo-lit': '0 0 24px rgba(167,139,250,0.5), 6px 6px 12px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
