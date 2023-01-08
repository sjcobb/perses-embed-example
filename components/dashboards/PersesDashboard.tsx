import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { useTheme } from '@mui/material';
import { PluginRegistry } from '@perses-dev/plugin-system';
import { ChartsThemeProvider, EChartsTheme, generateChartsTheme, PersesChartsTheme } from '@perses-dev/components';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  children: React.ReactNode;
};

// app specific echarts option overrides
const ECHARTS_THEME_OVERRIDES: EChartsTheme = {
  // https://echarts.apache.org/en/theme-builder.html
  color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
  categoryAxis: {
    splitLine: {
      show: true,
    },
  },
  valueAxis: {
    // show: false,
  },
  // https://echarts.apache.org/en/option.html#series-line.type
  line: {
    showSymbol: false,
    symbol: 'none',
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

  const muiTheme = useTheme();
  // https://github.com/perses/perses/blob/main/ui/components/src/utils/theme-gen.ts
  const chartsTheme: PersesChartsTheme = useMemo(() => {
    return generateChartsTheme(muiTheme, ECHARTS_THEME_OVERRIDES);
  }, [muiTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <ChartsThemeProvider chartsTheme={chartsTheme}>
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
