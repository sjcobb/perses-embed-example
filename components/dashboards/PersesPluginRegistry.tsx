// Eagerly load the metadata for the bundled plugins, but lazy-load the plugins
import prometheusResource from '@perses-dev/prometheus-plugin/plugin.json';
import panelsResource from '@perses-dev/panels-plugin/plugin.json';
import { PluginModuleResource, PluginLoader, dynamicImportPluginLoader } from '@perses-dev/plugin-system';
import customPanels from './plugins/plugin.json';

/**
 * Modifies a resource to exclude plugins we do not want to use in this context.
 * @param resource Original resource.
 * @param excludeKinds Array of plugin kinds to exclude.
 */
function modifiedResource(resource: PluginModuleResource, excludeKinds: string[]) {
  const { spec, ...otherResource } = resource;
  const { plugins, ...otherSpec } = spec;
  return {
    ...otherResource,
    spec: {
      ...otherSpec,
      plugins: plugins.filter((plugin) => !excludeKinds.includes(plugin.kind)),
    },
  };
}

/**
 * A PluginLoader that includes all the "built-in" plugins that are bundled with Perses by default.
 */
export const bundledPluginLoader: PluginLoader = dynamicImportPluginLoader([
  {
    resource: prometheusResource as PluginModuleResource,
    importPlugin: () => import('@perses-dev/prometheus-plugin'),
  },
  {
    // TODO: remove this modification after EmptyChart is removed from perses
    // https://github.com/perses/perses/pull/809
    resource: modifiedResource(panelsResource as PluginModuleResource, ['EmptyChart']),
    importPlugin: () => import('@perses-dev/panels-plugin'),
  },
  {
    // custom plugins
    resource: customPanels as PluginModuleResource,
    importPlugin: () => import('./plugins'),
  },
]);
