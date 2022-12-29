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

// import { produce } from 'immer';
import { Stack, TextField } from '@mui/material';
// import { Stack, TextField, FormControl, InputLabel } from '@mui/material';
// import { DatasourceSelect, DatasourceSelectProps, useDatasourceClient } from '@perses-dev/plugin-system';
// import { DEFAULT_PROM, isDefaultPromSelector, isPrometheusDatasourceSelector, PrometheusClient } from '../../model';
// import { PromQLEditor } from '../../components';
import { PrometheusTimeSeriesQueryEditorProps } from './query-editor-model';

/**
 * The options editor component for editing a ImageQuery's spec.
 */
export function ImageQueryEditor(props: PrometheusTimeSeriesQueryEditorProps) {
  const { onChange, value } = props;
  console.log('ImageQueryEditor -> props: ', props);
  console.log('ImageQueryEditor -> value: ', props);
  // const { datasource } = value;
  // const selectedDatasource = datasource ?? DEFAULT_PROM;

  // const { data: client } = useDatasourceClient<PrometheusClient>(selectedDatasource);
  // const promURL = client?.options.datasourceUrl;

  // const { query, handleQueryChange, handleQueryBlur } = useQueryState(props);
  // const { format, handleFormatChange, handleFormatBlur } = useFormatState(props);

  // const handleDatasourceChange: DatasourceSelectProps['onChange'] = (next) => {
  //   if (isPrometheusDatasourceSelector(next)) {
  //     onChange(
  //       produce(value, (draft) => {
  //         // If they're using the default, just omit the datasource prop (i.e. set to undefined)
  //         const nextDatasource = isDefaultPromSelector(next) ? undefined : next;
  //         draft.datasource = nextDatasource;
  //       })
  //     );
  //     return;
  //   }

  //   throw new Error('Got unexpected non-Prometheus datasource selector');
  // };

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Enter Stable Diffusion Prompt"
        value={value.query ?? ''}
        // onChange={(e) => handleFormatChange(e.target.value)}
        // onBlur={handleFormatBlur}
        margin="dense"
      />
      {/* <PromQLEditor
        completeConfig={{ remote: { url: promURL } }}
        value={query}
        onChange={handleQueryChange}
        onBlur={handleQueryBlur}
      />
      <TextField
        fullWidth
        label="Series Name Format"
        value={format ?? ''}
        onChange={(e) => handleFormatChange(e.target.value)}
        onBlur={handleFormatBlur}
        margin="dense"
      />
      <FormControl margin="dense" fullWidth={false}>
        <InputLabel id="prom-datasource-label">Prometheus Datasource</InputLabel>
        <DatasourceSelect
          datasourcePluginKind="PrometheusDatasource"
          value={selectedDatasource}
          onChange={handleDatasourceChange}
          labelId="prom-datasource-label"
          label="Prometheus Datasource"
        />
      </FormControl> */}
    </Stack>
  );
}
