import { PanelPlugin } from '@perses-dev/plugin-system';
import { createInitialGenerateImageCanvasOptions, GenerateImageCanvasOptions } from './generate-image-canvas-model';
import { GenerateImageCanvasOptionsEditor } from './GenerateImageCanvasOptionsEditor';
import { GenerateImageCanvasPanel } from './GenerateImageCanvasPanel';

/**
 * Custom panel plugin to display AI generated images
 */
export const GenerateImageCanvas: PanelPlugin<GenerateImageCanvasOptions> = {
  PanelComponent: GenerateImageCanvasPanel,
  OptionsEditorComponent: GenerateImageCanvasOptionsEditor,
  createInitialOptions: createInitialGenerateImageCanvasOptions,
};
