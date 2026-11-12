/** @type {import('next').NextConfig} */
const path = require('path');

const config = require("./website.config.json");

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
      use: "raw-loader",
    });
    return config;
  },
  async rewrites() {
    // The resume is built in the helloparthshah/resume repo; see pages/api/resume.js.
    return [{ source: '/resume.pdf', destination: '/api/resume' }];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
