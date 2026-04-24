import React, { useRef, useCallback } from 'react';
import { Minus as MinusIcon, TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import './otp-input.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type OtpInputType = 'spacing' | 'no-spacing' | '1-separator' | '2-separator';

export interface OtpInputProps {
  /** Number of digits */
  length?: number;
  /** Visual type */
  type?: OtpInputType;
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
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

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      type = 'spacing',
      value = '',
      onChange,
      label,
      hint,
      error,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const hasError = !!error;
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

    const setInputRef = useCallback(
      (index: number) => (node: HTMLInputElement | null) => {
        inputsRef.current[index] = node;
      },
      [],
    );

    const focusSlot = (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputsRef.current[clamped]?.focus();
    };

    const updateValue = (index: number, digit: string) => {
      const arr = digits.slice();
      arr[index] = digit;
      onChange?.(arr.join(''));
    };

    const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const char = input.value.slice(-1);
      if (!/^\d$/.test(char)) {
        input.value = digits[index];
        return;
      }
      updateValue(index, char);
      if (index < length - 1) {
        focusSlot(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (digits[index]) {
          updateValue(index, '');
        } else if (index > 0) {
          updateValue(index - 1, '');
          focusSlot(index - 1);
        }
      }
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        focusSlot(index - 1);
      }
      if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        focusSlot(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (pasted) {
        onChange?.(pasted.padEnd(length, '').slice(0, length));
        focusSlot(Math.min(pasted.length, length - 1));
      }
    };

    const renderSlot = (index: number) => (
      <input
        key={index}
        ref={setInputRef(index)}
        className="dls-otp-input__slot"
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={digits[index]}
        disabled={disabled}
        data-filled={digits[index] ? true : undefined}
        data-error={hasError || undefined}
        onInput={(e) => handleInput(index, e)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={handlePaste}
        onFocus={(e) => e.currentTarget.select()}
        aria-label={`Digit ${index + 1}`}
      />
    );

    const renderSeparator = (key: string) => (
      <span key={key} className="dls-otp-input__separator">
        <MinusIcon />
      </span>
    );

    const renderField = () => {
      if (type === 'spacing' || type === 'no-spacing') {
        return (
          <div
            className="dls-otp-input__field"
            data-type={type}
            data-error={hasError || undefined}
            data-disabled={disabled || undefined}
          >
            {Array.from({ length }, (_, i) => renderSlot(i))}
          </div>
        );
      }

      if (type === '1-separator') {
        const half = Math.ceil(length / 2);
        return (
          <div className="dls-otp-input__field" data-type={type}>
            <div className="dls-otp-input__group" data-error={hasError || undefined} data-disabled={disabled || undefined}>
              {Array.from({ length: half }, (_, i) => renderSlot(i))}
            </div>
            {renderSeparator('sep-0')}
            <div className="dls-otp-input__group" data-error={hasError || undefined} data-disabled={disabled || undefined}>
              {Array.from({ length: length - half }, (_, i) => renderSlot(half + i))}
            </div>
          </div>
        );
      }

      // 2-separator: split into thirds
      const third = Math.ceil(length / 3);
      const secondEnd = third * 2;
      return (
        <div className="dls-otp-input__field" data-type={type}>
          <div className="dls-otp-input__group" data-error={hasError || undefined} data-disabled={disabled || undefined}>
            {Array.from({ length: third }, (_, i) => renderSlot(i))}
          </div>
          {renderSeparator('sep-0')}
          <div className="dls-otp-input__group" data-error={hasError || undefined} data-disabled={disabled || undefined}>
            {Array.from({ length: secondEnd - third }, (_, i) => renderSlot(third + i))}
          </div>
          {renderSeparator('sep-1')}
          <div className="dls-otp-input__group" data-error={hasError || undefined} data-disabled={disabled || undefined}>
            {Array.from({ length: length - secondEnd }, (_, i) => renderSlot(secondEnd + i))}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={['dls-otp-input', className].filter(Boolean).join(' ')}>
        {label && (
          <label className="dls-otp-input__label" data-disabled={disabled || undefined}>
            {label}
          </label>
        )}

        {renderField()}

        {(hint || hasError) && (
          <div className="dls-otp-input__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-otp-input__hint-icon" aria-hidden="true">
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

OtpInput.displayName = 'OtpInput';
