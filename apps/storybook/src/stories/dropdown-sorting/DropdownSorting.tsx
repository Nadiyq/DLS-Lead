import React, { useState, useRef, useEffect } from 'react';
import './dropdown-sorting.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
   Internal mini-select
   --------------------------------------------------------------------------- */

interface MiniSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const MiniSelect = ({ label, value, options, onChange }: MiniSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="dls-dropdown-sorting__field">
      <span className="dls-dropdown-sorting__label">{label}</span>
      <div
        ref={wrapperRef}
        className="dls-dropdown-sorting__select-wrapper"
        data-open={open || undefined}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="dls-dropdown-sorting__select"
          data-open={open || undefined}
          data-placeholder={!selected || undefined}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="dls-dropdown-sorting__select-text">
            {selected?.label || 'Select'}
          </span>
          <span className="dls-dropdown-sorting__chevron">
            <ChevronDown />
          </span>
        </button>

        <ul className="dls-dropdown-sorting__options" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              className="dls-dropdown-sorting__option"
              role="option"
              aria-selected={opt.value === value}
              data-selected={opt.value === value || undefined}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Direction options
   --------------------------------------------------------------------------- */

const directionOptions: { value: SortDirection; label: string }[] = [
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

    const handleColumn = (value: string) => {
      setColumn(value);
      onColumnChange?.(value);
    };

    const handleDirection = (value: string) => {
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
        <MiniSelect
          label="Column"
          value={column}
          options={columns}
          onChange={handleColumn}
        />
        <MiniSelect
          label="Sort"
          value={direction}
          options={directionOptions}
          onChange={handleDirection}
        />
      </div>
    );
  },
);

DropdownSorting.displayName = 'DropdownSorting';
