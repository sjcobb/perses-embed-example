# Perses Embed Example Application

https://perses-embed-example.vercel.app/paint

## Getting Started

To embed Perses dashboards, panels, and components, use the following steps:

- install MUI
  - https://mui.com/material-ui/getting-started/installation/
    - `npm install @mui/material @emotion/react @emotion/styled`
    - `npm install @fontsource/roboto`
- ...

## Links

- https://blog.logrocket.com/getting-started-with-mui-and-next-js/
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
