/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
