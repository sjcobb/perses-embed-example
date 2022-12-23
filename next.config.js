/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  transpilePackages: ['lodash-es'], // https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
  // transpileModules: ['lodash-es'],
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;

// // https://nextjs.org/docs/api-reference/next.config.js/introduction
// module.exports = ({ nextConfig }) => {
//   return {
//     ...nextConfig
//   }
// }
