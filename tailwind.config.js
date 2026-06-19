/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#0D0D0D',
        'surface-2': '#161616',
        'surface-3': '#222222',
        'border': '#2E2E2E',
        'border-bright': '#454545',
        'accent': '#FFE500',
        'accent-dim': '#B3A000',
        'muted': '#C8C8C8',
        'dim': '#8E8E8E',
      },
      fontFamily: {
        'display': ['Bricolage Grotesque', 'sans-serif'],
        'mono':    ['JetBrains Mono', 'monospace'],
        'body':    ['Figtree', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'breathe':    'breathe 4s ease-in-out infinite',
        'scan':       'scan 8s linear infinite',
        'flicker':    'flicker 0.15s infinite',
        'slide-up':   'slideUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
