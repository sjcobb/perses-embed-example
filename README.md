# Perses Embed Example Application

Demo of [Perses](https://github.com/perses/perses) embedded dashboard and components functionality. See pages:

- https://perses-embed-example.vercel.app/dashboard
  - [sample dashboard](https://github.com/sjcobb/perses-embed-example/blob/custom-panel-plugin-scatter-init/data/dashboard-sample.ts) with core panel types (TimeSeriesChart, GaugeChart, StatChart) and custom panel plugin examples
- https://perses-embed-example.vercel.app/demo
  - custom chart component examples

## Getting Started

To embed Perses dashboards, panels, and components, use the following steps:

- install @mui/material, @fontsource/lato
  - https://mui.com/material-ui/getting-started/installation/
- install Perses packages
  - npm i @perses-dev/components @perses-dev/core @perses-dev/dashboards @perses-dev/panels-plugin @perses-dev/plugin-system @perses-dev/prometheus-plugin
  - Note: CSS errors will be fixed as part of: https://github.com/perses/perses/issues/894
  - see next.config.js `transpilePackages` to fix lodash-es, echarts ES module errors
- add Perses Providers: ChartsThemeProvider, QueryClientProvider, QueryParamProvider, PluginRegistry
- customize MUI theme (see [createTheme](https://github.com/sjcobb/perses-embed-example/blob/main/pages/_app.tsx))
- [register custom plugins](https://github.com/sjcobb/perses-embed-example/blob/main/components/dashboards/plugins/plugin.json) (see [PluginLoader](https://github.com/sjcobb/perses-embed-example/blob/main/components/dashboards/PersesPluginRegistry.tsx))
- customize [ECHARTS_THEME_OVERRIDES](https://github.com/sjcobb/perses-embed-example/blob/main/components/dashboards/PersesDashboardProviders.tsx)
  - see ECharts [theme builder](https://echarts.apache.org/en/theme-builder.html), supported [option properties](https://echarts.apache.org/en/option.html#series-line.type)

## Plugin System

Custom plugin examples:

- [Scatterplot](https://github.com/sjcobb/perses-embed-example/tree/main/components/dashboards/plugins/scatterplot) panel plugin
- [Image generation](https://github.com/sjcobb/perses-embed-example/tree/main/components/dashboards/plugins/generate-image-canvas) panel plugin (save image URLs from Replicate API)
- Image query plugin (Stable Diffusion)

## Components Demo

See available components in @perses-dev/components [README](https://github.com/perses/perses/blob/main/ui/components/README.md) (Storybook support coming soon)

Note: The Perses LineChart.tsx component uses ECharts, but has a custom tooltip for improved performance. To use this component, a [ChartsThemeProvider](https://github.com/sjcobb/perses-embed-example/blob/main/pages/demo.tsx) must also be used (Or else `Error: No ChartsThemeContext found. Did you forget a Provider?` will be thrown).
