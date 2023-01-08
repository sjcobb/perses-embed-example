import { DashboardResource } from '@perses-dev/core';

export const dashboardSample: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: 'Sample Dashboard',
    created_at: '',
    updated_at: '',
    project: '',
    version: 0,
  },
  spec: {
    datasources: {},
    duration: '1h',
    // variables: [],
    variables: [
      { kind: 'TextVariable', spec: { name: 'job', value: 'node' } },
      // {
      //   kind: 'ListVariable',
      //   spec: {
      //     name: 'instance',
      //     default_value: 'demo.do.prometheus.io:9100',
      //     allow_all_value: false,
      //     allow_multiple: false,
      //     plugin: {
      //       kind: 'PrometheusLabelValuesVariable',
      //       spec: {
      //         label_name: 'instance',
      //         matchers: ['up{job=~"$job"}'],
      //       },
      //     },
      //   },
      // },
      // {
      //   kind: 'ListVariable',
      //   spec: {
      //     name: 'interval',
      //     allow_all_value: false,
      //     allow_multiple: false,
      //     plugin: {
      //       kind: 'StaticListVariable',
      //       spec: { values: ['1m', '5m'] },
      //     },
      //   },
      // },
    ],
    panels: {
      TimeSeriesEx: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Time Series Panel Example',
            description: 'Description text',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'node_load1{instance=~"(demo.do.prometheus.io:9100)"}',
                        // query: 'node_load1{instance=~"(demo.do.prometheus.io:9100)",job=~"node|alertmanager"}',
                        // query: 'up',
                        series_name_format: 'job - {{job}}, {{env}} {{instance}}',
                      },
                    },
                  },
                },
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'node_load15{instance=~"(demo.do.prometheus.io:9100)"}',
                        series_name_format: 'job - {{job}}, {{env}} {{instance}}',
                      },
                    },
                  },
                },
              ],
              thresholds: {
                steps: [
                  // { name: 'Alert: Warning condition example', value: 0.4 },
                  { name: 'Alert: Critical condition example', value: 0.5, color: 'red' },
                ],
              },
              y_axis: {
                // show: false,
                label: 'Y Axis Label',
                unit: { kind: 'Decimal', decimal_places: 1 },
              },
            },
          },
        },
      },
      ImagePanelFirst: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'First Generated Image',
          },
          plugin: {
            kind: 'GenerateImageCanvas',
            spec: {
              saved_image: null,
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'ImageQuery',
                    spec: {
                      query: 'magazine cover of two otters playing basketball, hyper detailed, award winning',
                      query_enabled: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
      GaugeEx: {
        kind: 'Panel',
        spec: {
          display: { name: 'Gauge Panel Example' },
          plugin: {
            kind: 'GaugeChart',
            spec: {
              calculation: 'LastNumber',
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query: 'up{job=~"node|alertmanager"}',
                      series_name_format: '{{job}} {{env}} {{instance}}',
                    },
                  },
                },
              },
              thresholds: { steps: [{ value: 70 }, { value: 90 }] },
              unit: { kind: 'Percent' },
            },
          },
        },
      },
      StatEx: {
        kind: 'Panel',
        spec: {
          display: { name: 'Stat Panel Example' },
          plugin: {
            kind: 'StatChart',
            spec: {
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query: 'up{job=~"node|alertmanager"}',
                      series_name_format: '{{job}} {{env}} {{instance}}',
                    },
                  },
                },
              },
              calculation: 'Sum',
              unit: { kind: 'Decimal' },
              // sparkline: {},
            },
          },
        },
      },
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          display: { title: 'Row 1', collapse: { open: true } },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: '#/spec/panels/TimeSeriesEx',
              },
            },
            {
              x: 12,
              y: 0,
              width: 8,
              height: 8,
              content: {
                $ref: '#/spec/panels/GaugeEx',
              },
            },
            {
              x: 20,
              y: 0,
              width: 4,
              height: 8,
              content: {
                $ref: '#/spec/panels/StatEx',
              },
            },
          ],
        },
      },
      {
        kind: 'Grid',
        spec: {
          display: { title: 'Row 2', collapse: { open: false } },
          items: [
            {
              x: 0,
              y: 0,
              width: 16,
              height: 12,
              content: {
                $ref: '#/spec/panels/ImagePanelFirst',
              },
            },
            // {
            //   x: 16,
            //   y: 0,
            //   width: 8,
            //   height: 8,
            //   content: {
            //     $ref: '#/spec/panels/GaugeEx',
            //   },
            // },
          ],
        },
      },
    ],
  },
};
