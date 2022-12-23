/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  transpilePackages: ['lodash-es'], // https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
};

module.exports = nextConfig;
