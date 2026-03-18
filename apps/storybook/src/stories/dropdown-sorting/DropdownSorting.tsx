import React, { useState } from 'react';
import './dropdown-sorting.css';
import { Dropdown } from '../dropdown/Dropdown';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SortDirection = 'ascending' | 'descending';

export interface SortColumn {
  value: string;
  label: string;
}

export interface DropdownSortingProps {
  /** Available columns to sort by */
  columns: SortColumn[];
  /** Currently selected column value */
  column?: string;
  /** Current sort direction */
  direction?: SortDirection;
  /** Called when column changes */
  onColumnChange?: (value: string) => void;
  /** Called when direction changes */
  onDirectionChange?: (value: SortDirection) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Direction options
   --------------------------------------------------------------------------- */

const directionOptions = [
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
];

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownSorting = React.forwardRef<HTMLDivElement, DropdownSortingProps>(
  (
    {
      columns,
      column: columnProp,
      direction: directionProp = 'ascending',
      onColumnChange,
      onDirectionChange,
      className,
    },
    ref,
  ) => {
    const [column, setColumn] = useState(columnProp || (columns[0]?.value ?? ''));
    const [direction, setDirection] = useState<SortDirection>(directionProp);

    const handleColumn = (value: string | undefined) => {
      if (!value) return;
      setColumn(value);
      onColumnChange?.(value);
    };

    const handleDirection = (value: string | undefined) => {
      if (!value) return;
      const dir = value as SortDirection;
      setDirection(dir);
      onDirectionChange?.(dir);
    };

    return (
      <div
        ref={ref}
        className={['dls-dropdown-sorting', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-label="Sort settings"
      >
        <Dropdown
          label="Column"
          options={columns}
          value={column}
          onChange={handleColumn}
          placeholder="Select"
        />
        <Dropdown
          label="Sort"
          options={directionOptions}
          value={direction}
          onChange={handleDirection}
          placeholder="Select"
        />
      </div>
    );
  },
);

DropdownSorting.displayName = 'DropdownSorting';
