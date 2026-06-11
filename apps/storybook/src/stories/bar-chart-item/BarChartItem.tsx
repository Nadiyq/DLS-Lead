import React from 'react';
import './bar-chart-item.css';

export const BAR_CHART_ITEM_TYPES = ['default', 'stacked', 'negative'] as const;

export type BarChartItemType = (typeof BAR_CHART_ITEM_TYPES)[number];
type BarChartItemSegment = 'default' | 'stack-primary' | 'stack-secondary' | 'positive' | 'negative';

export interface BarChartItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Bar shape from the Figma component. */
  type?: BarChartItemType;
  /** Rotate the item for horizontal bar chart layouts. */
  horizontal?: boolean;
  /** Show the active chart state with inverse border and overlay. */
  active?: boolean;
  /** Show numeric value labels. */
  value?: boolean;
  /** Positive or total value label text. */
  valueText?: string;
  /** Negative value label text for negative bars. */
  negativeValueText?: string;
  /** Additional class name for the root bar chart item. */
  className?: string;
}

const segmentsByType: Record<BarChartItemType, BarChartItemSegment[]> = {
  default: ['default'],
  stacked: ['stack-primary', 'stack-secondary'],
  negative: ['positive', 'negative'],
};

const hasText = (text: string) => text !== '';

const getDefaultAriaLabel = (
  type: BarChartItemType,
  showValue: boolean,
  valueText: string,
  negativeValueText: string,
) => {
  if (!showValue) {
    return `Bar chart ${type} item`;
  }

  if (type === 'negative') {
    const values = [
      hasText(valueText) ? `positive ${valueText}` : null,
      hasText(negativeValueText) ? `negative ${negativeValueText}` : null,
    ].filter(Boolean);

    return values.length > 0
      ? `Negative bar chart item: ${values.join(', ')}`
      : 'Negative bar chart item';
  }

  if (type === 'stacked') {
    return hasText(valueText) ? `Stacked bar chart item: ${valueText}` : 'Stacked bar chart item';
  }

  return hasText(valueText) ? `Bar chart item: ${valueText}` : 'Bar chart item';
};

export const BarChartItem = React.forwardRef<HTMLDivElement, BarChartItemProps>(
  (
    {
      type = 'default',
      horizontal = false,
      active = false,
      value = true,
      valueText = '12',
      negativeValueText = '12',
      className,
      role = 'img',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const showPositiveValue = value && hasText(valueText);
    const showNegativeValue = type === 'negative' && value && hasText(negativeValueText);
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const label = ariaLabel ?? getDefaultAriaLabel(type, value, valueText, negativeValueText);

    const renderValue = (position: 'positive' | 'negative', text: string) => (
      <span className="dls-bar-chart-item__value" data-position={position}>
        {text}
      </span>
    );

    return (
      <div
        ref={ref}
        className={['dls-bar-chart-item', className].filter(Boolean).join(' ')}
        data-type={type}
        data-orientation={orientation}
        {...(active ? { 'data-active': '' } : {})}
        role={role}
        aria-label={label}
        {...props}
      >
        {!horizontal && showPositiveValue && renderValue('positive', valueText)}
        <span className="dls-bar-chart-item__track" aria-hidden="true">
          {segmentsByType[type].map((segment) => (
            <span
              className="dls-bar-chart-item__segment"
              data-segment={segment}
              key={segment}
            />
          ))}
        </span>
        {!horizontal && showNegativeValue && renderValue('negative', negativeValueText)}
        {horizontal && showPositiveValue && renderValue('positive', valueText)}
        {horizontal && showNegativeValue && renderValue('negative', negativeValueText)}
      </div>
    );
  },
);

BarChartItem.displayName = 'BarChartItem';
