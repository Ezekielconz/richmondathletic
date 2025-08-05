// frontend/src/app/layout.js
import { Geist, Geist_Mono, Oswald } from 'next/font/google';
import './globals.css';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';

/* ─────────────────────  Fonts  ───────────────────── */
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const oswald    = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight : ['400', '500', '600', '700'],
  display: 'swap',
});

/* ─────────────────────  <head> metadata  ───────────────────── */
export const metadata = {
  title      : 'Richmond Athletic FC',
  description: 'Official club site',
};

/* ─────────────────────  Root layout  ───────────────────── */
export default async function RootLayout({ children }) {
  /* 1️⃣  Fallback logo bundled in /public  */
  let logoUrl = '/logo.png';

  try {
    /* 2️⃣  Pull the logo from Strapi (single type) */
    const { data: site } = await fetchStrapi('/site-setting', {
      params: { populate: 'logo' },
      next  : { revalidate: 60 * 60 * 12, tags: ['site-settings'] },
    });

    const cmsLogo = getMediaURL(site?.logo);
    if (cmsLogo) logoUrl = cmsLogo;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[layout] Strapi logo fetch failed:', err.message);
    }
  }

  /* 3️⃣  Pass **logoUrl** (not “logo”) down to NavBar  */
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}
    >
      <body className="antialiased">
        <NavBar logoUrl={logoUrl} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}