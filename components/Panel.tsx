import { Box, Typography } from '@mui/material';
import { LineChart } from '@perses-dev/components';
import { formatMetrics } from '../utils';

/**
 * Panel Embed Example
 * https://github.com/perses/perses/blob/main/ui/components/README.md
 */

interface PanelProps {
  width?: number;
  height?: number;
}

const mockData = [
  {
    metric: {
      node: '1234567',
      environment: 'dev',
      type: 'example',
    },
    __name__: 'usage_count',
    values: [
      [1652788230, '1200700'],
      [1652788245, '2033700'],
      [1652788260, '1100344'],
      [1652788290, '1823555'],
      [1652788305, '2011000'],
      [1652788410, '990988'],
    ],
  },
  {
    metric: {
      node: 'abcdefg',
      environment: 'staging',
      type: 'test',
    },
    __name__: 'test_series',
    values: [
      [1652788230, '600900'],
      [1652788245, '1011100'],
      [1652788260, '900444'],
      [1652788290, '823111'],
      [1652788305, '700001'],
      [1652788410, '622221'],
    ],
  },
];

export function Panel({ width = 600, height = 400 }: PanelProps) {
  const formattedData = formatMetrics(mockData);
  const gridOverrides = {
    top: 30,
    bottom: 40,
  };
  const legendOverrides = {
    type: 'scroll',
    bottom: 0,
  };
  return (
    <Box sx={{ width, padding: 1 }}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing(1, 0, 0),
        })}
      >
        <Typography variant="h2">Panel Example</Typography>
      </Box>
      <LineChart data={formattedData} height={height} grid={gridOverrides} legend={legendOverrides} />
    </Box>
  );
}
