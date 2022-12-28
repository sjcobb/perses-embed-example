import { Box } from '@mui/material';
import { Panel } from '../components/Panel';
import styles from '../styles/Home.module.css';

export default function Demo() {
  return (
    <>
      <Box className={styles.container}>
        <section>
          <h1>Perses - Components Demo</h1>
          <Panel height={500} />
        </section>
      </Box>
    </>
  );
}
