import { JSONEditor } from '@perses-dev/components';
import {
  OptionsEditorProps,
  OptionsEditorTabs,
  TimeSeriesQueryEditor,
  TimeSeriesQueryEditorProps,
} from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { ScatterChartOptions } from './scatter-chart-model';
import { ScatterChartOptionsEditorSettings } from './ScatterChartOptionsEditorSettings';

export type ScatterChartOptionsEditorProps = OptionsEditorProps<ScatterChartOptions>;

/**
 * Component for visually editing a Gauge Chart's spec.
 */
export function ScatterChartOptionsEditor(props: ScatterChartOptionsEditorProps) {
  const { onChange, value } = props;
  const { query } = value;

  const handleQueryChange: TimeSeriesQueryEditorProps['onChange'] = (next) => {
    onChange(
      produce(value, (draft) => {
        draft.query = next;
      })
    );
  };

  return (
    <OptionsEditorTabs
      tabs={{
        query: {
          content: <TimeSeriesQueryEditor value={query} onChange={handleQueryChange} />,
        },
        settings: {
          content: <ScatterChartOptionsEditorSettings {...props} />,
        },
        json: {
          content: <JSONEditor {...props} />,
        },
      }}
    />
  );
}
