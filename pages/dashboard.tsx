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
      GaugeExample: {
        kind: 'Panel',
        spec: {
          display: { name: 'Gauge Example' },
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
                      query: 'up',
                    },
                  },
                },
              },
              thresholds: { steps: [{ value: 0.2 }, { value: 0.35 }] },
              unit: { kind: 'PercentDecimal' },
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
            // {
            //   x: 0,
            //   y: 0,
            //   width: 16,
            //   height: 12,
            //   content: {
            //     $ref: '#/spec/panels/ImagePanelFirst',
            //   },
            // },
            // {
            //   x: 16,
            //   y: 0,
            //   width: 8,
            //   height: 8,
            //   content: {
            //     $ref: '#/spec/panels/GaugeExample',
            //   },
            // },
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
