import React from 'react';
import { produce } from 'immer';
// import { Box } from '@mui/material';
import { GenerateImageCanvasOptions } from './generate-image-canvas-model';
// //
import { JSONEditor } from '@perses-dev/components';
import {
  OptionsEditorProps,
  OptionsEditorTabs,
  TimeSeriesQueryEditor,
  TimeSeriesQueryEditorProps,
} from '@perses-dev/plugin-system';

// // import { GaugeChartOptions } from './gauge-chart-model';
// import { GaugeChartOptionsEditorSettings } from './GaugeChartOptionsEditorSettings';

export type GenerateImageCanvasOptionsEditorProps = OptionsEditorProps<GenerateImageCanvasOptions>;

export function GenerateImageCanvasOptionsEditor(props: GenerateImageCanvasOptionsEditorProps) {
  // const { value } = props;
  // return <Box>{JSON.stringify(value)}</Box>;

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
        // settings: {
        //   content: <GaugeChartOptionsEditorSettings {...props} />,
        // },
        json: {
          content: <JSONEditor {...props} />,
        },
      }}
    />
  );
}
