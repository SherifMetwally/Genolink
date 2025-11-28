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
          DEFAULT: '#025098',
          light: '#1E6BB8',
          dark: '#082846',
        },
        'accent-blue': {
          DEFAULT: '#025098',
          light: '#1E6BB8',
          dark: '#082846',
        },
        'gold': {
          DEFAULT: '#70993c',
          light: '#8BB85A',
          dark: '#5A7A2F',
        },
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #025098 0%, #082846 100%)',
        'gold-gradient': 'linear-gradient(135deg, #70993c 0%, #5A7A2F 100%)',
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

