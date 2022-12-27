// // import dynamic from 'next/dynamic';
// // const DynamicViewDashboard = dynamic(
// //   // () => import('@/components/EchartsLineChart'),
// //   // () => return ( import { ViewDashboard } from '@perses-dev/dashboards'),
// //   { ssr: false },
// // )
// import { useState } from 'react';
import { ViewDashboard } from '@perses-dev/dashboards';
import { DashboardResource } from '@perses-dev/core';
import { Box } from '@mui/material';
import { Panel } from '../components/Panel';
import { useDatasourceApi } from '../components/dashboards/datasource-api';
import styles from '../styles/Home.module.css';
// import { PersesDashboardProviders } from '../components/dashboards/PersesDashboardProviders';
import { PersesDashboard } from '../components/dashboards/PersesDashboard';

console.log(Panel);

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
            spec: {},
          },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 10,
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

async function getViewDashboard() {
  // const persesDashboardsPackage = (await import('@perses-dev/dashboards')).default;
  const persesDashboardsPackage = await import('@perses-dev/dashboards');
  console.log('persesDashboardsPackage: ', persesDashboardsPackage);
  return persesDashboardsPackage.ViewDashboard;
}

export default function Dashboard() {
  // const [dashboardView, setDashboardView] = useState<any>();
  // console.log('useState -> dashboardView: ', dashboardView);

  const datasourceApi = useDatasourceApi();

  // getViewDashboard().then((result) => {
  //   console.log('result: ', result);
  //   setDashboardView({ component: result });
  // });
  // if (dashboardView === undefined) {
  //   return <p>loading</p>;
  // }
  // const ViewDashboard = dashboardView.component;

  const props = {
    dashboardResource: dashboard,
    datasourceApi: datasourceApi,
    isReadonly: true,
    initialVariableIsSticky: true,
  };

  return (
    <>
      {/* <PersesDashboardProviders dashboard={dashboard}>
        <ViewDashboard {...props} />
      </PersesDashboardProviders> */}
      {/* <PersesDashboard>
        <ViewDashboard {...props} />
      </PersesDashboard> */}
      <Box className={styles.container}>
        <section>
          <Panel height={500} />
        </section>
      </Box>
      {/* <ViewDashboard {...props} /> */}
      {/* <ViewDashboard
        dashboardResource={dashboard}
        datasourceApi={datasourceApi}
        isReadonly={true}
        initialVariableIsSticky={true}
      /> */}
    </>
  );
}
