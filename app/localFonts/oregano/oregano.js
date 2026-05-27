import { Oregano } from "next/font/google";
import localFont from "next/font/local";

const oregano = localFont({
  src: [
    {
      path: "./fonts/Oregano-Regular.ttf",
      weight: "400",
      style: "regular",
      subsets: ["latin"],
      display: "swap",
    },
  ],
  variable: "--font-oregano",
});

export { oregano };