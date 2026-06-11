import React from 'react';
import { Grid } from '../grid/Grid';
import { TooltipGroup, type TooltipGroupItem } from '../tooltip-group/TooltipGroup';
import './trend-chart.css';

export const TREND_CHART_TYPES = ['single', 'multiple'] as const;

export type TrendChartType = (typeof TREND_CHART_TYPES)[number];
type TrendChartSeries = 'danger' | 'green' | 'yellow' | 'blue' | 'pink' | 'violet';

interface TrendChartLegendItem {
  id: TrendChartSeries;
  label: string;
}

interface TrendChartPoint {
  id: string;
  series: 'danger' | 'green';
  label: string;
  value: string;
  color: TooltipGroupItem['color'];
  x: string;
  y: string;
}

export interface TrendChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Show highlighted data point markers. */
  dot?: boolean;
  /** Show the chart grid background and axes. */
  grid?: boolean;
  /** Show the chart legend. */
  legend?: boolean;
  /** Render curved trend lines instead of straight segments. */
  smooth?: boolean;
  /** Single-series or two-series chart from the Figma component. */
  type?: TrendChartType;
  /** Additional class name for the root trend chart. */
  className?: string;
}

type TrendChartStyle = React.CSSProperties & Record<`--${string}`, string>;

const straightPaths = {
  singleDanger:
    'M0.189226 197.347L96.0669 158.146L244.483 224.765L394.585 121.042L544.687 85.625L692.26 32.4989L762.251 0.454619',
  multipleDanger:
    'M0.187358 196.897L96.065 158.146L244.481 224.765L394.583 121.042L544.685 85.625L692.258 32.4989L762.25 0.454619',
  green:
    'M0.176218 0.530281L98.6998 37.6342L247.116 44.2527L397.218 0.530281L547.32 65.1129L694.893 71.9868L764.884 79.9425',
};

const smoothPaths = {
  singleDanger:
    'M0.217163 197.343C0.217163 197.343 68.0665 164.485 98.505 158.142C160.7 145.183 183.501 228.513 246.921 224.761C318.049 220.552 331.462 148.941 397.023 121.038C452.441 97.4528 489.38 102.737 547.126 85.621C605.851 68.2143 638.324 56.4471 694.698 32.495C722.366 20.7394 764.69 0.450651 764.69 0.450651',
  multipleDanger:
    'M0.274472 207.477C0.274472 207.477 65.4776 164.485 95.916 158.142C158.111 145.183 180.912 228.513 244.332 224.761C315.46 220.552 328.873 148.941 394.434 121.038C449.852 97.4528 486.792 102.737 544.537 85.621C603.263 68.2143 635.735 56.4471 692.109 32.495C719.777 20.7394 762.101 0.450651 762.101 0.450651',
  green:
    'M0.200215 0.689209C0.200215 0.689209 70.5161 31.5596 98.488 37.7931C155.116 50.4128 189.271 51.0815 246.904 44.4116C307.554 37.3926 336.039 -2.57557 397.006 0.689209C460.729 4.10154 484.795 51.5157 547.109 65.2718C603.445 77.7084 637.23 66.8644 694.681 72.1457C722.075 74.664 764.673 80.1014 764.673 80.1014',
};

const baseLegendItems: TrendChartLegendItem[] = [
  { id: 'danger', label: 'Item 1' },
  { id: 'green', label: 'Item 2' },
  { id: 'blue', label: 'Item 3' },
  { id: 'pink', label: 'Item 4' },
  { id: 'violet', label: 'Item 5' },
];

const singleStraightLegendItems: TrendChartLegendItem[] = [
  { id: 'danger', label: 'Item 1' },
  { id: 'yellow', label: 'Item 2' },
  { id: 'blue', label: 'Item 3' },
  { id: 'pink', label: 'Item 4' },
  { id: 'violet', label: 'Item 5' },
];

const getLegendItems = (type: TrendChartType, smooth: boolean) => (
  type === 'single' && !smooth ? singleStraightLegendItems : baseLegendItems
);

const getDefaultAriaLabel = (type: TrendChartType, smooth: boolean) => {
  const series = type === 'multiple' ? 'multiple series' : 'single series';
  const line = smooth ? 'smooth' : 'straight';

  return `${series} ${line} trend chart`;
};

const getDangerPath = (type: TrendChartType, smooth: boolean) => {
  if (smooth) {
    return type === 'multiple' ? smoothPaths.multipleDanger : smoothPaths.singleDanger;
  }

  return type === 'multiple' ? straightPaths.multipleDanger : straightPaths.singleDanger;
};

const getTrendPoints = (isMultiple: boolean): TrendChartPoint[] => [
  {
    id: 'danger-value',
    series: 'danger',
    label: 'Item 1',
    value: '120',
    color: 'danger',
    x: '71.5%',
    y: '38.1%',
  },
  ...(isMultiple
    ? [
        {
          id: 'green-value',
          series: 'green' as const,
          label: 'Item 2',
          value: '120',
          color: 'green' as const,
          x: '71.5%',
          y: '64.6%',
        },
      ]
    : []),
];

export const TrendChart = React.forwardRef<HTMLDivElement, TrendChartProps>(
  (
    {
      dot = true,
      grid = true,
      legend = true,
      smooth = false,
      type = 'single',
      className,
      role = 'group',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isMultiple = type === 'multiple';
    const legendItems = getLegendItems(type, smooth);
    const greenPath = smooth ? smoothPaths.green : straightPaths.green;
    const tooltipId = React.useId();
    const [activePointId, setActivePointId] = React.useState<string | null>(null);
    const points = React.useMemo(() => getTrendPoints(isMultiple), [isMultiple]);
    const activePoint = points.find((point) => point.id === activePointId);

    return (
      <div
        ref={ref}
        className={['dls-trend-chart', className].filter(Boolean).join(' ')}
        data-type={type}
        data-smooth={smooth ? 'true' : 'false'}
        role={role}
        aria-label={ariaLabel ?? getDefaultAriaLabel(type, smooth)}
        {...props}
      >
        <div
          className="dls-trend-chart__chart"
          role="group"
          aria-label={`${getDefaultAriaLabel(type, smooth)} plot`}
        >
          {grid && <Grid className="dls-trend-chart__grid" />}
          <svg
            className="dls-trend-chart__lines"
            viewBox="0 0 765 225"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="dls-trend-chart__line"
              data-series="danger"
              d={getDangerPath(type, smooth)}
              vectorEffect="non-scaling-stroke"
            />
            {isMultiple && (
              <path
                className="dls-trend-chart__line"
                data-series="green"
                d={greenPath}
                transform="translate(0 80)"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
          {dot && (
            <div className="dls-trend-chart__points">
              {points.map((point) => {
                const isActive = activePointId === point.id;
                const pointStyle: TrendChartStyle = {
                  '--_trend-point-x': point.x,
                  '--_trend-point-y': point.y,
                };

                return (
                  <span
                    className="dls-trend-chart__dot"
                    data-series={point.series}
                    data-active={isActive ? 'true' : 'false'}
                    style={pointStyle}
                    role="button"
                    tabIndex={0}
                    aria-label={`${point.label}: ${point.value}`}
                    aria-describedby={isActive ? tooltipId : undefined}
                    key={point.id}
                    onMouseEnter={() => setActivePointId(point.id)}
                    onMouseLeave={() => setActivePointId(null)}
                    onFocus={() => setActivePointId(point.id)}
                    onBlur={() => setActivePointId(null)}
                    onClick={() => setActivePointId(point.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActivePointId(point.id);
                      }
                    }}
                  >
                    <span className="dls-trend-chart__dot-label" aria-hidden="true">
                      {point.value}
                    </span>
                    <span className="dls-trend-chart__dot-marker" aria-hidden="true" />
                  </span>
                );
              })}
              {activePoint && (
                <TooltipGroup
                  id={tooltipId}
                  className="dls-trend-chart__tooltip"
                  data-series={activePoint.series}
                  pointerPlacement="bottom"
                  style={{
                    '--_trend-point-x': activePoint.x,
                    '--_trend-point-y': activePoint.y,
                  } as TrendChartStyle}
                  date="21 Jan, 2026"
                  items={[
                    {
                      id: activePoint.id,
                      label: activePoint.label,
                      value: activePoint.value,
                      unit: null,
                      color: activePoint.color,
                    },
                  ]}
                  total={null}
                />
              )}
            </div>
          )}
        </div>
        {legend && (
          <ul className="dls-trend-chart__legend" role="list" aria-label="Trend chart legend">
            {legendItems.map((item) => (
              <li className="dls-trend-chart__legend-item" data-series={item.id} key={item.id}>
                <span className="dls-trend-chart__legend-swatch" aria-hidden="true" />
                <span className="dls-trend-chart__legend-label">{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

TrendChart.displayName = 'TrendChart';
