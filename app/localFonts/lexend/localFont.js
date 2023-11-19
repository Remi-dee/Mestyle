import localFont from "next/font/local";


const lexend = localFont({
  src: [
    {
      path: "./fonts/Lexend-Black.ttf",
      weight: "900",
      style: "black",
    },

    {
      path: "./fonts/Lexend-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/Lexend-ExtraBold.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "./fonts/Lexend-ExtraLight.ttf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "./fonts/Lexend-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/Lexend-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/Lexend-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/Lexend-Thin.ttf",
      weight: "100",
      style: "thin",
    },
  ],
  variable: "--font-lexend",
});

export { lexend };
