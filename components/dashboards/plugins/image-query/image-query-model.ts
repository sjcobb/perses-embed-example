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

import { DatasourceSelector, DurationString } from '@perses-dev/core';
// import { TemplateString } from '@perses-dev/prometheus-plugin';
// import { PrometheusDatasourceSelector, TemplateString } from '../../model';

/**
 * The spec/options for the ImageQuery plugin.
 */
export interface ImageQuerySpec {
  query?: string;
  datasource?: any;
  completed_at?: string;
  created_at?: string;
  // error
  id?: string;
  // input
  // logs
  // metrics
  output?: any;
  // started_at
  // status
  // urls
  // version
  // webhook_completed
  //
  // query: TemplateString;
  // // resolution?: number;
  // // datasource?: PrometheusDatasourceSelector;
}
// export interface PrometheusTimeSeriesQuerySpec {
//   query: TemplateString;
//   series_name_format?: string;
//   min_step?: DurationString;
//   resolution?: number;
//   datasource?: PrometheusDatasourceSelector;
// }

export const PROM_DATASOURCE_KIND = 'PrometheusDatasource' as const;

/**
 * DatasourceSelector for Prom Datasources.
 */
export interface PrometheusDatasourceSelector extends DatasourceSelector {
  kind: typeof PROM_DATASOURCE_KIND;
}

/**
 * A default selector that asks for the default Prom Datasource.
 */
export const DEFAULT_PROM: PrometheusDatasourceSelector = { kind: PROM_DATASOURCE_KIND };
