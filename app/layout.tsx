import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { lexend } from "./localFonts/lexend/localFont";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Mestyle",
  description:
    "Looks that fit your body and your vibe — Nigeria-first style matching.",
  applicationName: "Mestyle",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Mestyle",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/app/icon.svg",
    apple: "/icons/app/icon.svg",
  },
};

// viewport-fit=cover lets the app paint under the notch / dynamic island
// instead of letterboxing; themeColor matches grayDark so the bar blends in.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121212",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${lexend.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
