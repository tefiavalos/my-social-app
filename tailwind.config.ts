import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827', // Negro profundo
        secondary: '#FACC15', // Dorado vibrante
        accent: '#EC4899', // Fucsia intenso
        darkPurple: '#7C3AED', // Morado oscuro
        light: '#FFFFFF', // Blanco puro
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra sutil
        glow: '0px 0px 10px rgba(250, 204, 21, 0.6)', // Efecto de brillo dorado
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
