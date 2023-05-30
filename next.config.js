/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/base',
  output: 'standalone',
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_HOST: process.env['NEXT_PUBLIC_API_HOST'],
    NEXT_PUBLIC_API_STORAGE: process.env['NEXT_PUBLIC_API_STORAGE'],
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
