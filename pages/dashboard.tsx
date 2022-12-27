import styles from '../styles/Home.module.css';
import Switch from '@mui/material/Switch';
import { Panel } from '../components/Panel';
// // //
// import { ChartsThemeProvider, LineChart, PersesChartsTheme } from '@perses-dev/components';
// import { Box } from '@mui/material';
// import dynamic from 'next/dynamic';
// const DynamicComponentWithNoSSR = dynamic(() => import('package'), { ssr: false });

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <section>
        <span>With default Theme:</span>
      </section>
      <section>
        <Switch {...label} defaultChecked />
        <Switch {...label} />
        <Switch {...label} disabled defaultChecked />
      </section>

      <section>
        <Panel height={500} />
      </section>
    </div>
  );
}
