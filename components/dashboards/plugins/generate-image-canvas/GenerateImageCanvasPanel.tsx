import React from 'react';
import { PanelProps, useTimeSeriesQuery } from '@perses-dev/plugin-system';
// import { Box, Stack, Typography } from '@mui/material';
import { Box, Link } from '@mui/material';
import { ImageCanvas } from './ImageCanvas';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  console.log('GenerateImageCanvasPanel -> props: ', props);
  // const { contentDimensions /*, definition */ } = props;
  // // const { rows, fetching, rowCount, pageSize, setPageSize, page, setPage } = useCustomPanel();
  const { spec: pluginSpec, contentDimensions } = props;
  const { query } = pluginSpec;

  // const suggestedStepMs = useSuggestedStepMs(contentDimensions?.width);
  const suggestedStepMs = 100;

  // const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });
  const { data } = useTimeSeriesQuery(query, { suggestedStepMs });
  console.log('GenerateImageCanvasPanel -> data: ', data);

  if (contentDimensions === undefined) {
    return null;
  }

  if (contentDimensions === undefined) {
    return null;
  }

  // @ts-ignore
  const imageURL = data?.output[0] ?? DEFAULT_IMAGE_URL;
  console.log('GenerateImageCanvasPanel -> data: ', data);

  // return <p>CUSTOM - GenerateImageCanvasPanel</p>;
  return (
    <Box>
      <ImageCanvas />
      <Link href={imageURL} target="_blank">
        {imageURL}
      </Link>
    </Box>
  );
}
