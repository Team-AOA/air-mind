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
    domains: ['192.168.0.91'],
  },
};

module.exports = nextConfig;
