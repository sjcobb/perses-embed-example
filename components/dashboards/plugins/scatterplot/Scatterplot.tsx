import React, { useMemo } from 'react';
import { EChart, useChartsTheme, UnitOptions } from '@perses-dev/components';
import { use, EChartsCoreOption } from 'echarts/core';
import { ScatterChart as EChartsScatterChart, ScatterSeriesOption } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([EChartsScatterChart, GridComponent, TitleComponent, TooltipComponent, CanvasRenderer]);

interface ScatterplotProps {
  width: number;
  height: number;
  data: ScatterSeriesOption[];
  xAxis?: EChartsCoreOption['xAxis'];
  unit: UnitOptions;
}

export function Scatterplot(props: ScatterplotProps) {
  const { width, height, data, unit, xAxis } = props;
  const chartsTheme = useChartsTheme();

  const option: EChartsCoreOption = useMemo(() => {
    if (!data) return chartsTheme.noDataOption;
    return {
      series: data,
      grid: {
        bottom: 40,
      },
      xAxis: {
        type: 'time',
        // TODO: customize axisLabel using https://echarts.apache.org/en/option.html#xAxis.axisLabel.formatter
      },
      yAxis: {},
      animation: false,
      tooltip: {
        show: true,
      },
      legend: {
        show: true,
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
      },
    };
  }, [data, chartsTheme]);

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
