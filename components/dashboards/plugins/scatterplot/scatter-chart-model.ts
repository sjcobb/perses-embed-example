import { TimeSeriesQueryDefinition } from '@perses-dev/core';
import { UnitOptions } from '@perses-dev/components';

// TODO: add back panel settings
export const DEFAULT_UNIT: UnitOptions = { kind: 'Decimal', decimal_places: 2 };

/**
 * The Options object type supported by the ScatterChart panel plugin.
 */
export interface ScatterChartOptions {
  query: TimeSeriesQueryDefinition;
  unit?: UnitOptions;
}

/**
 * Creates the initial/empty options for a ScatterChart panel.
 */
export function createInitialScatterChartOptions(): ScatterChartOptions {
  return {
    query: {
      kind: 'TimeSeriesQuery',
      spec: {
        plugin: {
          kind: 'PrometheusTimeSeriesQuery',
          spec: {
            query: 'up',
          },
        },
      },
    },
  };
}
