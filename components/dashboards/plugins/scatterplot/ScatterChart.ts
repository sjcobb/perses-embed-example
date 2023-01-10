import { PanelPlugin } from '@perses-dev/plugin-system';
import { createInitialScatterChartOptions, ScatterChartOptions } from './scatter-chart-model';
import { ScatterChartOptionsEditor } from './ScatterChartOptionsEditor';
import { ScatterChartPanel } from './ScatterChartPanel';

/**
 * The core ScatterChart panel plugin for Perses.
 */
export const ScatterChart: PanelPlugin<ScatterChartOptions> = {
  PanelComponent: ScatterChartPanel,
  OptionsEditorComponent: ScatterChartOptionsEditor,
  createInitialOptions: createInitialScatterChartOptions,
};
