import '@/ui/styles/globals.css';
import '@/ui/styles/styles.scss';

import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';

import { GlobalWrapper } from './global.wrapper';
import type { Metadata } from 'next';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const bGr = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bgr',
});

export const metadata: Metadata = {
  title: 'ClearFrontend',
  description: 'Online Coding Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className} suppressHydrationWarning>
      <body className="antialiased">
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
