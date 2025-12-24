/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' - Now using full Next.js with API routes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Server-side rendering enabled for Vercel deployment
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
