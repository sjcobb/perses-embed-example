// Eagerly load the metadata for the bundled plugins, but lazy-load the plugins
import prometheusResource from '@perses-dev/prometheus-plugin/plugin.json';
import panelsResource from '@perses-dev/panels-plugin/plugin.json';
import { PluginModuleResource, PluginLoader, dynamicImportPluginLoader } from '@perses-dev/plugin-system';
import customPanels from './plugins/plugin.json';

/**
 * A PluginLoader that includes all the "built-in" plugins that are bundled with Perses by default and additional custom plugins
 */
export const bundledPluginLoader: PluginLoader = dynamicImportPluginLoader([
  {
    resource: prometheusResource as PluginModuleResource,
    importPlugin: () => import('@perses-dev/prometheus-plugin'),
  },
  {
    resource: panelsResource as PluginModuleResource,
    importPlugin: () => import('@perses-dev/panels-plugin'),
  },
  {
    // custom plugins
    resource: customPanels as PluginModuleResource,
    importPlugin: () => import('./plugins'),
  },
]);
