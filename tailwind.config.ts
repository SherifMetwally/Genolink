import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lab-blue': {
          DEFAULT: '#1E3A5F',
          light: '#2E4A7F',
          dark: '#0F1F3A',
        },
        'accent-blue': {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        'gold': {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8941F',
        },
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'dna-rotate': 'dnaRotate 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        dnaRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

