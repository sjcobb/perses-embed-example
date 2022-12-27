import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { PluginRegistry } from '@perses-dev/plugin-system';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  // dashboard: DashboardResource;
  children: React.ReactNode;
};

export function PersesDashboard({ children }: PersesDashboardProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <PluginRegistry
      pluginLoader={bundledPluginLoader}
      defaultPluginKinds={{
        Panel: 'TimeSeriesChart',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={NextAdapter}>{children}</QueryParamProvider>
      </QueryClientProvider>
    </PluginRegistry>
  );
}
