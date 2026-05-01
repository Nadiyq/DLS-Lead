import React from 'react';
import { Pagination } from '../pagination/Pagination';
import './table.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface TableProps {
  /** Top bar content (TableTopBar or custom toolbar) */
  topBar?: React.ReactNode;
  /** Column children — TableColumn components (no wrapper divs needed) */
  children: React.ReactNode;
  /** Grid column sizes (CSS grid-template-columns value, e.g. "40px 2fr 1fr 100px") */
  columns?: string;
  /** Number of data rows per column (used to set grid-template-rows) */
  rowCount?: number;
  /** Whether to show pagination */
  showPagination?: boolean;
  /** Total number of items */
  totalItems?: number;
  /** Items per page */
  itemsPerPage?: number;
  /** Items-per-page options */
  itemsPerPageOptions?: number[];
  /** Current page (1-based) */
  currentPage?: number;
  /** Total pages */
  totalPages?: number;
  /** Called when page changes */
  onPageChange?: (page: number) => void;
  /** Called when items-per-page changes */
  onItemsPerPageChange?: (count: number) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Arrow icons
   --------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------
   Component — uses DLS Pagination component for the bottom bar
   --------------------------------------------------------------------------- */

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      topBar,
      children,
      columns,
      rowCount,
      showPagination = true,
      totalItems = 500,
      itemsPerPage = 10,
      itemsPerPageOptions = [10, 25, 50, 100],
      currentPage = 1,
      totalPages = 10,
      onPageChange,
      onItemsPerPageChange,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-table', className].filter(Boolean).join(' ')}
      >
        {/* Top bar */}
        {topBar}

        {/* Columns area */}
        <div
          className="dls-table__columns"
          style={columns ? {
            gridTemplateColumns: columns,
            ...(rowCount ? { gridTemplateRows: `repeat(${rowCount + 1}, auto)` } : {}),
          } as React.CSSProperties : undefined}
        >
          {children}
        </div>

        {/* Pagination — uses the DLS Pagination component */}
        {showPagination && (
          <Pagination
            variant="borderless"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={itemsPerPage}
            pageSizeOptions={itemsPerPageOptions}
            onPageChange={onPageChange}
            onPageSizeChange={onItemsPerPageChange}
            className="dls-table__pagination"
          />
        )}
      </div>
    );
  },
);

Table.displayName = 'Table';
