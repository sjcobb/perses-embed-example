import { LineChart } from '@perses-dev/components';
import { Box } from '@mui/material';
import { formatMetrics } from '@/utils';

interface PanelProps {
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

export function Panel({ height }: PanelProps) {
  const formattedData = formatMetrics(mockData);
  const gridOverrides = {
    top: 60,
    bottom: 50,
  };
  const legendOverrides = {
    type: 'scroll',
    bottom: 0,
  };
  return (
    <Box sx={{ width: '600px' }}>
      <h2>Panel Test</h2>
      <LineChart data={formattedData} height={400} grid={gridOverrides} legend={legendOverrides} />
    </Box>
  );
}
