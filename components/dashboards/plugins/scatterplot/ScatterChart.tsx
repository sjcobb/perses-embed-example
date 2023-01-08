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

import React, { useMemo } from 'react';
import { EChart, useChartsTheme, UnitOptions } from '@perses-dev/components';
import { use, EChartsCoreOption } from 'echarts/core';
import { ScatterChart as EChartsScatterChart, GaugeSeriesOption } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
// import { formatValue,  } from '../model/units';

use([EChartsScatterChart, GridComponent, TitleComponent, TooltipComponent, CanvasRenderer]);

export type ScatterChartValue = number | null | undefined;

export type ScatterSeries = {
  value: ScatterChartValue;
  label: string;
};

interface ScatterChartProps {
  width: number;
  height: number;
  data: ScatterSeries;
  unit: UnitOptions;
}

export function ScatterChart(props: ScatterChartProps) {
  const { width, height, data, unit } = props;
  const chartsTheme = useChartsTheme();

  // useDeepMemo ensures value size util does not rerun everytime you hover on the chart
  const option: EChartsCoreOption = useMemo(() => {
    if (data.value === undefined || data.value === null) return chartsTheme.noDataOption;
    return {
      // series: data.timeSeries,
      series: data,
      xAxis: {
        type: 'category',
        // data: data.xAxis,
        axisLabel: {
          // formatter: (value: number) => {
          //   return getFormattedDate(value, rangeMs, timeZone);
          // },
        },
      },
      yAxis: {},
      // yAxis: getYAxes(yAxis, unit),
      animation: false,
      tooltip: {
        show: true,
      },
      // grid,
      // legend,
    };
  }, [data, chartsTheme]);
  // }, [data, width, height, chartsTheme, unit]);

  return (
    <EChart
      sx={{
        width: width,
        height: height,
      }}
      option={option}
      theme={chartsTheme.echartsTheme}
    />
  );
}
