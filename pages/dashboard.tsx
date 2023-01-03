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
              saved_image: 'GenerateImageCanvas -> spec.saved_image',
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'ImageQuery',
                    spec: {
                      query: 'spec.query - initial test stable diffusion prompt',
                      query_enabled: false,
                    },
                  },
                },
              },
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
              width: 24,
              height: 18,
              content: {
                $ref: '#/spec/panels/ImagePanelFirst',
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
    },
  });
  console.log('Dashboard -> theme: ', theme);

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
