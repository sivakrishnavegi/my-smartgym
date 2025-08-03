/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './core/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        hulk: {
          DEFAULT: '#39FF14',           // Neon Hulk Green
          dark: '#006400',              // Deep Hulk Green
          lime: '#AFFF47',              // Electric Lime
          forest: '#014421',            // Dark Forest Green
          backgroundDark: '#1A1A1A',    // Charcoal Black
          graphite: '#333333',          // Graphite Gray
          silver: '#D3D3D3',            // Cool Silver
          white: '#FFFFFF',             // Pure White
          black: '#000000',             // Jet Black
          red: '#FF4C4C',               // Alert/Destructive
          success: '#2ECC71',           // Success Green
          cta: '#1E90FF',               // Call to Action Blue
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
