import React from 'react';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
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
              <span className="dls-page-button__icon"><ChevronLeftIcon /></span>
              Previous
            </>
          );
        case 'next':
          return (
            <>
              Next
              <span className="dls-page-button__icon"><ChevronRightIcon /></span>
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

export const ItemsPerPage = React.forwardRef<HTMLDivElement, ItemsPerPageProps>(
  ({ value, total, options = [5, 10, 20, 50, 100], onChange, className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open]);

    const handleSelect = (opt: number) => {
      onChange?.(opt);
      setOpen(false);
    };

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-items-per-page', className].filter(Boolean).join(' ')}
      >
        <span>Items per page</span>
        <button
          type="button"
          className="dls-items-per-page__trigger"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {value}
          <span className="dls-items-per-page__select-icon" data-open={open || undefined}>
            <ChevronDownIcon />
          </span>
        </button>
        {open && (
          <List className="dls-items-per-page__dropdown" role="listbox">
            {options.map((opt) => (
              <ListItem
                key={opt}
                type="text"
                text={String(opt)}
                selected={opt === value}
                onClick={() => handleSelect(opt)}
              />
            ))}
          </List>
        )}
        <span>of {total}</span>
      </div>
    );
  },
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
