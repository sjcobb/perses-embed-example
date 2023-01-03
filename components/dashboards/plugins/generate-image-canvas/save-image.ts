import { TimeSeriesQueryDefinition, UnknownSpec } from '@perses-dev/core';
import { useTimeSeriesQuery } from '@perses-dev/plugin-system';
import { GenerateImageCanvasOptions } from './generate-image-canvas-model';
import { ImageQuerySpec } from '../image-query/image-query-model';

/**
 * Update generated spec.saved_image in custom GenerateImageCanvasPanel dashboard JSON
 */
// export function useUpdateSavedImage(querySpec: TimeSeriesQueryDefinition, panelSpec: GenerateImageCanvasOptions) {
export function useUpdateSavedImage(
  // querySpec: TimeSeriesQueryDefinition<UnknownSpec>,
  querySpec: any,
  panelSpec: GenerateImageCanvasOptions
) {
  const { query } = querySpec.spec.plugin.spec;
  const suggestedStepMs = 100;
  const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

  // @ts-ignore
  if (data === undefined || data.output == null) {
    return null;
  }

  // @ts-ignore
  const imageURL = data?.output[0] ?? DEFAULT_IMAGE_URL;
  return imageURL;
}
