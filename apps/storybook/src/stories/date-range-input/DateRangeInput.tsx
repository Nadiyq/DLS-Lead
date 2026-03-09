import React from 'react';
import { DateInput } from '../date-input/DateInput';
import './date-range-input.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const TriangleAlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.13 2.57L1.18 10.5A1 1 0 002.05 12h9.9a1 1 0 00.87-1.5L7.87 2.57a1 1 0 00-1.74 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 5.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="9.5" r="0.5" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface DateRangeInputProps {
  /** Start date display string */
  startValue?: string;
  /** End date display string */
  endValue?: string;
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
      onStartClick,
      onEndClick,
      onStartClear,
      onEndClear,
      startPlaceholder = 'MM / DD / YYYY',
      endPlaceholder = 'MM / DD / YYYY',
      label,
      hint,
      error,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const hasError = !!error;

    return (
      <div ref={ref} className={['dls-date-range-input', className].filter(Boolean).join(' ')}>
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
            value={startValue}
            placeholder={startPlaceholder}
            onClick={onStartClick}
            onClear={onStartClear}
            error={hasError ? ' ' : undefined}
            disabled={disabled}
          />

          <span className="dls-date-range-input__separator" />

          <DateInput
            value={endValue}
            placeholder={endPlaceholder}
            onClick={onEndClick}
            onClear={onEndClear}
            error={hasError ? ' ' : undefined}
            disabled={disabled}
          />
        </div>

        {(hint || hasError) && (
          <div className="dls-date-range-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-date-range-input__hint-icon">
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
