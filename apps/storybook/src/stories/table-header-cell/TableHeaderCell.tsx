import React from 'react';
import { ArrowUpDown as ArrowUpDownIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon } from 'lucide-react';
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

    const SortGlyph =
      sortDirection === 'asc' ? ArrowUpIcon :
      sortDirection === 'desc' ? ArrowDownIcon :
      ArrowUpDownIcon;

    const sortIcon = sortable ? (
      <span
        className="dls-table-header-cell__sort"
        data-active={isActive ? '' : undefined}
      >
        <SortGlyph />
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
