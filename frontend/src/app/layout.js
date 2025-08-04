// frontend/src/app/layout.js
import { Geist, Geist_Mono, Oswald } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

// ------------ Fonts ------------
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // trim weights if you like
  display: 'swap',
});

// ------------ Metadata ------------
export const metadata = {
  title: 'Richmond Athletic FC',
  description: 'Official club site',
};

// ------------ Root Layout ------------
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}
    >
      <body className="antialiased">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
