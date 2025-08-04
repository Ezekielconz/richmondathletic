// frontend/src/app/layout.js
import { Geist, Geist_Mono, Oswald } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';

// Fonts (unchanged)
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const oswald    = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  display: 'swap',
});

export const metadata = {
  title: 'Richmond Athletic FC',
  description: 'Official club site',
};

export default async function RootLayout({ children }) {
  // fallback logo
  let logo = '/logo.png';

  // the ONE slug Strapi uses for single-types is the singular API ID:
  const endpoint = '/site-setting';

  // build & fetch
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') || 'http://localhost:1337'}${process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api'}${endpoint}?populate=logo`;
  console.log('[Strapi] fetching logo from:', url);

  let json;
  try {
    json = await fetchStrapi(endpoint, {
      params: { populate: 'logo' },
      next:   { revalidate: 60 * 60 * 12, tags: ['site-settings'] },
    });
    console.log('[Strapi] raw response:', json);
  } catch (e) {
    console.warn('[Strapi] fetchStrapi failed:', e.message);
  }

  // guard every property before accessing
  const logoAttr = json?.data?.attributes?.logo;
  if (logoAttr) {
    const cmsUrl = getMediaURL(logoAttr);
    if (cmsUrl) logo = cmsUrl;
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
