import { ReactNode } from "react";

import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import { ThemeProvider } from "@/app/composables/provider";
import Head from "next/head";
import { AuthProvider } from "./composables/authContext";

type Metadata = {
  title: string;
  description: string;
};

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "MeStyle",
  description: "Get your confidence again",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <body className={`${lexend.variable} overflow-x-hidden `}>
        <AuthProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
