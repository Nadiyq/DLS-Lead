import React from 'react';
import { BarChartItem } from '../bar-chart-item/BarChartItem';
import { Grid } from '../grid/Grid';
import { LegendGroup, type LegendGroupItem } from '../legend-group/LegendGroup';
import { TooltipGroup, type TooltipGroupItem } from '../tooltip-group/TooltipGroup';
import './bar-chart.css';

export const BAR_CHART_TYPES = ['default', 'multiple', 'stacked', 'negative'] as const;

export type BarChartType = (typeof BAR_CHART_TYPES)[number];

interface ChartDatum {
  id: string;
  label: string;
  value: number;
}

interface MultipleHorizontalDatum {
  id: string;
  label: string;
  orange: number;
  teal: number;
}

interface NegativeDatum {
  id: string;
  label: string;
  positive: number;
  negative: number;
}

interface ActiveBar {
  id: string;
  label: string;
  x: string;
  y: string;
  items: TooltipGroupItem[];
}

export interface BarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Show the chart grid background and axis labels. */
  grid?: boolean;
  /** Horizontal bar chart layout. */
  horizontal?: boolean;
  /** Show the chart legend. */
  legend?: boolean;
  /** Bar chart variant from the Figma component set. */
  type?: BarChartType;
  /** Additional class name for the root bar chart. */
  className?: string;
}

type ChartStyle = React.CSSProperties & Record<`--${string}`, string>;

const POSITIVE_MAX = 70;
const NEGATIVE_MAX = 40;
const POSITIVE_HORIZONTAL_PLOT_START = 6.25;
const POSITIVE_HORIZONTAL_PLOT_SPAN = 87.5;
const NEGATIVE_PLOT_HALF_SPAN = 44.444;
const POSITIVE_VERTICAL_PLOT_TOP = 6.25;
const POSITIVE_VERTICAL_PLOT_SPAN = 87.5;

const barData: ChartDatum[] = [
  { id: 'item-1', label: 'Item 1', value: 17 },
  { id: 'item-2', label: 'Item 2', value: 32 },
  { id: 'item-3', label: 'Item 3', value: 47 },
  { id: 'item-4', label: 'Item 4', value: 56 },
  { id: 'item-5', label: 'Item 5', value: 60 },
  { id: 'item-6', label: 'Item 6', value: 70 },
];

const multipleHorizontalData: MultipleHorizontalDatum[] = [
  { id: 'item-1', label: 'Item 1', orange: 48, teal: 24 },
  { id: 'item-2', label: 'Item 2', orange: 43, teal: 18 },
  { id: 'item-3', label: 'Item 3', orange: 47, teal: 29 },
  { id: 'item-4', label: 'Item 4', orange: 32, teal: 15 },
  { id: 'item-5', label: 'Item 5', orange: 48, teal: 22 },
  { id: 'item-6', label: 'Item 6', orange: 62, teal: 35 },
];

const negativeData: NegativeDatum[] = [
  { id: 'item-1', label: 'Item 1', positive: 35, negative: 19 },
  { id: 'item-2', label: 'Item 2', positive: 25, negative: 34 },
  { id: 'item-3', label: 'Item 3', positive: 30, negative: 30 },
  { id: 'item-4', label: 'Item 4', positive: 22, negative: 18 },
  { id: 'item-5', label: 'Item 5', positive: 14, negative: 16 },
  { id: 'item-6', label: 'Item 6', positive: 18, negative: 40 },
];

const defaultLegendItems: LegendGroupItem[] = [
  { label: 'Item 1', color: 'teal' },
  { label: 'Item 2', color: 'green' },
  { label: 'Item 3', color: 'blue' },
  { label: 'Item 4', color: 'pink' },
  { label: 'Item 5', color: 'violet' },
];

const multipleLegendItems: LegendGroupItem[] = [
  { label: 'Item 1', color: 'teal' },
  { label: 'Item 2', color: 'orange' },
  { label: 'Item 3', color: 'blue' },
  { label: 'Item 4', color: 'pink' },
  { label: 'Item 5', color: 'violet' },
];

const negativeLegendItems = [
  { id: 'positive', label: 'Item 1' },
  { id: 'negative', label: 'Item 2' },
  { id: 'blue', label: 'Item 3' },
  { id: 'pink', label: 'Item 4' },
  { id: 'violet', label: 'Item 5' },
] as const;

const horizontalLabels = ['0', '10', '20', '30', '40', '50', '60', '70'];
const negativeHorizontalLabels = ['-40', '-30', '-20', '-10', '0', '10', '20', '30', '40'];
const negativeVerticalLabels = ['40', '30', '20', '10', '0', '-10', '-20', '-30', '-40'];

const hasLegendGroup = (type: BarChartType) => type !== 'negative';

const getLegendItems = (type: BarChartType) => (
  type === 'default' ? defaultLegendItems : multipleLegendItems
);

const getDefaultAriaLabel = (type: BarChartType, horizontal: boolean) => {
  const orientation = horizontal ? 'horizontal' : 'vertical';

  return `${orientation} ${type} bar chart`;
};

const percent = (value: number, max: number) => `${Number(((value / max) * 100).toFixed(3))}%`;

const percentOfHalf = (value: number) => `${Number(((value / NEGATIVE_MAX) * 50).toFixed(3))}%`;

const getIndexPosition = (index: number, total: number) => `${Number((((index + 0.5) / total) * 100).toFixed(3))}%`;

const getPositiveTooltipPosition = (value: number, index: number, horizontal: boolean): Pick<ActiveBar, 'x' | 'y'> => {
  if (horizontal) {
    const x = POSITIVE_HORIZONTAL_PLOT_START + (value / POSITIVE_MAX) * POSITIVE_HORIZONTAL_PLOT_SPAN;

    return { x: `${Number(x.toFixed(3))}%`, y: getIndexPosition(index, barData.length) };
  }

  const y = POSITIVE_VERTICAL_PLOT_TOP + ((POSITIVE_MAX - value) / POSITIVE_MAX) * POSITIVE_VERTICAL_PLOT_SPAN;

  return { x: getIndexPosition(index, barData.length), y: `${Number(y.toFixed(3))}%` };
};

const getNegativeTooltipPosition = (item: NegativeDatum, index: number, horizontal: boolean): Pick<ActiveBar, 'x' | 'y'> => {
  if (horizontal) {
    const dominantValue = item.positive >= item.negative ? item.positive : -item.negative;
    const x = 50 + (dominantValue / NEGATIVE_MAX) * NEGATIVE_PLOT_HALF_SPAN;

    return { x: `${Number(x.toFixed(3))}%`, y: getIndexPosition(index, negativeData.length) };
  }

  const dominantValue = item.positive >= item.negative ? -item.positive : item.negative;
  const y = 50 + (dominantValue / NEGATIVE_MAX) * NEGATIVE_PLOT_HALF_SPAN;

  return { x: getIndexPosition(index, negativeData.length), y: `${Number(y.toFixed(3))}%` };
};

const getStackedTooltipItems = (item: ChartDatum): TooltipGroupItem[] => [
  {
    id: `${item.id}-primary`,
    label: 'Primary',
    value: String(Math.round(item.value * 0.6)),
    unit: null,
    color: 'teal',
  },
  {
    id: `${item.id}-secondary`,
    label: 'Secondary',
    value: String(Math.round(item.value * 0.4)),
    unit: null,
    color: 'orange',
  },
];

const getSimpleTooltipItems = (item: ChartDatum, type: BarChartType): TooltipGroupItem[] => (
  type === 'stacked'
    ? getStackedTooltipItems(item)
    : [{ id: item.id, label: item.label, value: String(item.value), unit: null, color: 'teal' }]
);

const getMultipleTooltipItems = (item: MultipleHorizontalDatum): TooltipGroupItem[] => [
  { id: `${item.id}-orange`, label: 'Item 1', value: String(item.orange), unit: null, color: 'orange' },
  { id: `${item.id}-teal`, label: 'Item 2', value: String(item.teal), unit: null, color: 'teal' },
];

const getNegativeTooltipItems = (item: NegativeDatum): TooltipGroupItem[] => [
  { id: `${item.id}-positive`, label: 'Positive', value: String(item.positive), unit: null, color: 'teal' },
  { id: `${item.id}-negative`, label: 'Negative', value: `-${item.negative}`, unit: null, color: 'danger' },
];

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      grid = true,
      horizontal = true,
      legend = true,
      type = 'negative',
      className,
      role = 'group',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const chartLabel = getDefaultAriaLabel(type, horizontal);
    const tooltipId = React.useId();
    const [activeBar, setActiveBar] = React.useState<ActiveBar | null>(null);

    const getInteractionProps = (bar: ActiveBar) => {
      const isActive = activeBar?.id === bar.id;
      const valueSummary = bar.items
        .map((item) => `${item.label} ${item.value ?? ''}`.trim())
        .join(', ');

      return {
        role: 'button',
        tabIndex: 0,
        'data-active': isActive ? 'true' : undefined,
        'aria-label': `${bar.label}: ${valueSummary}`,
        'aria-describedby': isActive ? tooltipId : undefined,
        onMouseEnter: () => setActiveBar(bar),
        onMouseLeave: () => setActiveBar(null),
        onFocus: () => setActiveBar(bar),
        onBlur: () => setActiveBar(null),
        onClick: () => setActiveBar(bar),
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setActiveBar(bar);
          }
        },
      };
    };

    const renderGrid = () => {
      if (!grid) {
        return null;
      }

      if (type === 'negative') {
        return (
          <Grid
            className="dls-bar-chart__grid"
            labels={horizontal ? negativeHorizontalLabels : negativeVerticalLabels}
            secondaryLabels={[]}
            showSecondaryAxis={false}
            horizontal={horizontal}
          />
        );
      }

      return (
        <Grid
          className="dls-bar-chart__grid"
          labels={horizontal ? horizontalLabels : undefined}
          secondaryLabels={[]}
          showSecondaryAxis={false}
          horizontal={horizontal}
        />
      );
    };

    const renderSimpleRows = () => (
      <div className="dls-bar-chart__bars" data-layout={type === 'stacked' ? 'stacked' : 'simple'}>
        {barData.map((item, index) => {
          const tooltip = {
            id: item.id,
            label: item.label,
            items: getSimpleTooltipItems(item, type),
            ...getPositiveTooltipPosition(item.value, index, horizontal),
          };
          const isActive = activeBar?.id === tooltip.id;
          const style: ChartStyle = { '--_bar-size': percent(item.value, POSITIVE_MAX) };

          return (
            <div
              className="dls-bar-chart__bar"
              data-index={index}
              key={item.id}
              style={style}
              {...getInteractionProps(tooltip)}
            >
              <BarChartItem
                className="dls-bar-chart__item"
                type={type === 'stacked' ? 'stacked' : 'default'}
                horizontal={horizontal}
                active={isActive}
                value={false}
                role="presentation"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    );

    const renderMultipleRows = () => (
      <div
        className="dls-bar-chart__bars"
        data-layout={horizontal ? 'multiple-horizontal' : 'multiple-vertical'}
      >
        {multipleHorizontalData.map((item, index) => {
          const dominantValue = Math.max(item.orange, item.teal);
          const tooltip = {
            id: item.id,
            label: item.label,
            items: getMultipleTooltipItems(item),
            ...getPositiveTooltipPosition(dominantValue, index, horizontal),
          };
          const isActive = activeBar?.id === tooltip.id;
          const orangeStyle: ChartStyle = { '--_bar-length': percent(item.orange, POSITIVE_MAX) };
          const tealStyle: ChartStyle = { '--_bar-length': percent(item.teal, POSITIVE_MAX) };

          return (
            <div
              className="dls-bar-chart__bar"
              data-index={index}
              key={item.id}
              {...getInteractionProps(tooltip)}
            >
              <BarChartItem
                className="dls-bar-chart__item"
                data-series="orange"
                horizontal={horizontal}
                active={isActive}
                value={false}
                style={orangeStyle}
                role="presentation"
                aria-hidden="true"
              />
              <BarChartItem
                className="dls-bar-chart__item"
                data-series="teal"
                horizontal={horizontal}
                active={isActive}
                value={false}
                style={tealStyle}
                role="presentation"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    );

    const renderNegativeRows = () => (
      <div className="dls-bar-chart__bars" data-layout="negative">
        {negativeData.map((item, index) => {
          const tooltip = {
            id: item.id,
            label: item.label,
            items: getNegativeTooltipItems(item),
            ...getNegativeTooltipPosition(item, index, horizontal),
          };
          const style: ChartStyle = {
            '--_positive-size': percentOfHalf(item.positive),
            '--_negative-size': percentOfHalf(item.negative),
          };

          return (
            <div
              className="dls-bar-chart__bar"
              data-index={index}
              key={item.id}
              style={style}
              {...getInteractionProps(tooltip)}
            >
              <span className="dls-bar-chart__negative-positive" aria-hidden="true" />
              <span className="dls-bar-chart__negative-negative" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    );

    const renderBars = () => {
      if (type === 'negative') {
        return renderNegativeRows();
      }

      if (type === 'multiple') {
        return renderMultipleRows();
      }

      return renderSimpleRows();
    };

    const renderLegend = () => {
      if (!legend) {
        return null;
      }

      if (hasLegendGroup(type)) {
        return (
          <LegendGroup
            className="dls-bar-chart__legend-group"
            items={getLegendItems(type)}
            orientation="horizontal"
          />
        );
      }

      return (
        <ul className="dls-bar-chart__legend" role="list" aria-label="Chart legend">
          {negativeLegendItems.map((item) => (
            <li className="dls-bar-chart__legend-item" data-series={item.id} key={item.id}>
              <span className="dls-bar-chart__legend-swatch" aria-hidden="true" />
              <span className="dls-bar-chart__legend-label">{item.label}</span>
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div
        ref={ref}
        className={['dls-bar-chart', className].filter(Boolean).join(' ')}
        data-type={type}
        data-orientation={orientation}
        role={role}
        aria-label={ariaLabel ?? chartLabel}
        {...props}
      >
        <div className="dls-bar-chart__chart" role="group" aria-label={`${chartLabel} plot`}>
          {renderGrid()}
          {renderBars()}
          {activeBar && (
            <TooltipGroup
              id={tooltipId}
              className="dls-bar-chart__tooltip"
              pointerPlacement="bottom"
              date={null}
              items={activeBar.items}
              total={null}
              style={{
                '--_bar-tooltip-x': activeBar.x,
                '--_bar-tooltip-y': activeBar.y,
              } as ChartStyle}
            />
          )}
        </div>
        {renderLegend()}
      </div>
    );
  },
);

BarChart.displayName = 'BarChart';
