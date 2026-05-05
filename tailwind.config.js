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
        black: '#000000',
        'surface': '#0A0A0A',
        'surface-2': '#111111',
        'surface-3': '#1A1A1A',
        'border': '#222222',
        'border-bright': '#333333',
        'accent': '#FFE500',
        'accent-dim': '#B3A000',
        'accent-glow': '#FFE50020',
        'text': '#FFFFFF',
        'muted': '#777777',
        'dim': '#444444',
      },
      fontFamily: {
        'display': ['var(--font-syne)', 'sans-serif'],
        'mono': ['var(--font-dm-mono)', 'monospace'],
        'body': ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 9rem)',
        'display': 'clamp(2rem, 5vw, 6rem)',
        'section': 'clamp(1.5rem, 3vw, 3.5rem)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow': 'flow 3s linear infinite',
        'grid-shift': 'gridShift 20s linear infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'node-pulse': 'nodePulse 3s ease-in-out infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        gridShift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(60px, 60px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 229, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 229, 0, 0.7), 0 0 80px rgba(255, 229, 0, 0.2)' },
        },
        nodePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        dataFlow: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(255,229,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.03) 1px, transparent 1px)`,
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
