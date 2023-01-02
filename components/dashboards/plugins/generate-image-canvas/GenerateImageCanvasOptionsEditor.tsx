import React from 'react';
import { produce } from 'immer';
import { GenerateImageCanvasOptions } from './generate-image-canvas-model';
import { JSONEditor } from '@perses-dev/components';
import {
  OptionsEditorProps,
  OptionsEditorTabs,
  TimeSeriesQueryEditor,
  TimeSeriesQueryEditorProps,
  // useTimeSeriesQuery,
} from '@perses-dev/plugin-system';

export type GenerateImageCanvasOptionsEditorProps = OptionsEditorProps<GenerateImageCanvasOptions>;

export function GenerateImageCanvasOptionsEditor(props: GenerateImageCanvasOptionsEditorProps) {
  const { onChange, value } = props;
  const { query } = value;

  const handleQueryChange: TimeSeriesQueryEditorProps['onChange'] = (next) => {
    console.log('(GenerateImageCanvasOptionsEditor) handleQueryChange -> next: ', next);
    // // TODO: add useTimeSeriesQuery function and predictions POST request here
    // const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

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
        json: {
          content: <JSONEditor {...props} />,
        },
      }}
    />
  );
}
