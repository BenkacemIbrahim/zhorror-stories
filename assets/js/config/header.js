// Tailwind CDN theme configuration.
// Shared by: header, header-authenticated
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'accent': '#F40009',
                        'accent-hover': '#d10007',
                        'dark': '#121212',
                        'darker': '#0a0a0a',
                        'card': 'rgba(30, 30, 30, 0.6)',
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 3s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'drip': 'drip 2s ease-in-out infinite',
                        'slide-down': 'slideDown 0.3s ease-out forwards',
                        'fade-in': 'fadeIn 0.3s ease-out forwards',
                        'logo-pulse': 'logoPulse 4s ease-in-out infinite alternate',
                        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
                        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
                        'scale-in': 'scaleIn 0.3s ease-out forwards',
                        'blood-drip': 'bloodDrip 3s ease-in-out infinite',
                        'hover-glow': 'hoverGlow 1.5s ease-in-out infinite alternate',
                        'typing': 'typing 1.5s steps(20, end) infinite alternate',
                        'blink-caret': 'blinkCaret 0.75s step-end infinite',
                        'search-pulse': 'searchPulse 2s ease-in-out infinite',
                        'result-appear': 'resultAppear 0.4s ease-out forwards',
                        'shimmer': 'shimmer 2s linear infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        glow: {
                            '0%': { textShadow: '0 0 5px rgba(244, 0, 9, 0.5)' },
                            '100%': { textShadow: '0 0 15px rgba(244, 0, 9, 0.8), 0 0 20px rgba(244, 0, 9, 0.5)' },
                        },
                        drip: {
                            '0%': { height: '0px', opacity: 0 },
                            '50%': { height: '15px', opacity: 1 },
                            '100%': { height: '0px', opacity: 0 }
                        },
                        slideDown: {
                            '0%': { transform: 'translateY(-10px)', opacity: 0 },
                            '100%': { transform: 'translateY(0)', opacity: 1 },
                        },
                        fadeIn: {
                            '0%': { opacity: 0 },
                            '100%': { opacity: 1 },
                        },
                        logoPulse: {
                            '0%': { filter: 'drop-shadow(0 0 2px rgba(244, 0, 9, 0.5))' },
                            '50%': { filter: 'drop-shadow(0 0 10px rgba(244, 0, 9, 0.8))' },
                            '100%': { filter: 'drop-shadow(0 0 15px rgba(244, 0, 9, 0.9))' }
                        },
                        slideInRight: {
                            '0%': { transform: 'translateX(100%)', opacity: 0 },
                            '100%': { transform: 'translateX(0)', opacity: 1 },
                        },
                        slideInLeft: {
                            '0%': { transform: 'translateX(-100%)', opacity: 0 },
                            '100%': { transform: 'translateX(0)', opacity: 1 },
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.9)', opacity: 0 },
                            '100%': { transform: 'scale(1)', opacity: 1 },
                        },
                        bloodDrip: {
                            '0%': { height: '0', opacity: 0 },
                            '30%': { height: '30px', opacity: 1 },
                            '60%': { height: '10px', opacity: 0.7 },
                            '100%': { height: '0', opacity: 0 }
                        },
                        hoverGlow: {
                            '0%': { boxShadow: '0 0 5px rgba(244, 0, 9, 0.3)' },
                            '100%': { boxShadow: '0 0 15px rgba(244, 0, 9, 0.7), 0 0 20px rgba(244, 0, 9, 0.4)' }
                        },
                        typing: {
                            '0%': { width: '0' },
                            '100%': { width: '100%' }
                        },
                        blinkCaret: {
                            '0%, 100%': { borderColor: 'transparent' },
                            '50%': { borderColor: '#F40009' }
                        },
                        searchPulse: {
                            '0%': { transform: 'scale(1)', opacity: 0.7 },
                            '50%': { transform: 'scale(1.05)', opacity: 1 },
                            '100%': { transform: 'scale(1)', opacity: 0.7 }
                        },
                        resultAppear: {
                            '0%': { transform: 'translateY(10px)', opacity: 0 },
                            '100%': { transform: 'translateY(0)', opacity: 1 }
                        },
                        shimmer: {
                            '0%': { backgroundPosition: '-200% 0' },
                            '100%': { backgroundPosition: '200% 0' }
                        }
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    }
                }
            }
        }
    