import React from 'react';
import {
  LegendItem,
  type LegendItemColor,
  type LegendItemTone,
} from '../legend-item/LegendItem';
import './legend-group.css';

export type LegendGroupOrientation = 'vertical' | 'horizontal';

export interface LegendGroupItem {
  /** Stable item id. Falls back to the label when omitted. */
  id?: string;
  /** Category label text. */
  label: string;
  /** Optional metric/value shown after the label. */
  value?: string;
  /** DLS additional palette hue used for the chart swatch. */
  color?: LegendItemColor;
  /** DLS additional palette tone used for the chart swatch. */
  tone?: LegendItemTone;
}

export const LEGEND_GROUP_DEFAULT_ITEMS: LegendGroupItem[] = [
  { label: 'Item 1', color: 'green' },
  { label: 'Item 2', color: 'yellow' },
  { label: 'Item 3', color: 'blue' },
  { label: 'Item 4', color: 'pink' },
  { label: 'Item 5', color: 'violet' },
];

export interface LegendGroupProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Legend items rendered in order. */
  items?: LegendGroupItem[];
  /** Layout direction for the legend items. */
  orientation?: LegendGroupOrientation;
  /** Default swatch tone used when an item does not provide one. */
  tone?: LegendItemTone;
  /** Additional class name for the root legend group. */
  className?: string;
}

export const LegendGroup = React.forwardRef<HTMLUListElement, LegendGroupProps>(
  (
    {
      items = LEGEND_GROUP_DEFAULT_ITEMS,
      orientation = 'vertical',
      tone = '500',
      className,
      role = 'list',
      'aria-label': ariaLabel = 'Chart legend',
      ...props
    },
    ref,
  ) => (
    <ul
      ref={ref}
      className={['dls-legend-group', className].filter(Boolean).join(' ')}
      data-orientation={orientation}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {items.map((item) => (
        <li className="dls-legend-group__item" role="listitem" key={item.id ?? item.label}>
          <LegendItem
            label={item.label}
            value={item.value}
            color={item.color}
            tone={item.tone ?? tone}
          />
        </li>
      ))}
    </ul>
  ),
);

LegendGroup.displayName = 'LegendGroup';
