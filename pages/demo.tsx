import { useMemo } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ChartsThemeProvider, EChartsTheme, generateChartsTheme, PersesChartsTheme } from '@perses-dev/components';
import { Panel } from '../components';

// app specific echarts option overrides
const ECHARTS_THEME_OVERRIDES: EChartsTheme = {
  // https://echarts.apache.org/en/theme-builder.html
  color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
  textStyle: {
    color: '#000000',
    fontFamily: 'Georgia',
    fontSize: 12,
  },
  categoryAxis: {
    splitLine: {
      show: true,
    },
  },
  valueAxis: {
    // show: false,
  },
  // https://echarts.apache.org/en/option.html#series-line.type
  line: {},
};

export default function Demo() {
  const muiTheme = useTheme();
  // https://github.com/perses/perses/blob/main/ui/components/src/utils/theme-gen.ts
  const chartsTheme: PersesChartsTheme = useMemo(() => {
    return generateChartsTheme(muiTheme, ECHARTS_THEME_OVERRIDES);
  }, [muiTheme]);
  return (
    <ChartsThemeProvider chartsTheme={chartsTheme}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h2">Perses - Components Demo</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Panel width={600} height={400} />
        </Stack>
      </Box>
    </ChartsThemeProvider>
  );
}
