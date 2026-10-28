/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF6E9',
          100: '#F7ECCF',
          200: '#EFD89E',
          300: '#E4BE66',
          400: '#D4A93C',
          500: '#C49A2E',
          600: '#A67D24',
          700: '#7C5C1C',
          800: '#523C16',
          900: '#2E2310',
        },
        ink: {
          950: '#070707',
          900: '#0B0B0D',
          800: '#121216',
          700: '#1B1B22',
          600: '#26262F',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-130%) rotate(8deg)', opacity: '0' },
          '40%': { opacity: '0.55' },
          '100%': { transform: 'translateX(130%) rotate(8deg)', opacity: '0' },
        },
        rise: {
          '0%': { transform: 'translateY(28px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowpulse: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.15' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        sweep: 'sweep 7s ease-in-out infinite',
        rise: 'rise 1s cubic-bezier(0.22,1,0.36,1) forwards',
        glowpulse: 'glowpulse 5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
