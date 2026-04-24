import React from 'react';
import {
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
  TriangleAlert as TriangleAlertIcon,
} from 'lucide-react';
import './date-input.css';
import { Calendar } from '../calendar/Calendar';

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
    const errorText = error?.trim();
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
            <span className="dls-date-input__calendar-icon" aria-hidden="true">
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

          <span className="dls-date-input__chevron" aria-hidden="true">
            <ChevronDownIcon />
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

        {(hint || errorText) && (
          <div className="dls-date-input__hint" data-error={hasError || undefined}>
            {errorText && (
              <span className="dls-date-input__hint-icon" aria-hidden="true">
                <TriangleAlertIcon />
              </span>
            )}
            <span>{errorText || hint}</span>
          </div>
        )}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
