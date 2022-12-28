import React from 'react';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
import { Box } from '@mui/material';
import { GenerateImageCanvasOptions } from './generate-image-canvas-model';

export type GenerateImageCanvasOptionsEditorProps = OptionsEditorProps<GenerateImageCanvasOptions>;

export function GenerateImageCanvasOptionsEditor(props: GenerateImageCanvasOptionsEditorProps) {
  const { value } = props;
  return <Box>{JSON.stringify(value)}</Box>;
}
