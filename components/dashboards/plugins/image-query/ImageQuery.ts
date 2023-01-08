import { TimeSeriesQueryPlugin } from '@perses-dev/plugin-system';
import { getTimeSeriesData } from './get-image-data';
import { ImageQueryEditor } from './ImageQueryEditor';
import { ImageQuerySpec } from './image-query-model';

/**
 * The core Prometheus TimeSeriesQuery plugin for Perses.
 */
export const ImageQuery: TimeSeriesQueryPlugin<ImageQuerySpec> = {
  getTimeSeriesData,
  OptionsEditorComponent: ImageQueryEditor,
  createInitialOptions: () => ({
    query: '',
    datasource: undefined,
  }),
};
