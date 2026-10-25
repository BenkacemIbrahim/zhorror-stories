// Tailwind CDN theme configuration.
// Shared by: index
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'accent': '#F40009',
            'dark': '#121212',
            'darker': '#0a0a0a',
            'card': 'rgba(30, 30, 30, 0.6)',
          },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'float': 'float 3s ease-in-out infinite',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            }
          },
          backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          }
        }
      }
    }
  