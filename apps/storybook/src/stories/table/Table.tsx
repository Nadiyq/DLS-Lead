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
  /** Layout mode for the columns area */
  layout?: 'columns' | 'rows';
  /** Number of data rows per column (used to set grid-template-rows) */
  rowCount?: number;
  /** Compact mobile row list rendered below the desktop/tablet table */
  mobileRows?: React.ReactNode;
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
      layout = 'columns',
      rowCount,
      mobileRows,
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
        data-layout={layout}
        data-has-mobile-rows={mobileRows ? '' : undefined}
      >
        {/* Top bar */}
        {topBar}

        {/* Columns area */}
        <div className="dls-table__scroll" role="region" aria-label="Table columns" tabIndex={0}>
          <div
            className="dls-table__columns"
            data-layout={layout}
            role={layout === 'rows' ? 'table' : undefined}
            aria-label={layout === 'rows' ? 'Data table' : undefined}
            style={columns ? {
              gridTemplateColumns: layout === 'columns' ? columns : undefined,
              '--dls-table-columns': columns,
              ...(layout === 'columns' && rowCount ? { gridTemplateRows: `repeat(${rowCount + 1}, auto)` } : {}),
            } as React.CSSProperties : undefined}
          >
            {children}
          </div>
        </div>

        {mobileRows && (
          <div className="dls-table__mobile-rows" role="list" aria-label="Table rows">
            {mobileRows}
          </div>
        )}

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
