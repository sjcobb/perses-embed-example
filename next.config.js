/** @type {import('next').NextConfig} */

// TODO: remove next-transpile-modules package in favor of Next 13 support here:
// - https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
// https://www.npmjs.com/package/next-transpile-modules
// https://morioh.com/p/d17897280b6a
const withTM = require('next-transpile-modules')(['lodash-es']); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  // transpileModules: ['lodash-es'],
  // // https://github.com/vercel/next.js/issues/2259#issuecomment-415489959
  // webpack: config => ({
  //   ...config,
  //   externals: Array.isArray(config.externals)
  //     ? config.externals.map(
  //         fn =>
  //           typeof fn === "function"
  //             ? (context, request, callback) => {
  //                 // We use lodash-es in the browser for tree-shaking, but
  //                 // switch to the regular lodash on the server to avoid having
  //                 // to transpile `import`/`export` there.
  //                 if (request === "lodash-es") {
  //                   return callback(null, "commonjs lodash");
  //                 }
  //                 return fn(context, request, callback);
  //               }
  //             : fn,
  //       )
  //     : config.externals,
  // }),
};

// module.exports = nextConfig;
// module.exports = withTM(nextConfig);
module.exports = withTM({});

// // https://github.com/vercel/next.js/issues/2259#issuecomment-416150640

// const withTM = require('next-transpile-modules');

// module.exports = withTM({
//   // ...nextConfig,
//   transpileModules: ['lodash-es']
// });
