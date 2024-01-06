import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "MeStyle",
  description: "Get your confidence again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} bg-grayDark `}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
