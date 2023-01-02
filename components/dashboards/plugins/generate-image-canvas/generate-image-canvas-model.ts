import { TimeSeriesQueryDefinition } from '@perses-dev/core';

// export type GenerateImageCanvasOptions = Record<string, object>;

export interface GenerateImageCanvasOptions {
  query: TimeSeriesQueryDefinition;
  saved_image?: string;
}

export function createInitialGenerateImageCanvasOptions(): GenerateImageCanvasOptions {
  return {
    query: {
      kind: 'TimeSeriesQuery',
      spec: {
        plugin: {
          kind: 'ImageQuery',
          spec: {
            query: 'movie still of a robot flying on a hover board, award winning',
            saved_image: 'generated image url goes here',
          },
        },
      },
    },
  };
}
