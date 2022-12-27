import React from 'react';
import { PanelProps } from '@perses-dev/plugin-system';
// import { Box, Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { ImageCanvas } from './ImageCanvas';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  const { contentDimensions /*, definition */ } = props;
  // const { rows, fetching, rowCount, pageSize, setPageSize, page, setPage } = useCustomPanel();

  if (contentDimensions === undefined) {
    return null;
  }

  // return <p>CUSTOM - GenerateImageCanvasPanel</p>;
  return (
    <Box>
      <ImageCanvas />
    </Box>
  );
}
