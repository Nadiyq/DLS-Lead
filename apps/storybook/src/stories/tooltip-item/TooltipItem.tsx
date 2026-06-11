import React from 'react';
import {
  LegendItem,
  type LegendItemColor,
  type LegendItemTone,
} from '../legend-item/LegendItem';
import './tooltip-item.css';

export type TooltipItemLayout = 'inline' | 'split';

export interface TooltipItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
  /** Category label text. */
  label?: string;
  /** Optional metric/value shown after the label. */
  value?: string | null;
  /** Optional unit shown after the value. */
  unit?: string | null;
  /** DLS chart swatch hue. Additional palette hues plus semantic danger. */
  color?: LegendItemColor;
  /** DLS additional palette tone used for the chart swatch. */
  tone?: LegendItemTone;
  /** Whether to show the chart swatch before the label. */
  showSwatch?: boolean;
  /** Inline content or split row layout. */
  layout?: TooltipItemLayout;
  /** Additional class name for the root tooltip item. */
  className?: string;
}

const hasContent = (value: string | null | undefined) => value !== null && value !== undefined && value !== '';

export const TooltipItem = React.forwardRef<HTMLDivElement, TooltipItemProps>(
  (
    {
      label = 'Item 1',
      value = '50%',
      unit = 'kcal',
      color = 'green',
      tone = '500',
      showSwatch = true,
      layout = 'inline',
      className,
      ...props
    },
    ref,
  ) => {
    const hasValue = hasContent(value);
    const hasUnit = hasContent(unit);

    return (
      <div
        ref={ref}
        className={['dls-tooltip-item', className].filter(Boolean).join(' ')}
        data-layout={layout}
        data-swatch={showSwatch ? 'true' : 'false'}
        {...props}
      >
        {showSwatch ? (
          <LegendItem
            className="dls-tooltip-item__legend"
            label={label}
            color={color}
            tone={tone}
          />
        ) : (
          <span className="dls-tooltip-item__label">{label}</span>
        )}
        {(hasValue || hasUnit) && (
          <span className="dls-tooltip-item__metric">
            {hasValue && <span className="dls-tooltip-item__value">{value}</span>}
            {hasUnit && <span className="dls-tooltip-item__unit">{unit}</span>}
          </span>
        )}
      </div>
    );
  },
);

TooltipItem.displayName = 'TooltipItem';
