import React from 'react';
import './pagination.css';

/* ===========================================================================
   PageButton — single pagination control
   =========================================================================== */

export type PageButtonType = 'number' | 'more' | 'previous' | 'next';

export interface PageButtonProps {
  /** Button type */
  type?: PageButtonType;
  /** Whether this page is currently selected */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  /** Page number (for type="number") or custom label */
  children?: React.ReactNode;
  className?: string;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PageButton = React.forwardRef<HTMLButtonElement, PageButtonProps>(
  (
    {
      type = 'number',
      selected = false,
      disabled = false,
      onClick,
      children,
      className,
    },
    ref,
  ) => {
    const renderContent = () => {
      switch (type) {
        case 'previous':
          return (
            <>
              <span className="dls-page-button__icon"><ChevronLeft /></span>
              Previous
            </>
          );
        case 'next':
          return (
            <>
              Next
              <span className="dls-page-button__icon"><ChevronRight /></span>
            </>
          );
        case 'more':
          return '...';
        case 'number':
        default:
          return children;
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={['dls-page-button', className].filter(Boolean).join(' ')}
        data-type={type}
        data-selected={type === 'number' && selected ? 'true' : undefined}
        disabled={disabled}
        onClick={onClick}
        aria-current={type === 'number' && selected ? 'page' : undefined}
      >
        {renderContent()}
      </button>
    );
  },
);

PageButton.displayName = 'PageButton';

/* ===========================================================================
   ItemsPerPage — "Items per page [value ▾] of total"
   =========================================================================== */

export interface ItemsPerPageProps {
  /** Current page size */
  value: number;
  /** Total item count */
  total: number;
  /** Available page size options */
  options?: number[];
  /** Change handler */
  onChange?: (value: number) => void;
  className?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ItemsPerPage = React.forwardRef<HTMLDivElement, ItemsPerPageProps>(
  ({ value, total, options = [10, 25, 50, 100], onChange, className }, ref) => (
    <div
      ref={ref}
      className={['dls-items-per-page', className].filter(Boolean).join(' ')}
    >
      <span>Items per page</span>
      <label className="dls-items-per-page__select">
        <select
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          style={{
            all: 'unset',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
            appearance: 'none',
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="dls-items-per-page__select-icon"><ChevronDown /></span>
      </label>
      <span>of {total}</span>
    </div>
  ),
);

ItemsPerPage.displayName = 'ItemsPerPage';

/* ===========================================================================
   Pagination — composed full bar
   =========================================================================== */

export type PaginationVariant = 'bordered' | 'borderless';

export interface PaginationProps {
  /** Visual variant */
  variant?: PaginationVariant;
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total item count (for ItemsPerPage) */
  totalItems?: number;
  /** Current page size */
  pageSize?: number;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Page change handler */
  onPageChange?: (page: number) => void;
  /** Page size change handler */
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | 'more')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'more')[] = [1];

  if (current > 3) pages.push('more');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('more');

  pages.push(total);
  return pages;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      variant = 'bordered',
      currentPage,
      totalPages,
      totalItems,
      pageSize,
      pageSizeOptions,
      onPageChange,
      onPageSizeChange,
      className,
    },
    ref,
  ) => {
    const pages = getPageNumbers(currentPage, totalPages);

    return (
      <nav
        ref={ref}
        className={['dls-pagination', className].filter(Boolean).join(' ')}
        data-variant={variant}
        aria-label="Pagination"
      >
        {totalItems !== undefined && pageSize !== undefined && (
          <ItemsPerPage
            value={pageSize}
            total={totalItems}
            options={pageSizeOptions}
            onChange={onPageSizeChange}
          />
        )}

        <div className="dls-pagination__pages">
          <PageButton
            type="previous"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
          />

          {pages.map((page, i) =>
            page === 'more' ? (
              <PageButton key={`more-${i}`} type="more" disabled />
            ) : (
              <PageButton
                key={page}
                type="number"
                selected={page === currentPage}
                onClick={() => onPageChange?.(page)}
              >
                {page}
              </PageButton>
            ),
          )}

          <PageButton
            type="next"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
          />
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
