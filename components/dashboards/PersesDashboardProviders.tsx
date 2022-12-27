import React from 'react';
import { QueryParamProvider } from 'use-query-params';
// import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { WindowHistoryAdapter } from 'use-query-params/adapters/window';
import { DashboardResource, DurationString } from '@perses-dev/core';
import { DashboardProvider, DatasourceStoreProvider, TemplateVariableProvider } from '@perses-dev/dashboards';
import {
  PluginRegistry,
  TimeRangeProvider as PersesTimeRangeProvider,
  useInitialTimeRange,
} from '@perses-dev/plugin-system';
import { bundledPluginLoader } from './PersesPluginRegistry';
import { useDatasourceApi } from './datasource-api';

function TimeRangeProvider({
  dashboardDuration,
  children,
}: {
  dashboardDuration: DurationString;
  children: React.ReactNode;
}) {
  const initialTimeRange = useInitialTimeRange(dashboardDuration);
  return (
    <PersesTimeRangeProvider initialTimeRange={initialTimeRange} enabledURLParams={true}>
      {children}
    </PersesTimeRangeProvider>
  );
}

type PersesDashboardProvidersProps = {
  dashboard: DashboardResource;
  children: React.ReactNode;
};

export function PersesDashboardProviders({ dashboard, children }: PersesDashboardProvidersProps) {
  const datasourceApi = useDatasourceApi();

  return (
    <PluginRegistry
      pluginLoader={bundledPluginLoader}
      defaultPluginKinds={{
        Panel: 'TimeSeriesChart',
      }}
    >
      <QueryParamProvider adapter={WindowHistoryAdapter}>
        <DatasourceStoreProvider dashboardResource={dashboard} datasourceApi={datasourceApi}>
          <DashboardProvider initialState={{ dashboardResource: dashboard }}>
            <TemplateVariableProvider initialVariableDefinitions={dashboard.spec.variables}>
              <TimeRangeProvider dashboardDuration={dashboard.spec.duration}>{children}</TimeRangeProvider>
            </TemplateVariableProvider>
          </DashboardProvider>
        </DatasourceStoreProvider>
      </QueryParamProvider>
    </PluginRegistry>
  );
}
