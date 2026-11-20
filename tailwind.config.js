/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          primary: '#087F3E',
          primaryHover: '#066B33',
          dark: '#064E3B',
          deep: '#032D22',
          light: '#EAF7EF',
          lightHover: '#D8EFE0',
          bg: '#F8FAF9',
          surface: '#FFFFFF',
          text: '#0F291E',
          muted: '#526058',
          subtle: '#8C9A93',
          border: '#E2E8F0',
          borderLight: '#EDF2F0',
          accent: '#D97706',
          accentLight: '#FEF3C7',
        }
      },
      maxWidth: {
        'page': '1440px',
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px -2px rgba(15, 41, 30, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -4px rgba(8, 127, 62, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 12px 30px -4px rgba(15, 41, 30, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '16px',
      }
    },
  },
  plugins: [],
}

