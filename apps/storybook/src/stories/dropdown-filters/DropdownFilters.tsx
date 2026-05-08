import React from 'react';
import './dropdown-filters.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { FilterChip } from '../filter-chip/FilterChip';

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
  /**
   * Custom filter chip content. When provided, `options` is ignored.
   * Pass FilterChip instances directly for stateful / interactive use.
   */
  children?: React.ReactNode;
  /** Convenience: simple filter options rendered as FilterChip (size=S) */
  options?: FilterOption[];
  /** Called when a simple option chip's chevron is clicked */
  onSelect?: (id: string) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component

   Figma spec (node 6122-16482):
   dropdown-filters (container with border/shadow)
     list
       list-item type=label  "Filters"
       list-item type=chips
         FilterChip (size=S) × N
   --------------------------------------------------------------------------- */

export const DropdownFilters = React.forwardRef<HTMLDivElement, DropdownFiltersProps>(
  (
    {
      children,
      options,
      onSelect: _onSelect,
      className,
    },
    ref,
  ) => {
    const chips = children ?? options?.map((opt) => (
      <FilterChip
        key={opt.id}
        label={opt.label}
        isVisible
        size="s"
        valueSummary={<span className="dls-filter-chip__value-text">All</span>}
      />
    ));

    const hasChips = React.Children.count(chips) > 0;

    return (
      <div
        ref={ref}
        className={['dls-dropdown-filters', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-label="Filters"
      >
        <List>
          <ListItem type="label" text="Filters" />
          {hasChips ? (
            <ListItem type="chips">{chips}</ListItem>
          ) : (
            <ListItem type="empty-state" text="No filters selected" />
          )}
        </List>
      </div>
    );
  },
);

DropdownFilters.displayName = 'DropdownFilters';
