import { GlobalDatasourceResource, DatasourceResource } from '@perses-dev/core';
import { DatasourceStoreProviderProps } from '@perses-dev/dashboards';

const fakeDatasource: GlobalDatasourceResource = {
  kind: 'GlobalDatasource',
  metadata: { name: 'hello' },
  spec: {
    default: true,
    plugin: {
      kind: 'PrometheusDatasource',
      spec: {
        directUrl: 'https://prometheus.demo.do.prometheus.io',
      },
    },
  },
};

export function useDatasourceApi(): DatasourceStoreProviderProps['datasourceApi'] {
  return {
    getDatasource: async (/*project, selector*/) => {
      return undefined;
    },
    getGlobalDatasource(): Promise<GlobalDatasourceResource | undefined> {
      return Promise.resolve(fakeDatasource);
    },
    listDatasources(): Promise<DatasourceResource[]> {
      return Promise.resolve([]);
    },
    listGlobalDatasources: async (pluginKind) => {
      if (pluginKind === datasource.spec.plugin.kind) {
        return [datasource];
      }
      return [];
    },
  };
}

const datasource: GlobalDatasourceResource = {
  kind: 'GlobalDatasource',
  metadata: {
    name: 'PrometheusDemo',
    createdAt: '',
    updatedAt: '',
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
        directUrl: 'https://prometheus.demo.do.prometheus.io',
      },
    },
  },
};
