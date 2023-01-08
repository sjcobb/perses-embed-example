import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { DashboardResource, DurationString, TimeRangeValue } from '@perses-dev/core';
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
  const initialTimeRange: TimeRangeValue = useInitialTimeRange(dashboardDuration);
  // const initialTimeRange: TimeRangeValue = { pastDuration: '1h' };
  return (
    <PersesTimeRangeProvider initialTimeRange={initialTimeRange} enabledURLParams={false}>
      {children}
    </PersesTimeRangeProvider>
  );
}

type PersesDashboardProvidersProps = {
  dashboard: DashboardResource;
  children: React.ReactNode;
};

export function PersesDashboardProvidersAlt({ dashboard, children }: PersesDashboardProvidersProps) {
  const datasourceApi = useDatasourceApi();

  return (
    <PluginRegistry
      pluginLoader={bundledPluginLoader}
      defaultPluginKinds={{
        Panel: 'TimeSeriesChart',
      }}
    >
      <QueryParamProvider adapter={NextAdapter}>
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
