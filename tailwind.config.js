/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ios: {
          light: {
            bg: '#f2f2f7',
            card: '#ffffff',
            text: '#000000',
            secondary: '#8e8e93',
            separator: '#c6c6c8',
            blue: '#007aff',
            green: '#34c759',
            red: '#ff3b30',
            orange: '#ff9500',
            purple: '#af52de',
          },
          dark: {
            bg: '#000000',
            card: '#1c1c1e',
            text: '#ffffff',
            secondary: '#8e8e93',
            separator: '#38383a',
            blue: '#0a84ff',
            green: '#30d158',
            red: '#ff453a',
            orange: '#ff9f0a',
            purple: '#bf5af2',
          },
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        ios: '13px',
        'ios-lg': '20px',
        'ios-xl': '30px',
      },
      boxShadow: {
        ios: '0 3px 12px rgba(0, 0, 0, 0.09)',
        'ios-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
