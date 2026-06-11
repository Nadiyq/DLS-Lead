import React from 'react';
import {
  TooltipItem,
  type TooltipItemProps,
} from '../tooltip-item/TooltipItem';
import './tooltip-group.css';

export interface TooltipGroupItem extends Omit<TooltipItemProps, 'className' | 'layout'> {
  /** Stable item id. Falls back to the label when omitted. */
  id?: string;
}

export const TOOLTIP_GROUP_POINTER_PLACEMENTS = ['top', 'bottom'] as const;

export type TooltipGroupPointerPlacement = (typeof TOOLTIP_GROUP_POINTER_PLACEMENTS)[number];

export const TOOLTIP_GROUP_DEFAULT_ITEMS: TooltipGroupItem[] = [
  { id: 'item-1', label: 'Item 1', value: '50%', unit: 'kcal', color: 'green' },
  { id: 'item-2', label: 'Item 1', value: '50%', unit: 'kcal', color: 'green' },
  { id: 'item-3', label: 'Item 1', value: '50%', unit: 'kcal', color: 'green' },
];

export interface TooltipGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Optional date/header text shown above the tooltip values. */
  date?: string | null;
  /** Tooltip value rows rendered in order. */
  items?: TooltipGroupItem[];
  /** Optional total row shown below a divider. */
  total?: TooltipGroupItem | null;
  /** Whether to show the decorative pointer. */
  showPointer?: boolean;
  /** Placement of the decorative pointer relative to the tooltip body. */
  pointerPlacement?: TooltipGroupPointerPlacement;
  /** Additional class name for the root tooltip group. */
  className?: string;
}

export const TooltipGroup = React.forwardRef<HTMLDivElement, TooltipGroupProps>(
  (
    {
      date = '1 Jan, 2026',
      items = TOOLTIP_GROUP_DEFAULT_ITEMS,
      total = { id: 'total', label: 'Total', value: '50%', unit: 'kcal', showSwatch: false },
      showPointer = true,
      pointerPlacement = 'top',
      className,
      role = 'tooltip',
      'aria-label': ariaLabel = 'Chart tooltip',
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['dls-tooltip-group', className].filter(Boolean).join(' ')}
      data-pointer={showPointer ? 'true' : 'false'}
      data-pointer-placement={pointerPlacement}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {showPointer && (
        <span className="dls-tooltip-group__pointer" aria-hidden="true">
          <span className="dls-tooltip-group__arrow" />
        </span>
      )}
      <div className="dls-tooltip-group__body">
        {date && <div className="dls-tooltip-group__date">{date}</div>}
        <ul className="dls-tooltip-group__content" role="list" aria-label="Tooltip values">
          {items.map((item) => (
            <li className="dls-tooltip-group__row" role="listitem" key={item.id ?? item.label}>
              <TooltipItem {...item} layout="split" />
            </li>
          ))}
        </ul>
        {total && (
          <div className="dls-tooltip-group__total">
            <TooltipItem {...total} showSwatch={total.showSwatch ?? false} layout="split" />
          </div>
        )}
      </div>
    </div>
  ),
);

TooltipGroup.displayName = 'TooltipGroup';
