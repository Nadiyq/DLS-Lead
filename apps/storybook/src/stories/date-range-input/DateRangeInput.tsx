import React from 'react';
import { Minus as MinusIcon, TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import { DateInput } from '../date-input/DateInput';
import { Calendar } from '../calendar/Calendar';
import './date-range-input.css';

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface DateRangeInputProps {
  /** Start date display string */
  startValue?: string;
  /** End date display string */
  endValue?: string;
  /** Start date as Date object (used with built-in calendar) */
  startDate?: Date;
  /** End date as Date object (used with built-in calendar) */
  endDate?: Date;
  /** Called when a start date is selected from the calendar */
  onStartDateSelect?: (date: Date) => void;
  /** Called when an end date is selected from the calendar */
  onEndDateSelect?: (date: Date) => void;
  /** Click handler for start date */
  onStartClick?: React.MouseEventHandler;
  /** Click handler for end date */
  onEndClick?: React.MouseEventHandler;
  /** Clear start date */
  onStartClear?: React.MouseEventHandler;
  /** Clear end date */
  onEndClear?: React.MouseEventHandler;
  /** Placeholder for start field */
  startPlaceholder?: string;
  /** Placeholder for end field */
  endPlaceholder?: string;
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DateRangeInput = React.forwardRef<HTMLDivElement, DateRangeInputProps>(
  (
    {
      startValue,
      endValue,
      startDate,
      endDate,
      onStartDateSelect,
      onEndDateSelect,
      onStartClick,
      onEndClick,
      onStartClear,
      onEndClear,
      startPlaceholder = 'MM / DD / YYYY',
      endPlaceholder = 'MM / DD / YYYY',
      label,
      hint,
      error,
      min,
      max,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const hasError = !!error;
    const [activeField, setActiveField] = React.useState<'start' | 'end' | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    /* Close on outside click */
    React.useEffect(() => {
      if (!activeField) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setActiveField(null);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [activeField]);

    /* Close on Escape */
    React.useEffect(() => {
      if (!activeField) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveField(null);
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [activeField]);

    const handleStartClick = (e: React.MouseEvent) => {
      setActiveField((prev) => prev === 'start' ? null : 'start');
      onStartClick?.(e);
    };

    const handleEndClick = (e: React.MouseEvent) => {
      setActiveField((prev) => prev === 'end' ? null : 'end');
      onEndClick?.(e);
    };

    const handleStartSelect = (date: Date) => {
      onStartDateSelect?.(date);
      setActiveField('end');
    };

    const handleEndSelect = (date: Date) => {
      onEndDateSelect?.(date);
      setActiveField(null);
    };

    const startDisplay = startValue ?? (startDate ? formatDate(startDate) : undefined);
    const endDisplay = endValue ?? (endDate ? formatDate(endDate) : undefined);

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-date-range-input', className].filter(Boolean).join(' ')}
      >
        {label && (
          <label
            className="dls-date-range-input__label"
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div className="dls-date-range-input__row">
          <DateInput
            value={startDisplay}
            placeholder={startPlaceholder}
            onClick={handleStartClick}
            onClear={(e) => { onStartClear?.(e); setActiveField(null); }}
            error={hasError ? ' ' : undefined}
            disabled={disabled}
          />

          <span className="dls-date-range-input__separator" aria-hidden="true">
            <MinusIcon />
          </span>

          <DateInput
            value={endDisplay}
            placeholder={endPlaceholder}
            onClick={handleEndClick}
            onClear={(e) => { onEndClear?.(e); setActiveField(null); }}
            error={hasError ? ' ' : undefined}
            disabled={disabled}
          />

          {activeField && (
            <div className="dls-date-range-input__dropdown" data-field={activeField}>
              <Calendar
                value={startDate}
                valueEnd={endDate}
                onSelect={activeField === 'start' ? handleStartSelect : handleEndSelect}
                min={min}
                max={max}
              />
            </div>
          )}
        </div>

        {(hint || hasError) && (
          <div className="dls-date-range-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-date-range-input__hint-icon" aria-hidden="true">
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

DateRangeInput.displayName = 'DateRangeInput';
