import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { PluginRegistry } from '@perses-dev/plugin-system';
import {
  ChartsThemeProvider,
  EChartsTheme,
  generateChartsTheme,
  PersesChartsTheme,
  ErrorAlert,
  ErrorBoundary,
} from '@perses-dev/components';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  children: React.ReactNode;
};

// app specific echarts option overrides
const ECHARTS_THEME_OVERRIDES: EChartsTheme = {
  // https://echarts.apache.org/en/theme-builder.html
  color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
  textStyle: {
    // color: 'yellow',
    fontFamily: 'Georgia',
    // fontFamily: 'sans-serif',
  },
  categoryAxis: {
    axisLine: {
      // https://echarts.apache.org/en/option.html#xAxis.axisLine.lineStyle
      lineStyle: {
        color: '#000',
        width: 4,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        // color: '#000',
        width: 2,
        opacity: 0.8,
      },
    },
  },
  valueAxis: {
    // show: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 4,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 1,
        opacity: 0.8,
      },
    },
  },
  // https://echarts.apache.org/en/option.html#series-line.type
  line: {},
};

export function PersesDashboardProviders({ children }: PersesDashboardProps) {
  const muiTheme = useTheme();
  // https://github.com/perses/perses/blob/main/ui/components/src/utils/theme-gen.ts
  const chartsTheme: PersesChartsTheme = useMemo(() => {
    return generateChartsTheme(muiTheme, ECHARTS_THEME_OVERRIDES);
  }, [muiTheme]);

  return (
    <ChartsThemeProvider chartsTheme={chartsTheme}>
      <ErrorBoundary FallbackComponent={ErrorAlert}>
        <PluginRegistry
          pluginLoader={bundledPluginLoader}
          defaultPluginKinds={{
            Panel: 'TimeSeriesChart',
            // Panel: 'GenerateImageCanvas',
          }}
        >
          {children}
        </PluginRegistry>
      </ErrorBoundary>
    </ChartsThemeProvider>
  );
}
