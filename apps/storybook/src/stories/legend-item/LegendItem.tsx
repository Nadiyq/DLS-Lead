import React from 'react';
import './legend-item.css';

export const LEGEND_ITEM_COLORS = [
  'purple',
  'violet',
  'pink',
  'blue',
  'teal',
  'yellow',
  'green',
  'gold',
  'cinnamon',
  'orange',
] as const;

export const LEGEND_ITEM_TONES = ['100', '300', '500', '700'] as const;

export type LegendItemColor = (typeof LEGEND_ITEM_COLORS)[number];
export type LegendItemTone = (typeof LEGEND_ITEM_TONES)[number];

export interface LegendItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
  /** Category label text. */
  label?: string;
  /** Optional metric/value shown after the label. */
  value?: string;
  /** DLS additional palette hue used for the chart swatch. */
  color?: LegendItemColor;
  /** DLS additional palette tone used for the chart swatch. */
  tone?: LegendItemTone;
  /** Additional class name for the root legend item. */
  className?: string;
}

export const LegendItem = React.forwardRef<HTMLDivElement, LegendItemProps>(
  (
    {
      label = 'Item 1',
      value,
      color = 'green',
      tone = '500',
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['dls-legend-item', className].filter(Boolean).join(' ')}
      data-color={color}
      data-tone={tone}
      {...props}
    >
      <span className="dls-legend-item__swatch" aria-hidden="true" />
      <span className="dls-legend-item__label">{label}</span>
      {value && <span className="dls-legend-item__value">{value}</span>}
    </div>
  ),
);

LegendItem.displayName = 'LegendItem';
