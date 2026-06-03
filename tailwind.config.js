const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1EC',
        'cream-dark': '#E6DCD1',
        'sage-mist': '#EEF1EA',
        stone: '#CFC3B5',
        gold: '#8B9A6B',
        'gold-light': '#A8B58E',
        sage: '#5C6E4A',
        'sage-dark': '#3A4A30',
        'sage-light': '#D3DEC8',
        charcoal: '#2D3A24',
        body: '#5A5A55',
        muted: '#8A8A85',
        mauve: '#C0A7B8',
        'mauve-light': '#EDE3E8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-hero': ['3.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
