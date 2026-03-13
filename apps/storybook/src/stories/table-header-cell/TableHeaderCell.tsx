import React from 'react';
import './table-header-cell.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TableHeaderCellType = 'text' | 'control' | 'empty';
export type TableHeaderCellAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableHeaderCellProps {
  /** Cell type */
  type?: TableHeaderCellType;
  /** Text alignment */
  align?: TableHeaderCellAlign;
  /** Whether to include horizontal padding */
  padding?: boolean;
  /** Column label (text type) */
  text?: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Current sort direction */
  sortDirection?: SortDirection;
  /** Called when sort is toggled */
  onSort?: () => void;
  /** Slot content (control type — checkbox, etc.) */
  children?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Sort icon — up arrow (rotated for desc)
   --------------------------------------------------------------------------- */

const SortIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const TableHeaderCell = React.forwardRef<HTMLDivElement, TableHeaderCellProps>(
  (
    {
      type = 'text',
      align = 'left',
      padding = true,
      text,
      sortable = false,
      sortDirection = 'none',
      onSort,
      children,
      className,
    },
    ref,
  ) => {
    const handleClick = () => {
      if (sortable && onSort) onSort();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (sortable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onSort?.();
      }
    };

    const isActive = sortDirection !== 'none';

    const sortIcon = sortable ? (
      <span
        className="dls-table-header-cell__sort"
        data-active={isActive ? '' : undefined}
        data-direction={sortDirection !== 'none' ? sortDirection : undefined}
      >
        <SortIcon />
      </span>
    ) : null;

    return (
      <div
        ref={ref}
        className={['dls-table-header-cell', className].filter(Boolean).join(' ')}
        data-type={type !== 'text' ? type : undefined}
        data-align={align}
        data-padding={padding ? undefined : 'false'}
        data-sortable={sortable ? '' : undefined}
        role="columnheader"
        aria-sort={
          sortDirection === 'asc' ? 'ascending' :
          sortDirection === 'desc' ? 'descending' :
          sortable ? 'none' : undefined
        }
        tabIndex={sortable ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {type === 'text' && (
          <>
            {align === 'right' && sortIcon}
            {text && <span className="dls-table-header-cell__text">{text}</span>}
            {align !== 'right' && sortIcon}
          </>
        )}

        {type === 'control' && (
          <span className="dls-table-header-cell__slot">{children}</span>
        )}

        {/* empty type renders nothing — just the background bar */}
      </div>
    );
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';
