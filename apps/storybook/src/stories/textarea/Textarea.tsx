import React from 'react';
import './textarea.css';

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
   Component
   --------------------------------------------------------------------------- */

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  /** Label text above the textarea */
  label?: string;
  /** Hint text below the textarea */
  hint?: string;
  /** Error message — puts the field in error state */
  error?: string;
  /** Maximum character count. Shows counter in bottom bar when set. */
  maxLength?: number;
  /** Show character counter even without maxLength (displays current count) */
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      maxLength,
      showCount = false,
      disabled,
      value,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const inputId = id || React.useId();
    const charCount = typeof value === 'string' ? value.length : 0;
    const showCounter = showCount || maxLength !== undefined;

    return (
      <div className={['dls-textarea', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-textarea__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-textarea__box"
          data-disabled={disabled || undefined}
          data-error={hasError || undefined}
        >
          <textarea
            ref={ref}
            id={inputId}
            className="dls-textarea__input"
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            {...props}
          />

          {showCounter && (
            <div className="dls-textarea__bottom">
              <span className="dls-textarea__counter">
                {maxLength !== undefined
                  ? `${charCount}/${maxLength} characters`
                  : `${charCount} characters`}
              </span>
            </div>
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-textarea__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-textarea__hint-icon">
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

Textarea.displayName = 'Textarea';
