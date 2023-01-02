import React from 'react';
// import { PanelProps, useTimeSeriesQuery } from '@perses-dev/plugin-system';
import { PanelProps } from '@perses-dev/plugin-system';
import { Box, Link } from '@mui/material';
// import { ImageCanvas } from './ImageCanvas';

import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150';

export function GenerateImageCanvasPanel(props: PanelProps<GenerateImageCanvasOptions>) {
  console.log('(GenerateImageCanvasPanel) - props: ', props);
  const { spec: pluginSpec, contentDimensions } = props;
  const { query } = pluginSpec;

  const savedImage = pluginSpec.saved_image ?? 'saved_image undefined';

  // const suggestedStepMs = 100;
  // const { data, isLoading, error } = useTimeSeriesQuery(query, { suggestedStepMs });

  if (contentDimensions === undefined) {
    return null;
  }

  // console.log('(GenerateImageCanvasPanel) - data: ', data);

  // // @ts-ignore
  // if (data === undefined || data.output == null) {
  //   return <p>Generated image null - please try a new prompt</p>;
  // }

  // // @ts-ignore
  // const imageURL = data?.output[0] ?? DEFAULT_IMAGE_URL;

  // props.spec.saved_image = imageURL;

  console.log('(GenerateImageCanvasPanel) - query: ', query);
  console.log('(GenerateImageCanvasPanel) - savedImage: ', savedImage);

  return (
    <Box>
      {/* <ImageCanvas /> */}
      {/* <Link href={imageURL} target="_blank">
        {imageURL}
      </Link> */}
      {/* <p>Prompt: {pluginSpec.query}</p> */}
      <p>Saved image: {savedImage}</p>
      {/* <img src={imageURL} alt={query.toString() ?? 'generated image'} /> */}
    </Box>
  );
}
