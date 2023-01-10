import { merge } from 'lodash-es';
import { TextField } from '@mui/material';
import { CalculationSelector, CalculationSelectorProps } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { DEFAULT_CALCULATION } from '@perses-dev/plugin-system';
import {
  UnitSelector,
  UnitSelectorProps,
  OptionsEditorGroup,
  OptionsEditorGrid,
  OptionsEditorColumn,
  OptionsEditorControl,
} from '@perses-dev/components';
import { ScatterChartOptionsEditorProps } from './ScatterChartOptionsEditor';
import { ScatterChartOptions, DEFAULT_UNIT } from './scatter-chart-model';

export function ScatterChartOptionsEditorSettings(props: ScatterChartOptionsEditorProps) {
  const { onChange, value } = props;

  // TODO: add back support for changing unit formatter
  // - https://github.com/perses/perses/blob/main/ui/panels-plugin/src/plugins/gauge-chart/GaugeChartPanel.tsx
  const handleUnitChange: UnitSelectorProps['onChange'] = (newUnit) => {
    onChange(
      produce(value, (draft: ScatterChartOptions) => {
        draft.unit = newUnit;
      })
    );
  };

  // ensures decimal_places defaults to correct value
  const unit = merge({}, DEFAULT_UNIT, value.unit);

  return (
    <OptionsEditorGrid>
      <OptionsEditorColumn>
        <OptionsEditorGroup title="Misc">
          <UnitSelector value={unit} onChange={handleUnitChange} />
        </OptionsEditorGroup>
      </OptionsEditorColumn>
    </OptionsEditorGrid>
  );
}
