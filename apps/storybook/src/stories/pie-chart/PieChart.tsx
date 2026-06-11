import React from 'react';
import { LegendGroup, type LegendGroupItem } from '../legend-group/LegendGroup';
import { PIE_SEGMENT_PATHS, type PieSegmentId } from '../pie/Pie';
import {
  PieChartLabels,
  PIE_CHART_LABELS_DEFAULT_ITEMS,
  type PieChartLabelItem,
} from '../pie-chart-labels/PieChartLabels';
import { TooltipGroup, type TooltipGroupItem } from '../tooltip-group/TooltipGroup';
import './pie-chart.css';

export interface PieChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Show white borders between pie segments. */
  stroke?: boolean;
  /** Show the value callout label layer over the pie. */
  labels?: boolean;
  /** Show category labels inside the pie label layer. */
  labelCategories?: boolean;
  /** Show colored leader strokes for value callouts. */
  labelStroke?: boolean;
  /** Label items rendered in their fixed Figma positions. */
  labelItems?: PieChartLabelItem[];
  /** Show the chart legend. */
  legend?: boolean;
  /** Place the legend under the chart instead of beside it. */
  legendBottom?: boolean;
  /** Legend items rendered in order. */
  legendItems?: LegendGroupItem[];
  /** Additional class name for the root pie chart composition. */
  className?: string;
}

export const PIE_CHART_LEGEND_ITEMS: LegendGroupItem[] = [
  { label: 'Item 1', color: 'green' },
  { label: 'Item 2', color: 'yellow' },
  { label: 'Item 3', color: 'blue' },
  { label: 'Item 4', color: 'pink' },
  { label: 'Item 5', color: 'violet' },
];

const getVisibleLabelItems = (items: PieChartLabelItem[]) => (
  items.filter((item) => item.visible !== false).slice(0, 5)
);

const getValueSummary = (items: PieChartLabelItem[]) => (
  getVisibleLabelItems(items)
    .map((item) => (item.value ? `${item.label} ${item.value}` : item.label))
    .join(', ')
);

const getDefaultAriaLabel = (legend: boolean, legendBottom: boolean) => {
  if (!legend) {
    return 'Pie chart';
  }

  return legendBottom ? 'Pie chart with bottom legend' : 'Pie chart with side legend';
};

const getTooltipColor = (segment: PieSegmentId): TooltipGroupItem['color'] => segment;

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      stroke = true,
      labels = true,
      labelCategories = false,
      labelStroke = true,
      labelItems = PIE_CHART_LABELS_DEFAULT_ITEMS,
      legend = true,
      legendBottom = false,
      legendItems = PIE_CHART_LEGEND_ITEMS,
      className,
      role = 'group',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const chartLabel = `Pie chart plot: ${getValueSummary(labelItems)}`;
    const tooltipId = React.useId();
    const [activeSegmentId, setActiveSegmentId] = React.useState<PieSegmentId | null>(null);
    const activeSegment = PIE_SEGMENT_PATHS.find((segment) => segment.id === activeSegmentId);

    return (
      <div
        ref={ref}
        className={['dls-pie-chart', className].filter(Boolean).join(' ')}
        data-legend-bottom={legendBottom ? 'true' : 'false'}
        data-labels={labels ? 'true' : 'false'}
        role={role}
        aria-label={ariaLabel ?? getDefaultAriaLabel(legend, legendBottom)}
        {...props}
      >
        <div className="dls-pie-chart__plot" role="group" aria-label={chartLabel}>
          <div className="dls-pie-chart__pie dls-pie" data-stroke={stroke ? 'true' : 'false'}>
            <svg className="dls-pie__svg" viewBox="0 0 220 220" focusable="false">
              {PIE_SEGMENT_PATHS.map((segment) => {
                const isActive = activeSegmentId === segment.id;

                return (
                  <path
                    className="dls-pie__segment dls-pie-chart__segment"
                    data-segment={segment.id}
                    data-active={isActive ? 'true' : 'false'}
                    d={segment.path}
                    role="button"
                    tabIndex={0}
                    aria-label={`${segment.label}: ${segment.value}`}
                    aria-describedby={isActive ? tooltipId : undefined}
                    key={segment.id}
                    vectorEffect="non-scaling-stroke"
                    onMouseEnter={() => setActiveSegmentId(segment.id)}
                    onMouseLeave={() => setActiveSegmentId(null)}
                    onFocus={() => setActiveSegmentId(segment.id)}
                    onBlur={() => setActiveSegmentId(null)}
                    onClick={() => setActiveSegmentId(segment.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveSegmentId(segment.id);
                      }
                    }}
                  />
                );
              })}
            </svg>
          </div>
          {labels && (
            <PieChartLabels
              className="dls-pie-chart__labels"
              items={labelItems}
              categories={labelCategories}
              stroke={labelStroke}
              role="presentation"
              aria-hidden="true"
            />
          )}
          {activeSegment && (
            <TooltipGroup
              id={tooltipId}
              className="dls-pie-chart__tooltip"
              data-segment={activeSegment.id}
              pointerPlacement="bottom"
              date={null}
              items={[
                {
                  id: activeSegment.id,
                  label: activeSegment.label,
                  value: activeSegment.value,
                  unit: null,
                  color: getTooltipColor(activeSegment.id),
                },
              ]}
              total={null}
            />
          )}
        </div>
        {legend && (
          <LegendGroup
            className="dls-pie-chart__legend"
            items={legendItems}
            orientation={legendBottom ? 'horizontal' : 'vertical'}
          />
        )}
      </div>
    );
  },
);

PieChart.displayName = 'PieChart';
