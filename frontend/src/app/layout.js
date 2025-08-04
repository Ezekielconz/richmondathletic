// frontend/src/app/layout.js
import { Geist, Geist_Mono, Oswald } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';

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
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// ------------ Metadata ------------
export const metadata = {
  title: 'Richmond Athletic FC',
  description: 'Official club site',
};

// ------------ Root Layout ------------
export default async function RootLayout({ children }) {
  // Default fallback logo (in case CMS call fails)
  let logo = '/logo.png';

  try {
    const json = await fetchStrapi('/site-settings', {
      params: { populate: 'logo' },
      next:   { revalidate: 60 * 60 * 12, tags: ['site-settings'] }, // 12h ISR
    });
    const cmsLogo = getMediaURL(json.data.attributes.logo);
    if (cmsLogo) logo = cmsLogo;
  } catch (e) {
    console.error('Failed to load site logo from Strapi:', e);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}
    >
      <body className="antialiased">
        <NavBar logo={logo} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
