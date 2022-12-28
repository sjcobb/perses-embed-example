# Perses Embed Example Application

Demo of [Perses](https://github.com/perses/perses) embedded dashboard and components functionality. See pages:

- https://perses-embed-example.vercel.app/dashboard
- https://perses-embed-example.vercel.app/paint

Includes a custom panel plugin for inpainting with [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion) using the Replicate API ([see template](https://github.com/replicate/inpainter)).

## Getting Started

To embed Perses dashboards, panels, and components, use the following steps:

- install @mui/material, @fontsource/lato
  - https://mui.com/material-ui/getting-started/installation/
- install Perses packages
  - npm i @perses-dev/components @perses-dev/core @perses-dev/dashboards @perses-dev/panels-plugin @perses-dev/plugin-system @perses-dev/prometheus-plugin
  - Note: CSS errors will be fixed as part of: https://github.com/perses/perses/issues/894
  - see next.config.js `transpilePackages` to fix lodash-es, echarts ES module errors
- add Perses Providers: ChartsThemeProvider, QueryClientProvider, QueryParamProvider, PluginRegistry
- customize MUI theme
- register custom plugins

## Components Demo

See available components in @perses-dev/components [README](https://github.com/perses/perses/blob/main/ui/components/README.md)

### Custom Charts

See demo page for custom chart component examples: https://perses-embed-example.vercel.app/demo

Note: The Perses LineChart.tsx component uses ECharts, but has a custom tooltip for improved performance. To use this component, a ChartsThemeProvider must also be used (Or else `Error: No ChartsThemeContext found. Did you forget a Provider?` will be thrown).
