import React from 'react';
import { LegendGroup, type LegendGroupItem } from '../legend-group/LegendGroup';
import { TooltipGroup, type TooltipGroupItem } from '../tooltip-group/TooltipGroup';
import './donut-chart.css';

export const DONUT_CHART_SEGMENT_IDS = ['pink', 'teal', 'cinnamon', 'blue', 'yellow'] as const;

export type DonutChartSegmentId = (typeof DONUT_CHART_SEGMENT_IDS)[number];

interface DonutChartSegment {
  id: DonutChartSegmentId;
  label: string;
  value: string;
  startAngle: number;
  endAngle: number;
}

export interface DonutChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Keep the Figma hover variant metadata; segments move on real hover/focus. */
  hover?: boolean;
  /** Show the chart legend. */
  legend?: boolean;
  /** Place the legend under the chart instead of beside it. */
  legendBottom?: boolean;
  /** Show the central total and unit text. */
  text?: boolean;
  /** Total metric displayed inside the donut. */
  totalText?: string;
  /** Unit label displayed below the total. */
  unitText?: string;
  /** Legend items rendered in order. */
  legendItems?: LegendGroupItem[];
  /** Additional class name for the root donut chart composition. */
  className?: string;
}

export const DONUT_CHART_LEGEND_ITEMS: LegendGroupItem[] = [
  { label: 'Item 1', color: 'green' },
  { label: 'Item 2', color: 'yellow' },
  { label: 'Item 3', color: 'blue' },
  { label: 'Item 4', color: 'pink' },
  { label: 'Item 5', color: 'violet' },
];

const CENTER = 110;
const OUTER_RADIUS = 110;
const INNER_RADIUS = 70;

const donutSegments: DonutChartSegment[] = [
  { id: 'cinnamon', label: 'Cinnamon', value: '90', startAngle: 0, endAngle: 108 },
  { id: 'blue', label: 'Blue', value: '20', startAngle: 108, endAngle: 145 },
  { id: 'yellow', label: 'Yellow', value: '65', startAngle: 145, endAngle: 215 },
  { id: 'pink', label: 'Pink', value: '65', startAngle: 215, endAngle: 289 },
  { id: 'teal', label: 'Teal', value: '60', startAngle: 289, endAngle: 360 },
];

const round = (value: number) => Number(value.toFixed(3));

const polarToCartesian = (radius: number, angle: number) => {
  const radians = (angle * Math.PI) / 180;

  return {
    x: round(CENTER + radius * Math.cos(radians)),
    y: round(CENTER + radius * Math.sin(radians)),
  };
};

const describeDonutSegment = (startAngle: number, endAngle: number) => {
  const outerStart = polarToCartesian(OUTER_RADIUS, startAngle);
  const outerEnd = polarToCartesian(OUTER_RADIUS, endAngle);
  const innerStart = polarToCartesian(INNER_RADIUS, startAngle);
  const innerEnd = polarToCartesian(INNER_RADIUS, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
};

const segmentPaths = donutSegments.map((segment) => ({
  ...segment,
  path: describeDonutSegment(segment.startAngle, segment.endAngle),
}));

const getSegmentSummary = () => (
  donutSegments
    .map((segment) => `${segment.label} ${segment.value}`)
    .join(', ')
);

const getDefaultAriaLabel = (legend: boolean, legendBottom: boolean) => {
  const legendPart = legend ? (legendBottom ? ' with bottom legend' : ' with side legend') : '';

  return `Donut chart${legendPart}`;
};

const getTooltipColor = (segment: DonutChartSegmentId): TooltipGroupItem['color'] => segment;

export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      hover = false,
      legend = true,
      legendBottom = false,
      text = true,
      totalText = '1000',
      unitText = 'Unit',
      legendItems = DONUT_CHART_LEGEND_ITEMS,
      className,
      role = 'group',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const chartLabel = `Donut chart plot: total ${totalText} ${unitText}, ${getSegmentSummary()}`;
    const tooltipId = React.useId();
    const [activeSegmentId, setActiveSegmentId] = React.useState<DonutChartSegmentId | null>(null);
    const activeSegment = segmentPaths.find((segment) => segment.id === activeSegmentId);

    return (
      <div
        ref={ref}
        className={['dls-donut-chart', className].filter(Boolean).join(' ')}
        data-hover={hover ? 'true' : 'false'}
        data-legend-bottom={legendBottom ? 'true' : 'false'}
        data-text={text ? 'true' : 'false'}
        role={role}
        aria-label={ariaLabel ?? getDefaultAriaLabel(legend, legendBottom)}
        {...props}
      >
        <div className="dls-donut-chart__plot" role="group" aria-label={chartLabel}>
          <svg
            className="dls-donut-chart__svg"
            viewBox="0 0 220 220"
            focusable="false"
          >
            {segmentPaths.map((segment) => {
              const isActive = activeSegmentId === segment.id;

              return (
                <path
                  className="dls-donut-chart__segment"
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
          {text && (
            <span className="dls-donut-chart__text" aria-hidden="true">
              <span className="dls-donut-chart__total">{totalText}</span>
              <span className="dls-donut-chart__unit">{unitText}</span>
            </span>
          )}
          {activeSegment && (
            <TooltipGroup
              id={tooltipId}
              className="dls-donut-chart__tooltip"
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
            className="dls-donut-chart__legend"
            items={legendItems}
            orientation={legendBottom ? 'horizontal' : 'vertical'}
          />
        )}
      </div>
    );
  },
);

DonutChart.displayName = 'DonutChart';
