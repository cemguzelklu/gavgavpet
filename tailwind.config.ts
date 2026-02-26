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
        // Pups in Paris tarzı renk paleti
        'dusty-rose': '#DCCFCF', // O ikonik gül kurusu arka plan
        'dusty-dark': '#B09E9E', // Daha koyu tonu
        'rich-black': '#1B1B1B', // Tam siyah değil, yumuşak lüks siyah
        'paper': '#FDFBF7',      // Göz yormayan krem beyaz
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"], // Başlık fontu
        sans: ["var(--font-sans)", "sans-serif"], // Yazı fontu
      },
    },
  },
  plugins: [],
};

export default config;