/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'draw-border': {
          '0%': {
            clipPath: 'inset(0 100% 100% 0)',
          },
          '25%': {
            clipPath: 'inset(0 0 100% 0)',
          },
          '50%': {
            clipPath: 'inset(0 0 0 0)',
          },
          '100%': {
            clipPath: 'inset(0 0 0 0)',
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          }
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          }
        }
      },
      animation: {
        'draw-border': 'draw-border 2s ease-in-out forwards',
        'fade-in': 'fade-in 2s ease-in-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
}