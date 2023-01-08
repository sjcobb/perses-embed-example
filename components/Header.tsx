import { Box, Link, Typography } from '@mui/material';

interface HeaderProps {
  height?: number;
}

export function Header({}: HeaderProps) {
  return (
    <Box
      sx={(theme) => ({
        padding: 2,
        background: theme.palette.grey['500'],
      })}
    >
      <Link target="_blank" href="https://github.com/perses/perses" sx={{ textDecoration: 'none' }}>
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.getContrastText(theme.palette.primary.main),
          })}
        >
          Perses Embed Dashboard Example
        </Typography>
      </Link>
    </Box>
  );
}
