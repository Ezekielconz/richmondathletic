/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'YOUR-STRAPI-CLOUD-HOST.strapiapp.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: '*.media.strapiapp.com', pathname: '/**' },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  },
};

export default nextConfig;
