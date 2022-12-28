import Head from 'next/head';
import Link from 'next/link';
import { Box, Stack } from '@mui/material';

export default function About() {
  return (
    <Box>
      <Head>
        <title>Perses Embed Example Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Stack>
        <Link href="/dashboard">Perses Embedded Dashboard Example</Link>
        <Link href="/paint">Start painting with Stable Diffusion</Link>
      </Stack>
    </Box>
  );
}
