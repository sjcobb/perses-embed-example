import { Stack, TextField } from '@mui/material';
import { PrometheusTimeSeriesQueryEditorProps, useQueryState } from './query-editor-model';

/**
 * The options editor component for editing a ImageQuery's spec.
 */
export function ImageQueryEditor(props: PrometheusTimeSeriesQueryEditorProps) {
  const { onChange, value } = props;
  const { query, handleQueryChange, handleQueryBlur } = useQueryState(props);

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Enter Stable Diffusion Prompt"
        value={query ?? ''}
        onChange={(e) => handleQueryChange(e.target.value)}
        onBlur={handleQueryBlur}
        margin="dense"
      />
    </Stack>
  );
}
