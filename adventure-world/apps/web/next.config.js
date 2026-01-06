/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@adventure/shared'],

    // Enable standalone output for Docker
    output: 'standalone',

    // Environment variables for production
    env: {
        NEXT_PUBLIC_GAME_SERVER_URL: process.env.NEXT_PUBLIC_GAME_SERVER_URL || 'ws://localhost:2567',
        NEXT_PUBLIC_SOCIAL_SERVER_URL: process.env.NEXT_PUBLIC_SOCIAL_SERVER_URL || 'http://localhost:3001',
    },

    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        });
        return config;
    },
};

module.exports = nextConfig;
