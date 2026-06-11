import React from 'react';
import { BarChartItem } from '../bar-chart-item/BarChartItem';
import './bar.css';

export const BAR_COUNTS = ['1', '2', '3'] as const;

export type BarCount = (typeof BAR_COUNTS)[number];
export type BarColor = 'pink' | 'orange' | 'teal';
type BarLength = 'short' | 'medium' | 'full';

interface BarDatum {
  id: string;
  color: BarColor;
  length: BarLength;
}

export interface BarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Show the axis label for the grouped bars. */
  axis?: boolean;
  /** Axis label text, usually a period such as a month. */
  axisText?: string;
  /** Number of bars rendered together. */
  bars?: BarCount;
  /** Horizontal grouped bar layout. */
  horizontal?: boolean;
  /** Show value labels for every bar. */
  value?: boolean;
  /** Value label text shown for each bar. */
  valueText?: string;
  /** Additional class name for the root grouped bar. */
  className?: string;
}

const dataByCount: Record<BarCount, BarDatum[]> = {
  '1': [{ id: 'teal', color: 'teal', length: 'full' }],
  '2': [
    { id: 'orange', color: 'orange', length: 'full' },
    { id: 'teal', color: 'teal', length: 'medium' },
  ],
  '3': [
    { id: 'pink', color: 'pink', length: 'short' },
    { id: 'orange', color: 'orange', length: 'full' },
    { id: 'teal', color: 'teal', length: 'medium' },
  ],
};

const hasText = (value: string) => value !== '';

const getDefaultAriaLabel = (
  bars: BarCount,
  axis: boolean,
  axisText: string,
  value: boolean,
  valueText: string,
) => {
  const axisPart = axis && hasText(axisText) ? ` for ${axisText}` : '';
  const valuePart = value && hasText(valueText) ? `, each ${valueText}` : '';

  return `${bars} bar${bars === '1' ? '' : 's'}${axisPart}${valuePart}`;
};

export const Bar = React.forwardRef<HTMLDivElement, BarProps>(
  (
    {
      axis = true,
      axisText = 'Jan',
      bars = '3',
      horizontal = true,
      value = true,
      valueText = '12',
      className,
      role = 'img',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const label = ariaLabel ?? getDefaultAriaLabel(bars, axis, axisText, value, valueText);

    return (
      <div
        ref={ref}
        className={['dls-bar', className].filter(Boolean).join(' ')}
        data-bars={bars}
        data-orientation={orientation}
        role={role}
        aria-label={label}
        {...props}
      >
        <span className="dls-bar__bars" aria-hidden="true">
          {dataByCount[bars].map((item) => (
            <BarChartItem
              key={item.id}
              className="dls-bar__item"
              type="default"
              horizontal={horizontal}
              value={value}
              valueText={valueText}
              role="presentation"
              aria-hidden="true"
              data-color={item.color}
              data-length={item.length}
            />
          ))}
        </span>
        {axis && hasText(axisText) && (
          <span className="dls-bar__axis" aria-hidden="true">
            {axisText}
          </span>
        )}
      </div>
    );
  },
);

Bar.displayName = 'Bar';
