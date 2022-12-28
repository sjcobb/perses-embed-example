import { DashboardResource, GridItemDefinition, PanelDefinition } from '@perses-dev/core';

/**
 * Takes a list of Panels and creates a simple layout for them
 * given a row height and panels per row.
 */
export function generateSimplePanelLayout(
  panels: Record<string, object>,
  { panelsPerRow = 2, rowHeight = 4 }: { panelsPerRow: number; rowHeight: number }
): GridItemDefinition[] {
  const ROW_SPAN = 24;
  const panelWidth = ROW_SPAN / panelsPerRow;

  return Object.keys(panels).map((slug: string, idx: number) => {
    return {
      content: {
        $ref: `#/spec/panels/${slug}`,
      },
      width: panelWidth,
      height: rowHeight,
      x: (idx % panelsPerRow) * panelWidth,
      y: Math.floor(idx / panelsPerRow) * rowHeight,
    };
  });
}

/**
 * Convert predictions to individual Perses panels
 */
// function predictionsToPanels(predictions: Prediction[]) {
function predictionsToPanels(predictions: any) {
  // const panels: Record<string, PanelDefinition> = {};
  const panels: Record<string, any> = {};
  predictions.forEach((monitor) => {
    const { slug, name, spec } = monitor;
    panels[slug] = {
      display: {
        name: name,
      },
      kind: 'LineChart',
      options: {
        queries: [
          {
            kind: 'PrometheusGraphQuery',
            options: {
              query: spec.query.queryExpression,
            },
          },
        ],
        unit: {
          kind: 'Decimal',
        },
      },
    };
  });
  return panels;
}

/**
 * Given a list of predictions, return a simple Perses dashboard.
 */
export function convertPredictionsToPersesDashboard(
  // predictions: Prediction[]
  predictions: any[]
): DashboardResource {
  const panels = predictionsToPanels(predictions);
  return {
    kind: 'Dashboard',
    metadata: {
      version: 1,
      created_at: '',
      name: 'Predictions Dashboard',
      project: '',
      updated_at: '',
    },
    spec: {
      // datasource: {
      //   global: true,
      //   kind: '',
      //   name: '',
      // },
      duration: '6h',
      layouts: [
        {
          spec: {
            items: generateSimplePanelLayout(panels, {
              panelsPerRow: 2,
              rowHeight: 5,
            }),
          },
          kind: 'Grid',
        },
      ],

      panels: panels,
      variables: [],
    },
  };
}
