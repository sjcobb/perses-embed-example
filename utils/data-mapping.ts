export function formatMetrics(queryResult) {
  const graphData = { timeSeries: [], xAxis: [] };
  const xValues = new Set();
  for (const result of queryResult) {
    const yValues = [];
    if ('values' in result) {
      for (const [x, y] of result.values) {
        xValues.add(Number(x) * 1000);
        yValues.push(Number(y));
      }
      const name = getUniqueKeyForPrometheusResult(result.metric, true);
      const lineSeries = getLineSeries(name, yValues);
      graphData.timeSeries.push(lineSeries);
    }
  }
  graphData.xAxis = Array.from(xValues).sort();
  return graphData;
}

// https://echarts.apache.org/en/option.html#series-line.type
export function getLineSeries(name, data) {
  return {
    type: 'line',
    name: name,
    data: data,
    color: getRandomColor(name),
    showSymbol: false,
    symbol: 'circle',
    sampling: 'lttb',
    lineStyle: {
      width: 1,
    },
    emphasis: {
      lineStyle: {
        width: 1.5,
      },
    },
    markLine: {},
  };
}

export function stringifyPrometheusMetricLabels(labels, removeExprWrap) {
  const labelStrings = [];
  Object.keys(labels)
    .sort()
    .forEach((labelName) => {
      const labelValue = labels[labelName];
      if (typeof labelValue === 'string') {
        if (removeExprWrap) {
          labelStrings.push(`"${labelName}":"${labelValue}"`);
        } else {
          labelStrings.push(`${labelName}="${labelValue}"`);
        }
      }
    });
  return `{${labelStrings.join(',')}}`;
}

export function getUniqueKeyForPrometheusResult(metricLabels, removeExprWrap) {
  const metricNameKey = '__name__';
  if (!!metricLabels) {
    if (metricLabels.hasOwnProperty(metricNameKey)) {
      const stringifiedLabels = stringifyPrometheusMetricLabels(
        {
          ...metricLabels,
          [metricNameKey]: undefined,
        },
        removeExprWrap
      );
      if (removeExprWrap) {
        return `${stringifiedLabels}`;
      } else {
        return `${metricLabels[metricNameKey]}${stringifiedLabels}`;
      }
    }
    return stringifyPrometheusMetricLabels(metricLabels, removeExprWrap);
  }
  return '';
}

export function getRandomColor(identifier) {
  let hash = 0;
  for (let index = 0; index < identifier.length; index++) {
    hash = identifier.charCodeAt(index) + ((hash << 5) - hash);
  }
  // Use HSLA to only get random "bright" colors from this
  const color = `hsla(${~~(180 * hash)},50%,50%,0.8)`;
  return color;
}
