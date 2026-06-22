import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07090d",
        graphite: "#111722",
        pearl: "#f4f7fb",
        mist: "#a9b7ca",
        gold: "#f7cf69",
        cyan: "#8bd7ff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.35)",
        glow: "0 0 60px rgba(139, 215, 255, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
