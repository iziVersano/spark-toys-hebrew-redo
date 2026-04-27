/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.php'],
  theme: {
    extend: {
      colors: {
        navy:          '#1e2a4a',
        coral:         '#e8614a',
        'coral-soft':  '#fce8e3',
        mint:          '#4dbf8a',
        'mint-soft':   '#e3f7ee',
        sky:           '#4da8d4',
        'sky-soft':    '#e3f2f9',
        sun:           '#f0c040',
        'sun-soft':    '#fdf6dc',
        lilac:         '#9b7dd4',
        'lilac-soft':  '#f3eefb',
        cream:         '#faf7f2',
        background:    '#fefdfb',
        border:        '#e8e3da',
        foreground:    '#1e2a4a',
        muted:         '#f5f0ea',
        'muted-foreground': '#8b7e72',
      },
      fontFamily: {
        display: ['Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        body:    ['Assistant', 'Heebo', 'system-ui', 'sans-serif'],
        sans:    ['Assistant', 'Heebo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(30,42,74,0.18)',
        soft: '0 6px 20px -8px rgba(30,42,74,0.12)',
        pop:  '0 20px 50px -20px rgba(232,97,74,0.35)',
      },
      minHeight: {
        '13': '3.25rem',
      },
      height: {
        '13': '3.25rem',
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};
