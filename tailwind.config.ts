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
        navy: '#30364F',
        'blue-grey': '#ACBAC4',
        beige: '#E1D9BC',
        cream: '#F0F0DB',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(48, 54, 79, 0.08)',
        'soft-lg': '0 8px 32px rgba(48, 54, 79, 0.12)',
      },
      borderRadius: {
        'book': '0.5rem 0.25rem 0.25rem 0.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
