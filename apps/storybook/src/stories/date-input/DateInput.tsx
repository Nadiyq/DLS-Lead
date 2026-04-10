import React from 'react';
import './date-input.css';
import { Calendar } from '../calendar/Calendar';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.33" />
    <path d="M5.5 1.5V3.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    <path d="M10.5 1.5V3.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TriangleAlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.13 2.57L1.18 10.5A1 1 0 002.05 12h9.9a1 1 0 00.87-1.5L7.87 2.57a1 1 0 00-1.74 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 5.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="9.5" r="0.5" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function parseDate(str: string): Date | undefined {
  const d = new Date(str);
  return isNaN(d.getTime()) ? undefined : d;
}

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface DateInputProps {
  /** Selected date value (display string, e.g. "10 Sep 2023") */
  value?: string;
  /** Selected date as Date object (used with built-in calendar) */
  selectedDate?: Date;
  /** Called when a date is selected from the calendar */
  onDateSelect?: (date: Date) => void;
  /** Click handler — opens date picker (also opens built-in calendar) */
  onClick?: React.MouseEventHandler;
  /** Clear callback */
  onClear?: React.MouseEventHandler;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Allow clearing the selection */
  clearable?: boolean;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DateInput = React.forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      value,
      selectedDate,
      onDateSelect,
      onClick,
      onClear,
      placeholder = 'MM / DD / YYYY',
      label,
      hint,
      error,
      clearable = true,
      min,
      max,
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const hasError = !!error;
    const displayValue = value ?? (selectedDate ? formatDate(selectedDate) : undefined);
    const hasValue = !!displayValue;
    const triggerId = id || React.useId();

    const [open, setOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    /* Close on outside click */
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

    /* Close on Escape */
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open]);

    const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen((prev) => !prev);
      onClick?.(e);
    };

    const handleDateSelect = (date: Date) => {
      onDateSelect?.(date);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.(e);
      setOpen(false);
    };

    const calendarValue = selectedDate ?? (value ? parseDate(value) : undefined);

    return (
      <div
        ref={wrapperRef}
        className={['dls-date-input', className].filter(Boolean).join(' ')}
      >
        {label && (
          <label
            className="dls-date-input__label"
            htmlFor={triggerId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <button
          ref={ref}
          type="button"
          id={triggerId}
          className="dls-date-input__trigger"
          disabled={disabled}
          data-error={hasError || undefined}
          data-open={open || undefined}
          onClick={handleTriggerClick}
        >
          <span className="dls-date-input__content">
            <span className="dls-date-input__calendar-icon">
              <CalendarIcon />
            </span>
            <span
              className="dls-date-input__value"
              data-placeholder={!hasValue || undefined}
            >
              {displayValue || placeholder}
            </span>
          </span>

          {clearable && hasValue && !disabled && (
            <button
              type="button"
              className="dls-date-input__clear"
              onClick={handleClear}
              aria-label="Clear date"
            >
              <XIcon />
            </button>
          )}

          <span className="dls-date-input__chevron">
            <ChevronDown />
          </span>
        </button>

        {open && onDateSelect && (
          <div className="dls-date-input__dropdown">
            <Calendar
              value={calendarValue}
              onSelect={handleDateSelect}
              min={min}
              max={max}
            />
          </div>
        )}

        {(hint || hasError) && (
          <div className="dls-date-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-date-input__hint-icon">
                <TriangleAlertIcon />
              </span>
            )}
            <span>{error || hint}</span>
          </div>
        )}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
