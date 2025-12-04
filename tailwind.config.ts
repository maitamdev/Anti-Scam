import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        safe: '#22c55e',
        caution: '#f59e0b',
        dangerous: '#ef4444',
      },
    },
  },
  plugins: [],
}
export default config
