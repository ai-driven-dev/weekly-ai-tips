import type { Metadata } from 'next';
import { Noto_Sans, Rokkitt } from 'next/font/google';
import React from 'react';
import './globals.css';

const sans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
});

const serif = Rokkitt({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rokkitt',
});

export const metadata: Metadata = {
  title: 'Weekly AI Tips',
  description: 'Every Monday, a weekly AI tip in your inbox.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${sans.className}`}>
        {children}
      </body>
    </html>
  );
}
