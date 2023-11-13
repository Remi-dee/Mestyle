/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontFamily: {
        lexend: ["var(--font-lexend)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
