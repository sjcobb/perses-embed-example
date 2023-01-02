import React from 'react';
import { PanelProps, useTimeSeriesQuery } from '@perses-dev/plugin-system';
import { Box, Link } from '@mui/material';
import { ImageCanvas } from './ImageCanvas';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  const { spec: pluginSpec, contentDimensions } = props;
  const { query } = pluginSpec;

  const suggestedStepMs = 100;

  const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

  if (contentDimensions === undefined) {
    return null;
  }

  if (contentDimensions === undefined) {
    return null;
  }

  // @ts-ignore
  if (data === undefined || data.output == null) {
    return null;
  }

  // @ts-ignore
  const imageURL = data?.output[0] ?? DEFAULT_IMAGE_URL;

  return (
    <Box>
      <ImageCanvas />
      <Link href={imageURL} target="_blank">
        {imageURL}
      </Link>
      <img src={imageURL} alt={query} />
    </Box>
  );
}
