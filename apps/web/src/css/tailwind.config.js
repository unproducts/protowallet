module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /^bg-accent/,
      variants: ['responsive', 'hover', 'focus', 'active'],
    },
    {
      pattern: /^text-accent/,
      variants: ['responsive', 'hover', 'focus', 'active'],
    },
    {
      pattern: /^border-accent/,
      variants: ['responsive', 'hover', 'focus', 'active'],
    },
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
      },
      outline: {
        blue: '2px solid rgba(0, 112, 244, 0.5)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      screens: {
        xs: '480px',
      },
      borderWidth: {
        3: '3px',
      },
      colors: {
        primary: {
          50: '#F2F8FF',
          100: '#E6F1FF',
          200: '#BFDBFE',
          300: '#99C5FE',
          400: '#4D9BFD',
          500: '#006EF4',
          600: '#0064DB',
          700: '#00448C',
          800: '#003366',
          900: '#002440',
        },
        accent: {
          1: {
            300: '#0E2954',
            200: '#1F6E8C',
            100: '#F4EEE0',
          },
          2: {
            300: '#4c1d95',
            200: '#7c3aed',
            100: '#c4b5fd',
          },
          3: {
            300: '#064e3b',
            200: '#047857',
            100: '#a7f3d0',
          },
          4: {
            300: '#d97706',
            200: '#fbbf24',
            100: '#fde68a',
          },
        },
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
  ],
};
