import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import { ThemeProvider } from "@/app/composables/provider";
import Head from "next/head";
import { AuthProvider } from "./composables/authContext";

export const metadata = {
  title: "MeStyle",
  description: "Get your confidence again",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} overflow-x-hidden `}>
        <AuthProvider>
          <ThemeProvider enableSystem="true" attribute="class">
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
