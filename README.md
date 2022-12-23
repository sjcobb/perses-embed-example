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

- [ ] move lato imports out of @perses-dev/components
  - https://github.com/perses/perses/blob/main/ui/components/src/theme/typography.ts#L14-L17
- [ ] lodash-es fix issues
  - should lodash-es be added as a peer dependency in Perses?
  - Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/sjcobb/Desktop/Data/sjcobb/perses-embed-example/node_modules/lodash-es/lodash.js from /Users/sjcobb/Desktop/Data/sjcobb/perses-embed-example/node_modules/@perses-dev/core/dist/cjs/utils/memo.js not supported.

## Links

### Pages

- http://localhost:3000/dashboard
- http://localhost:3000/paint

### Resources

- https://blog.logrocket.com/next-js-13-new-app-directory/#page-directory-vs-app-directory
  - `warn - The app directory is experimental. To enable, add 'appDir: true' to your 'next.config.js' configuration under 'experimental'. See https://nextjs.org/docs/messages/experimental-app-dir-config"`
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
