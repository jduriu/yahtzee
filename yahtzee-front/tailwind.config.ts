import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neuro': '-7px -7px 20px 0 rgba(255, 255, 255, 0.7), 7px 7px 20px 0 rgba(0, 0, 0, 0.2)',
        'neuro-press': 'inset -7px -7px 20px 0 rgba(255, 255, 255, 0.7), inset 7px 7px 20px 0 rgba(0, 0, 0, 0.2)',
      },
      dropShadow: {
        'glow-pink': "0px 0px 8px rgba(239, 41, 143, 1)",
        'glow-blue': "0px 0px 8px rgba(72, 181, 232, 1)",
      }
    },
  },
  plugins: [],
}
export default config
