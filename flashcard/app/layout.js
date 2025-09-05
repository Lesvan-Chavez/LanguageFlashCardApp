'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../lib/context/AuthContext';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata = {
//   title: "Language Learner Flash Card App",
//   description: "Created by Aaron, Lesvan, Brittany",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Suspense>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
