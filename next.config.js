/** @type {import('next').NextConfig} */
const config = require('./website.config.json');

const nextConfig = {
    images: {
        domains: [],
    },
    env: {
        LAST_UPDATED: process.env.LAST_UPDATED,
        CONFIG: config,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
}

module.exports = nextConfig
