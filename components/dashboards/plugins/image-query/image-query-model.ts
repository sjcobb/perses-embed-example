import { DatasourceSelector } from '@perses-dev/core';

/**
 * The spec/options for the ImageQuery plugin.
 */
export interface ImageQuerySpec {
  query?: string;
  query_enabled?: boolean;
  datasource?: any;
  completed_at?: string;
  created_at?: string;
  id?: string;
  output?: any;
}

export const PROM_DATASOURCE_KIND = 'PrometheusDatasource' as const;
