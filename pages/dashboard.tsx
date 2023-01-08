import { ViewDashboard } from '@perses-dev/dashboards';
import { DashboardResource } from '@perses-dev/core';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useDatasourceApi } from '../components/dashboards/datasource-api';
import { PersesDashboard } from '../components/dashboards/PersesDashboard';

export const dashboard: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: 'Predictions Dashboard',
    created_at: '',
    updated_at: '',
    project: '',
    version: 0,
  },
  spec: {
    datasources: {},
    duration: '6h',
    variables: [],
    panels: {
      ImagePanelFirst: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'First Generated Image',
          },
          plugin: {
            kind: 'GenerateImageCanvas',
            spec: {
              saved_image: null,
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'ImageQuery',
                    spec: {
                      query: 'magazine cover of two otters playing basketball, hyper detailed, award winning',
                      query_enabled: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
      GaugeEx: {
        kind: 'Panel',
        spec: {
          display: { name: 'Gauge Panel Example' },
          plugin: {
            kind: 'GaugeChart',
            spec: {
              calculation: 'LastNumber',
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query: 'up{job=~"node|alertmanager"}',
                      series_name_format: '{{job}} {{env}} {{instance}}',
                    },
                  },
                },
              },
              thresholds: { steps: [{ value: 70 }, { value: 90 }] },
              unit: { kind: 'Percent' },
            },
          },
        },
      },
      TimeSeriesEx: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Time Series Panel Example',
            description: 'Description text',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        // "query": "node_load1{instance=~\"(demo.do.prometheus.io:9100)\",job='$job'}",
                        query: 'up',
                        series_name_format: 'job - {{job}}, {{env}} {{instance}}',
                      },
                    },
                  },
                },
              ],
              thresholds: {
                steps: [
                  { name: 'Alert: Warning condition example', value: 1.3 },
                  { name: 'Alert: Critical condition example', value: 1.5 },
                ],
              },
              unit: { decimal_places: 1, kind: 'PercentDecimal' },
            },
          },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          display: { title: 'Row 1', collapse: { open: true } },
          items: [
            {
              x: 0,
              y: 0,
              width: 16,
              height: 12,
              content: {
                $ref: '#/spec/panels/ImagePanelFirst',
              },
            },
            // {
            //   x: 16,
            //   y: 0,
            //   width: 8,
            //   height: 8,
            //   content: {
            //     $ref: '#/spec/panels/GaugeEx',
            //   },
            // },
          ],
        },
      },
      {
        kind: 'Grid',
        spec: {
          display: { title: 'Row 2', collapse: { open: false } },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: '#/spec/panels/TimeSeriesEx',
              },
            },
            {
              x: 16,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: '#/spec/panels/GaugeEx',
              },
            },
          ],
        },
      },
    ],
  },
};

export default function Dashboard() {
  const datasourceApi = useDatasourceApi();

  const theme = createTheme({
    typography: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 11,
      h2: {
        fontSize: '1.2rem',
      },
      h3: {
        fontSize: '1.05rem',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <PersesDashboard>
          <ViewDashboard
            dashboardResource={dashboard}
            datasourceApi={datasourceApi}
            isReadonly={true}
            initialVariableIsSticky={false}
            // enabledURLParams={false}
          />
        </PersesDashboard>
      </Box>
    </ThemeProvider>
  );
}
