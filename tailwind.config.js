/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royalBg: '#FAF9F6',      // Elegant off-white background
        royalOffWhite: '#F1F5F9', // Soft light gray/blue background
        navyBlue: '#0A192F',      // Deep navy for text and dark components
        royalBlue: '#0A369D',     // Royal blue for primary accents
        royalBlueLight: '#E0E7FF',// Light blue accent background
        slateDark: '#334155',     // Dark slate text
        slateMuted: '#64748B',    // Muted slate text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
