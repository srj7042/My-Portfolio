/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#059669', // soft green
          DEFAULT: '#10b981', // emerald green
          dark: '#34d399', // soft bright emerald for dark mode
          muted: '#047857', // muted dark green
        },
        bg: {
          light: '#faf8f5', // warm off-white
          dark: '#09090b', // deep charcoal
        },
        surface: {
          light: '#ffffff',
          dark: '#141417',
          'dark-card': '#1c1c21',
          'dark-border': '#27272a',
          'light-border': '#e4e4e7',
        },
        text: {
          light: '#18181b', // near-black / charcoal
          'light-muted': '#52525b',
          dark: '#f4f4f5', // off-white
          'dark-muted': '#a1a1aa', // neutral gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle-light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-light': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 15px -3px rgba(16, 185, 129, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'card-dark-hover': '0 10px 15px -3px rgba(16, 185, 129, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
