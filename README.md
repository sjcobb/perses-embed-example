# Perses Embed Example Application

https://perses-embed-example.vercel.app/paint

## Getting Started

To embed Perses dashboards, panels, and components, use the following steps:

- install MUI
  - https://mui.com/material-ui/getting-started/installation/
    - `npm install @mui/material @emotion/react @emotion/styled`
    - ~~`npm install @fontsource/roboto`~~
    - `npm install @fontsource/lato`
- install Perses packages
  - npm i @perses-dev/components
  - Note: CSS errors will be fixed as part of: https://github.com/perses/perses/issues/894
  - Make lodash-es an explicit dependency instead of a dev dependency

### Custom Charts

The Perses LineChart.tsx component uses ECharts, but has a custom tooltip for improved performance. To use this component, a ChartsThemeProvider must also be used (Or else `Error: No ChartsThemeContext found. Did you forget a Provider?` will be thrown).

## TODO

- [ ] dynamic render Perses dashboard to avoid Server mismatch errors
  - `next-dev.js?3515:20 Warning: Prop id did not match. Server: "Panel-10-header-title" Client: "Panel-0-header-title"`
  - https://github.com/vercel/next.js/issues/12863#issuecomment-628660240
- [ ] fix Fetch API errors in TimeSeriesChart
  - fetch.js?efea:16 Fetch API cannot load demo.do.prometheus.io:9100/api/v1/query_range. URL scheme "demo.do.prometheus.io" is not supported.
- [ ] ViewDashboard props - make possible to disable query params
  - Uncaught ReferenceError: window is not defined
  - https://github.com/pbeshai/use-query-params/issues/13
  - https://github.com/amannn/next-query-params
- [ ] echarts/core.js import errors
  - explanation: https://github.com/hustcc/echarts-for-react/issues/425#issuecomment-854122398
- [ ] echarts useLayoutEffect error
  - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
- [x] move lato imports out of @perses-dev/components
  - https://github.com/perses/perses/blob/main/ui/components/src/theme/typography.ts#L14-L17
- [x] lodash-es fix issues with code transpilation from NPM modules using ES6 imports
  - try using next-transpile-modules: https://github.com/vercel/next.js/issues/706#issuecomment-911559308
    - https://github.com/vercel/next.js/issues/2259#issuecomment-416150640
  - issue may be in core package import here: https://github.com/perses/perses/blob/494190b37debf77d56674525f73f6b3c95ca0cf7/ui/core/src/utils/memo.ts#L15
  - should lodash-es be added as a peer dependency in Perses?
  - Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/sjcobb/Desktop/Data/sjcobb/perses-embed-example/node_modules/lodash-es/lodash.js from /Users/sjcobb/Desktop/Data/sjcobb/perses-embed-example/node_modules/@perses-dev/core/dist/cjs/utils/memo.js not supported.

## Links

### Pages

- http://localhost:3000/dashboard
- http://localhost:3000/paint

### Resources

- https://nextjs.org/blog/next-12#es-modules-support-and-url-imports
- https://strikingloo.github.io/stable-diffusion-vs-dalle-2#prompt-examples-and-experiments
- https://blog.logrocket.com/next-js-13-new-app-directory/#page-directory-vs-app-directory
  - `warn - The app directory is experimental. To enable, add 'appDir: true' to your 'next.config.js' configuration under 'experimental'. See https://nextjs.org/docs/messages/experimental-app-dir-config"`
  - error - Conflicting app and page file was found, please remove the conflicting files to continue: "pages/index.tsx" - "app/page.tsx"
- https://nextjs.org/docs/upgrading
- https://github.com/vercel/next.js/discussions/27953#discussioncomment-3978605
- https://beta.nextjs.org/docs/routing/fundamentals#route-segments
- https://blog.logrocket.com/getting-started-with-mui-and-next-js/
- https://dev-yakuza.posstree.com/en/react/nextjs/prettier/
- ...
- https://vercel.com/templates/next.js/inpainter-stable-diffusion
- https://github.com/pingcap/tidb-prisma-vercel-demo

# Archive

## 🎨 Inpainter

A web GUI for inpainting with [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion) using the Replicate API.

Try it out at [inpainter.vercel.app](https://inpainter.vercel.app/)

https://user-images.githubusercontent.com/2289/188992670-3dc9db47-fb8e-45c1-85ee-afc850009c48.mp4

### How it works

🐢🚀 This is a Node.js app! It's powered by:

- [Replicate](https://replicate.com/), a platform for running machine learning models in the cloud.
- [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion), an open-source text-to-image generation model.
- Next.js [server-side API routes](pages/api) for talking to the Replicate API
- Next.js React components for the inpainting GUI
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for Icons

### Development

Prerequisites:

1. Recent version of Node.js
2. [Replicate API token](https://replicate.com/account)

Set your Replicate API token in your environment:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Then install dependencies and run the server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
