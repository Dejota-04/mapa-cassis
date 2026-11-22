/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf6f0',
        cassis: {
          50: '#fbf3f7',
          100: '#f5e3ec',
          200: '#e9c3d6',
          300: '#d697b6',
          400: '#bb6390',
          500: '#9c3f70',
          600: '#7f2b58',
          700: '#652145',
          800: '#4a1833',
          900: '#2e0f20',
        },
        leaf: '#4d7c3a',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
