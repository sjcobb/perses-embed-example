import { GlobalDatasource } from '@perses-dev/core';
import { DatasourceStoreProviderProps } from '@perses-dev/dashboards';

export function useDatasourceApi(): DatasourceStoreProviderProps['datasourceApi'] {
  return {
    getDatasource: async (/*project, selector*/) => {
      return undefined;
    },
    getGlobalDatasource: async (selector) => {
      if (selector.kind === 'PrometheusDatasource' && selector.name === undefined) {
        return {
          resource: datasource,
          proxyUrl: '/data/update_proxy_here',
        };
      }
      return undefined;
    },
    listDatasources: async (/*project, pluginKind*/) => {
      return [];
    },
    listGlobalDatasources: async (pluginKind) => {
      if (pluginKind === datasource.spec.plugin.kind) {
        return [datasource];
      }
      return [];
    },
  };
}

const datasource: GlobalDatasource = {
  kind: 'GlobalDatasource',
  metadata: {
    name: 'PrometheusDemo',
    created_at: '',
    updated_at: '',
    version: 0,
  },
  spec: {
    default: true,
    display: {
      name: 'Prometheus Demo',
    },
    plugin: {
      kind: 'PrometheusDatasource',
      spec: {
        direct_url: 'demo.do.prometheus.io:9100', // TODO: fix datasource, proxyUrl errors when using TimeSeriesChart panel
      },
    },
  },
};
