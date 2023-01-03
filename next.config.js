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
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  experimental: {
    appDir: false,
  },
  // https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
  transpilePackages: [
    '@perses-dev/components',
    '@perses-dev/core',
    '@perses-dev/dashboards',
    '@perses-dev/panels-plugin',
    '@perses-dev/plugin-system',
    '@perses-dev/prometheus-plugin',
    'echarts',
    'zrender',
    'lodash-es',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination:'/dashboard',
        permanent: true,
        basePath:false
      },
    ]
  },
};

module.exports = nextConfig;
