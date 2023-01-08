import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface HeaderProps {
  height?: number;
}

export function Header({}: HeaderProps) {
  return (
    <Box
      sx={(theme) => ({
        padding: 2,
        background: theme.palette.grey['500'],
        a: {
          color: theme.palette.getContrastText(theme.palette.primary.main),
          textDecoration: 'none',
        },
      })}
    >
      <Stack direction="row" alignItems="center" gap={5}>
        <MuiLink target="_blank" href="https://github.com/perses/perses">
          <Typography variant="h1">Perses Embed Dashboard Example</Typography>
        </MuiLink>
        <Link href="dashboard">
          <Typography>Dashboard</Typography>
        </Link>
        <Link href="demo">
          <Typography>Components</Typography>
        </Link>
      </Stack>
    </Box>
  );
}
