import React from 'react';
import './input-field.css';

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
   Component
   --------------------------------------------------------------------------- */

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text above the input */
  label?: string;
  /** Hint text below the input */
  hint?: string;
  /** Error message — puts the field in error state */
  error?: string;
  /** Show a clear button when input has value */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Leading icon inside the input */
  iconStart?: React.ReactNode;
  /** Trailing icon inside the input (replaced by clear/error icon when applicable) */
  iconEnd?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hint,
      error,
      clearable = false,
      onClear,
      iconStart,
      iconEnd,
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
    const showClear = clearable && hasValue && !disabled;
    const inputId = id || React.useId();

    return (
      <div className={['dls-input-field', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-input-field__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <input
            ref={ref}
            id={inputId}
            className="dls-input-field__input"
            disabled={disabled}
            value={value}
            data-error={hasError || undefined}
            {...props}
          />
          {showClear && (
            <button
              type="button"
              className="dls-input-field__clear"
              onClick={onClear}
              aria-label="Clear input"
              style={{ position: 'absolute', right: 12 }}
            >
              <XIcon />
            </button>
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-input-field__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-input-field__hint-icon">
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

InputField.displayName = 'InputField';
