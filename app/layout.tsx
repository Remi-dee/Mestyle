"use client";

import { ReactNode } from "react";

import { Inter, Oregano } from "next/font/google";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import { ThemeProvider } from "@/app/composables/provider";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "./redux/store";

type Metadata = {
  title: string;
  description: string;
};

type RootLayoutProps = {
  children: ReactNode;
};

// export const metadata: Metadata = {
//   title: "MeStyle",
//   description: "Get your confidence again",
// };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>MeStyle</title>
        <meta name="description" content="Get your confidence again" />
      </Head>

      <body className={`${lexend.variable} overflow-x-hidden `}>
        <Provider store={store}>
          <ThemeProvider enableSystem={true} attribute="class">
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
