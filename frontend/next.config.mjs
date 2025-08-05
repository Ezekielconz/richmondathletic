/** @type {import('next').NextConfig} */
import { URL } from 'url';

const strapi = new URL(
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
);

const nextConfig = {
  experimental: { appDir: true },

  images: {
    remotePatterns: [
      // Dev / Self-hosted Strapi (e.g. http://localhost:1337/uploads/…)
      {
        protocol: strapi.protocol.replace(':', ''), // "http" | "https"
        hostname: strapi.hostname,                  // "localhost" | "precious-splendor-69e179a5fd.strapiapp.com"
        port: strapi.port || '',                    // "1337" | ""
        pathname: '/uploads/**',
      },
      // Strapi Cloud file storage
      {
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    NEXT_PUBLIC_STRAPI_API_PREFIX:
      process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api',
  },
};

export default nextConfig;
