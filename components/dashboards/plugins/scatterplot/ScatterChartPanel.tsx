import { useTimeSeriesQuery, PanelProps } from '@perses-dev/plugin-system';
import { Box, Skeleton } from '@mui/material';
import { ScatterSeriesOption } from 'echarts/charts';
import { useMemo } from 'react';
import { ScatterChartOptions } from './scatter-chart-model';
import { Scatterplot } from './Scatterplot';
import { useSuggestedStepMs } from './utils';

export type ScatterChartPanelProps = PanelProps<ScatterChartOptions>;

export function ScatterChartPanel(props: ScatterChartPanelProps) {
  const {
    spec: { query, unit },
    contentDimensions,
  } = props;
  const suggestedStepMs = useSuggestedStepMs(contentDimensions?.width) * 10; // temp calc for demo
  const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

  const scatterData = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    const seriesData: ScatterSeriesOption[] = [];
    for (const timeSeries of data.series) {
      const formattedSeriesName = timeSeries.formattedName ?? timeSeries.name;
      const timeSeriesValues = [['timestamp', 'value'], ...timeSeries.values];
      const scatterSeries: ScatterSeriesOption = {
        type: 'scatter', // https://echarts.apache.org/en/option.html#series-scatter.type
        name: formattedSeriesName,
        data: timeSeriesValues,
        symbolSize: 4,
      };
      seriesData.push(scatterSeries);
    }
    return seriesData;
  }, [data]);

  if (error) throw error;

  if (contentDimensions === undefined) return null;

  if (isLoading === true) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        width={contentDimensions.width}
        height={contentDimensions.height}
      >
        <Skeleton variant="text" width={contentDimensions.width - 20} height={contentDimensions.height / 2} />
      </Box>
    );
  }

  return (
    <Scatterplot width={contentDimensions.width} height={contentDimensions.height} data={scatterData} unit={unit} />
  );
}
