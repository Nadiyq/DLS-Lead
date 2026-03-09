import React from 'react';
import './slot-input.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

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
   Types
   --------------------------------------------------------------------------- */

export interface SlotInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Leading icon element */
  iconStart?: React.ReactNode;
  /** Trailing icon element */
  iconEnd?: React.ReactNode;
  /** Leading slot content (rendered after iconStart) */
  slotLeft?: React.ReactNode;
  /** Trailing slot content (rendered after iconEnd) */
  slotRight?: React.ReactNode;
  /** Show clear button when value is present */
  clearable?: boolean;
  /** Clear callback */
  onClear?: () => void;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const SlotInput = React.forwardRef<HTMLInputElement, SlotInputProps>(
  (
    {
      label,
      hint,
      error,
      iconStart,
      iconEnd,
      slotLeft,
      slotRight,
      clearable,
      onClear,
      disabled,
      value,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const hasValue = value !== undefined && value !== '';
    const inputId = id || React.useId();

    return (
      <div className={['dls-slot-input', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-slot-input__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-slot-input__field"
          data-disabled={disabled || undefined}
          data-error={hasError || undefined}
        >
          {iconStart && (
            <span className="dls-slot-input__icon">{iconStart}</span>
          )}

          {slotLeft && (
            <span className="dls-slot-input__slot">{slotLeft}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            className="dls-slot-input__input"
            disabled={disabled}
            value={value}
            {...props}
          />

          {clearable && hasValue && !disabled && (
            <button
              type="button"
              className="dls-slot-input__clear"
              onClick={onClear}
              aria-label="Clear"
            >
              <XIcon />
            </button>
          )}

          {iconEnd && (
            <span className="dls-slot-input__icon">{iconEnd}</span>
          )}

          {slotRight && (
            <span className="dls-slot-input__slot">{slotRight}</span>
          )}
        </div>

        {(hint || hasError) && (
          <div className="dls-slot-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-slot-input__hint-icon">
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

SlotInput.displayName = 'SlotInput';
