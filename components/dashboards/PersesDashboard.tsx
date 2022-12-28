import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { PluginRegistry } from '@perses-dev/plugin-system';
import { ChartsThemeProvider, PersesChartsTheme } from '@perses-dev/components';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  children: React.ReactNode;
};

const CHARTS_THEME: PersesChartsTheme = {
  echartsTheme: {},
  noDataOption: {},
  sparkline: {
    width: 1,
    color: '#000000',
  },
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
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <ChartsThemeProvider chartsTheme={CHARTS_THEME}>
          <PluginRegistry
            pluginLoader={bundledPluginLoader}
            defaultPluginKinds={{
              // Panel: 'TimeSeriesChart',
              Panel: 'GenerateImageCanvas',
            }}
          >
            {children}
          </PluginRegistry>
        </ChartsThemeProvider>
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
