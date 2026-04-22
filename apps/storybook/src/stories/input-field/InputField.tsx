import React from 'react';
import { X as XIcon, TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import './input-field.css';

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
  /** Trailing icon inside the input (replaced by clear icon when clearable + filled) */
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
    const reactId = React.useId();
    const inputId = id || reactId;

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

        <div
          className="dls-input-field__field"
          data-error={hasError || undefined}
          data-disabled={disabled || undefined}
        >
          {iconStart && (
            <span className="dls-input-field__icon-start" aria-hidden="true">
              {iconStart}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className="dls-input-field__input"
            disabled={disabled}
            value={value}
            {...props}
          />
          {showClear ? (
            <button
              type="button"
              className="dls-input-field__clear"
              onClick={onClear}
              aria-label="Clear input"
            >
              <XIcon />
            </button>
          ) : (
            iconEnd && (
              <span className="dls-input-field__icon-end" aria-hidden="true">
                {iconEnd}
              </span>
            )
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-input-field__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-input-field__hint-icon" aria-hidden="true">
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
