import React from 'react';
import './dropdown-filters.css';
import { ListItem } from '../list-item/ListItem';
import { ChipRegular } from '../chip/ChipRegular';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface FilterOption {
  /** Unique key */
  id: string;
  /** Display label */
  label: string;
}

export interface DropdownFiltersProps {
  /** Available filter options */
  options: FilterOption[];
  /** Currently active filter ids */
  activeIds?: string[];
  /** Called when a filter is toggled */
  onToggle?: (id: string, active: boolean) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownFilters = React.forwardRef<HTMLDivElement, DropdownFiltersProps>(
  (
    {
      options,
      activeIds = [],
      onToggle,
      className,
    },
    ref,
  ) => {
    const activeSet = new Set(activeIds);

    return (
      <div
        ref={ref}
        className={['dls-dropdown-filters', className].filter(Boolean).join(' ')}
        role="listbox"
      >
        <ListItem type="label" text="Filters" />
        <ListItem type="chips">
          {options.map((opt) => {
            const isActive = activeSet.has(opt.id);
            return (
              <ChipRegular
                key={opt.id}
                label={opt.label}
                size="s"
                variant={isActive ? 'filled' : 'outline'}
                intent="neutral"
                onClick={() => onToggle?.(opt.id, !isActive)}
              />
            );
          })}
        </ListItem>
      </div>
    );
  },
);

DropdownFilters.displayName = 'DropdownFilters';
