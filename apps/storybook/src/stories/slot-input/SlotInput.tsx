import React from 'react';
import { X as XIcon, TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import './slot-input.css';

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
            <span className="dls-slot-input__icon" aria-hidden="true">{iconStart}</span>
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
            <span className="dls-slot-input__icon" aria-hidden="true">{iconEnd}</span>
          )}

          {slotRight && (
            <span className="dls-slot-input__slot">{slotRight}</span>
          )}
        </div>

        {(hint || hasError) && (
          <div className="dls-slot-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-slot-input__hint-icon" aria-hidden="true">
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
