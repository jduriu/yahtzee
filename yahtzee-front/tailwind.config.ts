import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['var(--font-play)']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'blue': '0 0 30px blue',
        'purple': '0 0 30px rgba(138, 0, 255, .7)',
        'dark': '10px 10px 40px -2px rgba(0,0,0,0.75)',
        'neuro': '-7px -7px 20px 0 rgba(255, 255, 255, 0.7), 7px 7px 20px 0 rgba(0, 0, 0, 0.2)',
        'neuro-press': 'inset -7px -7px 20px 0 rgba(255, 255, 255, 0.7), inset 7px 7px 20px 0 rgba(0, 0, 0, 0.2)',
      },
      dropShadow: {
        'glow-pink': "0px 0px 8px rgba(239, 41, 143, 1)",
        'glow-blue': "0px 0px 20px rgba(72, 181, 232, 1)",
      }
    },
  },
  plugins: [],
}
export default config
