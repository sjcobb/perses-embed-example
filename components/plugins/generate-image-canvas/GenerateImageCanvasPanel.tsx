import React from 'react';
import { PanelProps } from '@perses-dev/plugin-system';
// import { Box, Stack, Typography } from '@mui/material';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  const { contentDimensions /*, definition */ } = props;
  // const { rows, fetching, rowCount, pageSize, setPageSize, page, setPage } = useCustomPanel();

  if (contentDimensions === undefined) {
    return null;
  }

  return <p>CUSTOM - GenerateImageCanvasPanel</p>;
}
