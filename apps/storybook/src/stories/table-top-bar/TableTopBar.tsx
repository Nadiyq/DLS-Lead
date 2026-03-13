import React from 'react';
import './table-top-bar.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface TableTopBarProps {
  /** Left slot content (search, icon buttons, etc.) */
  slotLeft?: React.ReactNode;
  /** Right slot content (action buttons, etc.) */
  slotRight?: React.ReactNode;
  /** Whether to show the filters row */
  showFilters?: boolean;
  /** Filters row content */
  filters?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const TableTopBar = React.forwardRef<HTMLDivElement, TableTopBarProps>(
  (
    {
      slotLeft,
      slotRight,
      showFilters = false,
      filters,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-table-top-bar', className].filter(Boolean).join(' ')}
        role="toolbar"
        aria-label="Table toolbar"
      >
        {/* Main row */}
        <div className="dls-table-top-bar__row">
          {slotLeft && (
            <div className="dls-table-top-bar__left">{slotLeft}</div>
          )}
          {slotRight && (
            <div className="dls-table-top-bar__right">{slotRight}</div>
          )}
        </div>

        {/* Filters row */}
        {showFilters && filters && (
          <div className="dls-table-top-bar__filters">{filters}</div>
        )}
      </div>
    );
  },
);

TableTopBar.displayName = 'TableTopBar';
