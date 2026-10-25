// Tailwind CDN theme configuration.
// Shared by: welcome
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
                        'blood-drip': 'bloodDrip 3s ease-in-out infinite',
                        'fade-in': 'fadeIn 0.8s ease-out forwards',
                        'slide-up': 'slideUp 0.8s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
                        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
                        'float-shadow': 'floatShadow 3s ease-in-out infinite',
                        'shake': 'shake 0.5s ease-in-out',
                        'blood-spread': 'bloodSpread 8s ease-in-out forwards',
                        'fog-move': 'fogMove 20s linear infinite',
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
                        bloodDrip: {
                            '0%': { height: '0', opacity: 0 },
                            '30%': { height: '30px', opacity: 1 },
                            '60%': { height: '10px', opacity: 0.7 },
                            '100%': { height: '0', opacity: 0 }
                        },
                        fadeIn: {
                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: 0 },
                            '100%': { transform: 'translateY(0)', opacity: 1 },
                        },
                        slideInRight: {
                            '0%': { transform: 'translateX(50px)', opacity: 0 },
                            '100%': { transform: 'translateX(0)', opacity: 1 },
                        },
                        slideInLeft: {
                            '0%': { transform: 'translateX(-50px)', opacity: 0 },
                            '100%': { transform: 'translateX(0)', opacity: 1 },
                        },
                        bloodSpread: {
                            '0%': {
                                clipPath: 'circle(0% at 50% 50%)',
                                opacity: 0
                            },
                            '30%': {
                                opacity: 0.7
                            },
                            '100%': {
                                clipPath: 'circle(75% at 50% 50%)',
                                opacity: 0.2
                            },
                        },
                        fogMove: {
                            '0%': { transform: 'translateX(-20%) translateY(0)' },
                            '50%': { transform: 'translateX(0%) translateY(-10%)' },
                            '100%': { transform: 'translateX(-20%) translateY(0)' },
                        },
                        floatShadow: {
                            '0%, 100%': {
                                transform: 'translateY(0)',
                                boxShadow: '0 5px 15px rgba(244, 0, 9, 0.3)'
                            },
                            '50%': {
                                transform: 'translateY(-10px)',
                                boxShadow: '0 15px 25px rgba(244, 0, 9, 0.4)'
                            },
                        },
                        shake: {
                            '0%, 100%': { transform: 'translateX(0)' },
                            '20%': { transform: 'translateX(-5px)' },
                            '40%': { transform: 'translateX(5px)' },
                            '60%': { transform: 'translateX(-5px)' },
                            '80%': { transform: 'translateX(5px)' },
                        },
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    }
                }
            }
        }
    