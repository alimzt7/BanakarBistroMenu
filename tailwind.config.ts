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
        ink: "#121110",
        coal: "#1c1a18",
        paper: "#f1ede4",
        bone: "#ded8ca",
        copper: "#d15b3f",
        saffron: "#c79d55",
        sage: "#9da58e",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 70px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
