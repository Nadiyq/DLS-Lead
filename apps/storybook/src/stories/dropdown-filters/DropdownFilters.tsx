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
  /** Available filter options, rendered as chevron-chips */
  options: FilterOption[];
  /** Called when a filter chip is clicked (to open its value picker) */
  onSelect?: (id: string) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component

   Figma spec (node 6122-16482): a single label row "Filters" followed by a
   chip row. Each chip is a ChipRegular in outline/neutral/size-s variant
   with a trailing chevron — clicking a chip opens that filter's value
   picker. This matches table toolbars in the reference design.
   --------------------------------------------------------------------------- */

export const DropdownFilters = React.forwardRef<HTMLDivElement, DropdownFiltersProps>(
  (
    {
      options,
      onSelect,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-dropdown-filters', className].filter(Boolean).join(' ')}
        role="listbox"
      >
        <ListItem type="label" text="Filters" />
        <ListItem type="chips">
          {options.map((opt) => (
            <ChipRegular
              key={opt.id}
              label={opt.label}
              size="s"
              variant="outline"
              intent="neutral"
              chevron
              onClick={() => onSelect?.(opt.id)}
            />
          ))}
        </ListItem>
      </div>
    );
  },
);

DropdownFilters.displayName = 'DropdownFilters';
