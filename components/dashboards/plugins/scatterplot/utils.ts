import { getSuggestedStepMs } from '@perses-dev/core';
import { useTimeRange } from '@perses-dev/plugin-system';

/**
 * Gets the suggested step for a graph query in ms for the currently selected time range.
 */
export function useSuggestedStepMs(width?: number) {
  const { absoluteTimeRange } = useTimeRange();
  if (width === undefined) return 0;
  return getSuggestedStepMs(absoluteTimeRange, width);
}
