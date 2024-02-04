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
      },
      fontFamily: {
        lexend: ["var(--font-lexend)"],
        oregano: ["var(--font-oregano)"],
      },
      backgroundImage: {
        "explore-bg": "url('/images/explore/explore_bg.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
