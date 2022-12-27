import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { WindowHistoryAdapter } from 'use-query-params/adapters/window';
import { PluginRegistry } from '@perses-dev/plugin-system';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  // dashboard: DashboardResource;
  children: React.ReactNode;
};

export function PersesDashboard({ children }: PersesDashboardProps) {
  return (
    <PluginRegistry
      pluginLoader={bundledPluginLoader}
      defaultPluginKinds={{
        Panel: 'TimeSeriesChart',
      }}
    >
      <QueryParamProvider adapter={WindowHistoryAdapter}>{children}</QueryParamProvider>
    </PluginRegistry>
  );
}
