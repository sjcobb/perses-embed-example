import { DashboardResource } from '@perses-dev/core';
import { ViewDashboard } from '@perses-dev/dashboards';
import { Box } from '@mui/material';
import { Panel } from '../components/Panel';
import { useDatasourceApi } from '../components/dashboards/datasource-api';
import styles from '../styles/Home.module.css';

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

export default function Dashboard() {
  const datasourceApi = useDatasourceApi();
  return (
    <>
      <Box className={styles.container}>
        <section>
          <Panel height={500} />
        </section>
      </Box>
      {/* <ViewDashboard
        dashboardResource={dashboard}
        datasourceApi={datasourceApi}
        isReadonly={true}
        initialVariableIsSticky={true}
      /> */}
    </>
  );
}
