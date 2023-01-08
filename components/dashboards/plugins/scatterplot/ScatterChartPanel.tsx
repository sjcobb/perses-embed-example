// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useTimeSeriesQuery, PanelProps } from '@perses-dev/plugin-system';
import { Box, Skeleton } from '@mui/material';
import { useMemo } from 'react';
import { ScatterChartOptions } from './scatter-chart-model';
import { Scatterplot, ScatterSeries } from './Scatterplot';

export type ScatterChartPanelProps = PanelProps<ScatterChartOptions>;

export function ScatterChartPanel(props: ScatterChartPanelProps) {
  const {
    spec: { query, unit },
    contentDimensions,
  } = props;
  // const suggestedStepMs = useSuggestedStepMs(contentDimensions?.width);
  const suggestedStepMs = 15000;
  const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

  const scatterData: ScatterSeries[] = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    const seriesData: ScatterSeries[] = [];
    for (const timeSeries of data.series) {
      const formattedSeriesName = timeSeries.formattedName ?? timeSeries.name;
      const timeSeriesValues = [['timestamp', 'value'], ...timeSeries.values];
      const scatterSeries = {
        type: 'scatter',
        name: formattedSeriesName,
        data: timeSeriesValues,
        // color: getRandomColor(name), // use full series name as generated color seed (must match param in legendItems)
        // symbolSize: pointRadius,
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
