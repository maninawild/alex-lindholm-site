import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10131A",
        paper: "#FFFFFF",
        bone: "#FFFFFF",
        moss: "#657060",
        copper: "#2563EB",
        bluegray: "#6F7784",
        graphite: "#2B3038",
        violet: "#334155",
        ember: "#2563EB",
        signal: "#8A7F6F",
        electric: "#2563EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
      },
      boxShadow: {
        quiet: "0 18px 50px rgba(16, 19, 26, 0.07)",
        premium: "0 26px 70px rgba(16, 19, 26, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
