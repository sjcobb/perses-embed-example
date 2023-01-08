import { TimeSeriesQueryDefinition } from '@perses-dev/core';

export interface GenerateImageCanvasOptions {
  query: TimeSeriesQueryDefinition;
  saved_image?: string;
}

export function createInitialGenerateImageCanvasOptions(): GenerateImageCanvasOptions {
  return {
    saved_image: 'generated image url goes here',
    query: {
      kind: 'TimeSeriesQuery',
      spec: {
        plugin: {
          kind: 'ImageQuery',
          spec: {
            query: 'movie still of a robot flying on a hover board, award winning',
          },
        },
      },
    },
  };
}
