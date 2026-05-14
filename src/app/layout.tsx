import "@/ui/styles/globals.css";
import "@/ui/styles/styles.scss";

import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

import { GlobalWrapper } from "./global.wrapper";
import type { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const _bGr = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bgr",
});

export const metadata: Metadata = {
  title: "ClearFrontend",
  description: "Online Coding Platform",
  icons: {
    icon: "/cfe-logo.svg",
    shortcut: "/cfe-logo.svg",
    apple: "/cfe-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
