import React from 'react';
import {
  X as XIcon,
  TriangleAlert as TriangleAlertIcon,
  Send as SendIcon,
} from 'lucide-react';
import './textarea.css';

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
  /** Show "N% used" indicator in the bottom bar (requires maxLength) */
  showUsedPercent?: boolean;
  /** Show a clear (X) button when the textarea has value */
  clearable?: boolean;
  /** Callback when the clear button is clicked */
  onClear?: () => void;
  /** Callback for the send action. When provided, a send button renders in the bottom bar. */
  onSend?: () => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      maxLength,
      showCount = false,
      showUsedPercent = false,
      clearable = false,
      onClear,
      onSend,
      disabled,
      value,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const reactId = React.useId();
    const inputId = id || reactId;
    const charCount = typeof value === 'string' ? value.length : 0;
    const showCounter = showCount || maxLength !== undefined;
    const hasValue = value !== undefined && value !== '';
    const showClear = clearable && hasValue && !disabled;
    const usedPercent =
      showUsedPercent && maxLength ? Math.min(100, Math.round((charCount / maxLength) * 100)) : null;
    const showBottom = showCounter || usedPercent !== null || onSend !== undefined;

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
          <div className="dls-textarea__field">
            <textarea
              ref={ref}
              id={inputId}
              className="dls-textarea__input"
              disabled={disabled}
              value={value}
              maxLength={maxLength}
              {...props}
            />
            {showClear && (
              <button
                type="button"
                className="dls-textarea__clear"
                onClick={onClear}
                aria-label="Clear input"
              >
                <XIcon />
              </button>
            )}
          </div>

          {showBottom && (
            <div className="dls-textarea__bottom">
              {showCounter && (
                <span className="dls-textarea__counter">
                  {maxLength !== undefined
                    ? `${charCount}/${maxLength} characters`
                    : `${charCount} characters`}
                </span>
              )}
              {(usedPercent !== null || onSend) && (
                <div className="dls-textarea__actions">
                  {usedPercent !== null && (
                    <span className="dls-textarea__used">{usedPercent}% used</span>
                  )}
                  {onSend && (
                    <button
                      type="button"
                      className="dls-textarea__send"
                      onClick={onSend}
                      disabled={disabled}
                      aria-label="Send"
                    >
                      <SendIcon />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-textarea__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-textarea__hint-icon" aria-hidden="true">
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
