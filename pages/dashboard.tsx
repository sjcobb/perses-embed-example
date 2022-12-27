import styles from '../styles/Home.module.css';
import Switch from '@mui/material/Switch';
import { Panel } from '../components/Panel';
// import DynamicPanel from '../components/DynamicPanel';

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
        {/* <DynamicPanel /> */}
      </section>
    </div>
  );
}
