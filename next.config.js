/** @type {import('next').NextConfig} */
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_CLIENT_URL],
  },
};

module.exports = nextConfig;
