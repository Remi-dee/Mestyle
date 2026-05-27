/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grayDark: "#121212",
        white: "#fff",
        black: "#000",
        grayNeutral: "#363939",
        grayLight: "#d9d9d9", // Footer background color
        blackAlpha10: "rgba(18, 18, 18, 0.1)", // for the gradient dark background color
        logoText:
          "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
        burgundy: {
          50: "#fdf2f5",
          100: "#fbe6eb",
          200: "#f5ccda",
          300: "#eba3b9",
          400: "#dd7493",
          500: "#c94a71",
          600: "#a82f52",
          700: "#8d2543",
          800: "#6d1a36",
          900: "#5f1730",
          950: "#350a18",
        },
      },
      fontFamily: {
        lexend: ["var(--font-lexend)"],
        oregano: ["var(--font-oregano)"],
      },
      backgroundImage: {
        "explore-bg": "url('/images/explore/explore_bg.png')",
        "radial-gradient":
          "radial-gradient(ellipse at center, #121212 0%, #0a0a0a 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
