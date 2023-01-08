import { useState } from 'react';
import { produce } from 'immer';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
import { ImageQuerySpec } from './image-query-model';

export type PrometheusTimeSeriesQueryEditorProps = OptionsEditorProps<ImageQuerySpec>;

/**
 * A hook for managing the `query` state in ImageQuerySpec. Returns the `query` value, along with
 * `onChange` and `onBlur` event handlers to the input. Keeps a local copy of the user's input and only syncs those
 * changes with the overall spec value once the input is blurred to prevent re-running queries in the panel's preview
 * every time the user types.
 */
export function useQueryState(props: PrometheusTimeSeriesQueryEditorProps) {
  const { onChange, value } = props;

  // Local copy of the query's value
  const [query, setQuery] = useState(value.query);

  // This is basically "getDerivedStateFromProps" to make sure if spec's value changes external to this component,
  // we render with the latest value
  const [lastSyncedQuery, setLastSyncedQuery] = useState(value.query);
  if (value.query !== lastSyncedQuery) {
    setQuery(value.query);
    setLastSyncedQuery(value.query);
  }

  // Update our local state's copy as the user types
  const handleQueryChange = (e: string) => {
    setQuery(e);
  };

  // Propagate changes to the query's value when the input is blurred to avoid constantly re-running queries in the
  // PanelPreview
  const handleQueryBlur = () => {
    setLastSyncedQuery(query);
    onChange(
      produce(value, (draft) => {
        draft.query = query;
      })
    );
  };

  return { query, handleQueryChange, handleQueryBlur };
}
