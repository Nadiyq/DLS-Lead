import React from 'react';
import './pie-chart-labels.css';

export const PIE_CHART_LABEL_SLOTS = ['label-1', 'label-2', 'label-3', 'label-4', 'label-5'] as const;
export const PIE_CHART_LABEL_COLORS = ['pink', 'teal', 'cinnamon', 'blue', 'yellow'] as const;
export const PIE_CHART_LABEL_TONES = ['100', '300', '500', '700'] as const;

export type PieChartLabelSlot = (typeof PIE_CHART_LABEL_SLOTS)[number];
export type PieChartLabelColor = (typeof PIE_CHART_LABEL_COLORS)[number];
export type PieChartLabelTone = (typeof PIE_CHART_LABEL_TONES)[number];

export interface PieChartLabelItem {
  /** Stable item id. Falls back to the label when omitted. */
  id?: string;
  /** Category label shown near the corresponding pie segment. */
  label: string;
  /** Value callout shown outside the pie segment. */
  value?: string | null;
  /** Fixed label position from the Figma pie-labels component. */
  slot?: PieChartLabelSlot;
  /** DLS additional palette hue used for the leader stroke. */
  color?: PieChartLabelColor;
  /** DLS additional palette tone used for the leader stroke. */
  tone?: PieChartLabelTone;
  /** Hide an item without changing the remaining item order. */
  visible?: boolean;
}

export const PIE_CHART_LABELS_DEFAULT_ITEMS: PieChartLabelItem[] = [
  { label: 'Pink', value: '65', slot: 'label-1', color: 'pink' },
  { label: 'Teal', value: '60', slot: 'label-2', color: 'teal' },
  { label: 'Cinnamon', value: '90', slot: 'label-3', color: 'cinnamon' },
  { label: 'Blue', value: '20', slot: 'label-4', color: 'blue' },
  { label: 'Yellow', value: '65', slot: 'label-5', color: 'yellow' },
];

export interface PieChartLabelsProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Pie chart label items rendered in their fixed Figma positions. */
  items?: PieChartLabelItem[];
  /** Show category labels inside the pie chart area. */
  categories?: boolean;
  /** Show colored leader strokes for value callouts. */
  stroke?: boolean;
  /** Default stroke tone used when an item does not provide one. */
  tone?: PieChartLabelTone;
  /** Additional class name for the root label layer. */
  className?: string;
}

const hasText = (value: string | null | undefined) => value !== null && value !== undefined && value !== '';

const getSlot = (item: PieChartLabelItem, index: number): PieChartLabelSlot => (
  item.slot ?? PIE_CHART_LABEL_SLOTS[index % PIE_CHART_LABEL_SLOTS.length]
);

export const PieChartLabels = React.forwardRef<HTMLUListElement, PieChartLabelsProps>(
  (
    {
      items = PIE_CHART_LABELS_DEFAULT_ITEMS,
      categories = true,
      stroke = true,
      tone = '700',
      className,
      role = 'list',
      'aria-label': ariaLabel = 'Pie chart labels',
      ...props
    },
    ref,
  ) => {
    const visibleItems = items.filter((item) => item.visible !== false).slice(0, PIE_CHART_LABEL_SLOTS.length);

    return (
      <ul
        ref={ref}
        className={['dls-pie-chart-labels', className].filter(Boolean).join(' ')}
        role={role}
        aria-label={ariaLabel}
        {...props}
      >
        {visibleItems.map((item, index) => {
          const slot = getSlot(item, index);
          const itemTone = item.tone ?? tone;
          const itemColor = item.color ?? PIE_CHART_LABELS_DEFAULT_ITEMS[index]?.color ?? 'pink';
          const showValue = hasText(item.value);

          return (
            <li
              className="dls-pie-chart-labels__item"
              data-slot={slot}
              data-color={itemColor}
              data-tone={itemTone}
              key={item.id ?? `${slot}-${item.label}`}
              aria-label={showValue ? `${item.label}: ${item.value}` : item.label}
            >
              {showValue && <span className="dls-pie-chart-labels__value">{item.value}</span>}
              {stroke && showValue && <span className="dls-pie-chart-labels__leader" aria-hidden="true" />}
              {categories && <span className="dls-pie-chart-labels__category">{item.label}</span>}
            </li>
          );
        })}
      </ul>
    );
  },
);

PieChartLabels.displayName = 'PieChartLabels';
