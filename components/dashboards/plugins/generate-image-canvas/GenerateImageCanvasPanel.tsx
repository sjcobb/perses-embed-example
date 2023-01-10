import React from 'react';
import { PanelProps } from '@perses-dev/plugin-system';
import { Box, Typography } from '@mui/material';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  const { spec: pluginSpec, contentDimensions } = props;
  const { query } = pluginSpec;
  const savedImage = pluginSpec.saved_image ?? 'Please update prompt to generate a new image';

  if (contentDimensions === undefined) {
    return null;
  }

  const promptHeader =
    pluginSpec.query.spec.plugin.spec.query.toString() ?? 'Empty - please update prompt in query editor';

  return (
    <Box
      sx={{
        height: contentDimensions.height,
        overflowY: 'scroll',
      }}
    >
      {isValidHttpUrl(savedImage) && (
        <>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Prompt: {promptHeader}
          </Typography>
          <img src={savedImage} alt={query.toString() ?? 'generated image'} />
        </>
      )}
      <Typography>Saved image: {savedImage}</Typography>
    </Box>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
