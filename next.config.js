/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  experimental: {
    // transpilePackages: [
    //   '@perses-dev/dashboards',
    //   'echarts',
    //   'zrender',
    // ],
    appDir: false,
  },
  transpilePackages: [
    '@perses-dev/components',
    '@perses-dev/core',
    '@perses-dev/dashboards',
    '@perses-dev/panels-plugin',
    '@perses-dev/plugin-system',
    '@perses-dev/prometheus-plugin',
    'echarts',
    'zrender',
  ],
  // // transpilePackages: ['lodash-es'], // https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
  // // // transpileModules: ['lodash-es'],
};

module.exports = nextConfig;

// // // https://stackoverflow.com/a/65939797/17575201
// // const withTM = require("next-transpile-modules")(["mojave/classes"]);

// // const withTM = require('next-transpile-modules')(['lodash-es']); // pass the modules you would like to see transpiled
// const withTM = require('next-transpile-modules')(['echarts', 'zrender']); // pass the modules you would like to see transpiled
// module.exports = withTM(nextConfig);

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['replicate.com', 'replicate.delivery'],
//   },
//   transpilePackages: ['echarts', 'zrender'],
//   // transpilePackages: ['lodash-es'], // https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
//   // // transpileModules: ['lodash-es'],
//   experimental: {
//     appDir: false,
//   },
// };

// module.exports = nextConfig;

// // // https://nextjs.org/docs/api-reference/next.config.js/introduction
// // module.exports = ({ nextConfig }) => {
// //   return {
// //     ...nextConfig
// //   }
// // }
