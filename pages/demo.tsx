import { Box } from '@mui/material';
import { Panel } from '../components/Panel';
import { Spinner } from '../components/spinner';
import styles from '../styles/Home.module.css';

export default function Demo() {
  return (
    <>
      <Box className={styles.container}>
        <section>
          <h1>Perses - Components Demo</h1>
          <Panel height={500} />
        </section>
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <Spinner />
          <p>Test</p>
        </Box>
      </Box>
    </>
  );
}
