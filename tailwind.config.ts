import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Primary — deep navy, taken from the VoyageExpress "VE highway" logo.
        brand: {
          50: "#f4f5fa",
          100: "#e6e8f3",
          200: "#c7cce3",
          300: "#9ba4ca",
          400: "#6673a8",
          500: "#414f88",
          600: "#2d3b6e",
          700: "#232e58",
          800: "#1b2447",
          900: "#151c39",
          950: "#0d1124",
        },
        // Accent — dark red, the "hint of red".
        accent: {
          50: "#fdf3f4",
          100: "#fbe2e5",
          200: "#f6c8cd",
          300: "#ee9aa4",
          400: "#e26475",
          500: "#cf3a4d",
          600: "#b3243a",
          700: "#951c30",
          800: "#7c1a2c",
          900: "#6a1929",
          950: "#3b0a12",
        },
        // Azure — the "hint of blue" for links and highlights.
        azure: {
          400: "#5a9bff",
          500: "#2f6bff",
          600: "#1d54f0",
          700: "#1742cc",
        },
        ink: "#0d1124",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
