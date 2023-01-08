import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { ViewDashboard } from '@perses-dev/dashboards';
import { Box, createTheme, Link, ThemeProvider, Typography } from '@mui/material';
// import { Header } from '@/components';
import { Header } from '../components';
import { useDatasourceApi } from '../components/dashboards/datasource-api';
import { PersesDashboardProviders } from '../components/dashboards/PersesDashboardProviders';
import { dashboardSample } from '../data/dashboard-sample';

export default function Dashboard() {
  const datasourceApi = useDatasourceApi();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  const theme = createTheme({
    typography: {
      fontFamily: '"Lato", Verdana, sans-serif',
      fontSize: 11,
      h1: {
        fontSize: '1.4rem',
      },
      h2: {
        fontSize: '1.2rem',
      },
      h3: {
        fontSize: '1.05rem',
      },
      h4: {
        fontSize: '1.0rem',
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <ThemeProvider theme={theme}>
          <Box
            sx={
              {
                // fontFamily: '"Lato", Verdana, sans-serif',
              }
            }
          >
            <Header />
            <PersesDashboardProviders>
              <ViewDashboard
                dashboardResource={dashboardSample}
                datasourceApi={datasourceApi}
                // dashboardTitleComponent={
                //   <DashboardBreadcrumbs
                //     dashboardName={data.spec.display ? data.spec.display.name : data.metadata.name}
                //     dashboardProject={data.metadata.project}
                //   />
                // }
                // onSave={updateDashboard}
                initialVariableIsSticky={false}
                isReadonly={true}
                // enabledURLParams={false}
              />
            </PersesDashboardProviders>
          </Box>
        </ThemeProvider>
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
