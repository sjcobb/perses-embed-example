import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { NextAdapter } from 'next-query-params';
import { ViewDashboard } from '@perses-dev/dashboards';
import { Box } from '@mui/material';
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

  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <Box>
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
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
