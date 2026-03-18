import React from 'react';
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

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Pagination helper — build page list with ellipsis
   --------------------------------------------------------------------------- */

function buildPageList(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);
  return pages;
}

/* ---------------------------------------------------------------------------
   Component
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
    const pageList = buildPageList(currentPage, totalPages);

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

        {/* Pagination */}
        {showPagination && (
          <div className="dls-table__pagination">
            <div className="dls-table__pagination-left">
              <span>Items per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
              >
                {itemsPerPageOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span>of {totalItems}</span>
            </div>

            <div className="dls-table__pages">
              <button
                type="button"
                className="dls-table__page"
                disabled={currentPage <= 1}
                aria-label="Previous page"
                onClick={() => onPageChange?.(currentPage - 1)}
              >
                <ChevronLeft />
              </button>

              {pageList.map((item, i) =>
                item === 'ellipsis' ? (
                  <span key={`e${i}`} className="dls-table__page-ellipsis">…</span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className="dls-table__page"
                    data-selected={item === currentPage ? '' : undefined}
                    aria-current={item === currentPage ? 'page' : undefined}
                    onClick={() => onPageChange?.(item)}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                className="dls-table__page"
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                onClick={() => onPageChange?.(currentPage + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Table.displayName = 'Table';
