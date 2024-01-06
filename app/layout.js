import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import { ThemeProvider } from "@/app/composables/provider"

export const metadata = {
  title: "MeStyle",
  description: "Get your confidence again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable}  `}>
        <ThemeProvider enableSystem="true" attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
