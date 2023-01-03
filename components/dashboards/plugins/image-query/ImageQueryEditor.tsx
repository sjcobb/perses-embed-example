// Copyright 2022 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
