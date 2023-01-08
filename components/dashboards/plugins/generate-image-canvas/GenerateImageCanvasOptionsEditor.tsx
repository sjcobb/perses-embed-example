import React from 'react';
import { produce } from 'immer';
import { GenerateImageCanvasOptions } from './generate-image-canvas-model';
import { Button, Typography, Stack } from '@mui/material';
import { JSONEditor } from '@perses-dev/components';
import {
  OptionsEditorProps,
  OptionsEditorTabs,
  TimeSeriesQueryEditor,
  TimeSeriesQueryEditorProps,
} from '@perses-dev/plugin-system';
import { useUpdateSavedImage } from './save-image';

export type GenerateImageCanvasOptionsEditorProps = OptionsEditorProps<GenerateImageCanvasOptions>;

export function GenerateImageCanvasOptionsEditor(props: GenerateImageCanvasOptionsEditorProps) {
  const { onChange, value } = props;
  const { query } = value;

  const querySpec = {
    kind: 'TimeSeriesQuery',
    spec: {
      plugin: {
        kind: 'ImageQuery',
        spec: {
          query: value.query,
          query_enabled: false,
        },
      },
    },
  };
  const { imageURL, isLoading } = useUpdateSavedImage(querySpec);

  if (imageURL) {
    onChange(
      produce(value, (draft: GenerateImageCanvasOptions) => {
        draft.saved_image = imageURL;
        draft.query.spec.plugin.spec.query_enabled = false;
      })
    );
  }

  const handleQueryChange: TimeSeriesQueryEditorProps['onChange'] = (next) => {
    onChange(
      produce(value, (draft) => {
        draft.query = next;
      })
    );
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {isLoading && <Typography>Image generating...</Typography>}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            onChange(
              produce(value, (draft: GenerateImageCanvasOptions) => {
                draft.saved_image = null;
                draft.query.spec.plugin.spec.query_enabled = true;
              })
            );
          }}
        >
          Reset Saved Image
        </Button>
        <Typography>Note: Image must be reset to null before a new image prompt query will run</Typography>
      </Stack>
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
    </>
  );
}
