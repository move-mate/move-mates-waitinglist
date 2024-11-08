module.exports = {
  theme: {
    extend: {
      keyframes: {
        drawPhoneBorder: {
          '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          '25%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          '50%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 100% 100%)' },
          '75%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
        },
        showContent: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
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
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'show-content': 'showContent 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        bounce: 'bounce 2s infinite',
      }
    }
  }
} 