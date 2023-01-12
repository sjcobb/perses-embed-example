import { createTheme, ThemeProvider } from '@mui/material';
import { Header } from '../components';
import '../styles/globals.css';
import '../theme';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: 'Georgia, serif, Verdana',
      // fontFamily: '"Lato", Verdana, sans-serif',
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
      body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '20px',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
