import React from 'react';
import { ArrowUpDown as ArrowUpDownIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
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
  /** Called when column menu trigger is clicked */
  onMenuClick?: () => void;
  /** Slot content (control type — checkbox, etc.) */
  children?: React.ReactNode;
  /** Floating menu content anchored to the header cell */
  floatingMenu?: React.ReactNode;
  /** Column resize handle */
  resizeHandle?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
      onMenuClick,
      children,
      floatingMenu,
      resizeHandle,
      className,
      style,
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

    const stopHeaderFloatingContentPropagation = (e: React.SyntheticEvent) => {
      e.stopPropagation();
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
        style={style}
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

        {type === 'text' && onMenuClick && (
          <button
            type="button"
            className="dls-table-header-cell__menu-trigger"
            onClick={stopHeaderFloatingContentPropagation}
            onPointerDown={stopHeaderFloatingContentPropagation}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onMenuClick();
              }
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onMenuClick();
            }}
            aria-label={`Column menu${text ? ` for ${text}` : ''}`}
            tabIndex={0}
          >
            <ChevronDownIcon />
          </button>
        )}

        {floatingMenu && (
          <span
            className="dls-table-header-cell__floating-menu"
            onClick={stopHeaderFloatingContentPropagation}
            onKeyDown={stopHeaderFloatingContentPropagation}
            onPointerDown={stopHeaderFloatingContentPropagation}
          >
            {floatingMenu}
          </span>
        )}

        {resizeHandle && (
          <span
            className="dls-table-header-cell__resize"
            onClick={stopHeaderFloatingContentPropagation}
            onKeyDown={stopHeaderFloatingContentPropagation}
            onPointerDown={stopHeaderFloatingContentPropagation}
          >
            {resizeHandle}
          </span>
        )}
      </div>
    );
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';
