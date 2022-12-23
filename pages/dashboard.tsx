import styles from '../styles/Home.module.css';
import { ChartsThemeProvider, LineChart, PersesChartsTheme } from '@perses-dev/components';
import { Box } from '@mui/material';
import Switch from '@mui/material/Switch';

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

function formatMetrics(queryResult) {
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
function getLineSeries(name, data) {
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

function stringifyPrometheusMetricLabels(labels, removeExprWrap) {
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

function getUniqueKeyForPrometheusResult(metricLabels, removeExprWrap) {
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

function getRandomColor(identifier) {
  let hash = 0;
  for (let index = 0; index < identifier.length; index++) {
    hash = identifier.charCodeAt(index) + ((hash << 5) - hash);
  }
  // Use HSLA to only get random "bright" colors from this
  const color = `hsla(${~~(180 * hash)},50%,50%,0.8)`;
  return color;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const testChartsTheme: PersesChartsTheme = {
  echartsTheme: {},
  noDataOption: {},
  sparkline: {
    width: 1,
    color: '#000000',
  },
};

export default function Dashboard() {
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
    <div className={styles.container}>
      <section>
        <span>With default Theme:</span>
      </section>
      <section>
        <Switch {...label} defaultChecked />
        <Switch {...label} />
        <Switch {...label} disabled defaultChecked />
      </section>

      <section>
        <p>TODO: fix lodash-es ERR_REQUIRE_ESM issue</p>
        {/* <ChartsThemeProvider chartsTheme={testChartsTheme}>
          <Box>
            <LineChart
              data={formattedData}
              height={450}
              grid={gridOverrides}
              legend={legendOverrides}
            />
          </Box>
        </ChartsThemeProvider> */}
      </section>
    </div>
  );
}
