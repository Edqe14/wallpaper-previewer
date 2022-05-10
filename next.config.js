/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 2592000
  }
};
