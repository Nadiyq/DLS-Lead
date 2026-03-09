import React, { useState, useRef, useCallback } from 'react';
import { ChipRegular } from '../chip/ChipRegular';
import './chip-input.css';

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

export interface ChipInputProps {
  /** Current chip values */
  chips?: string[];
  /** Callback when chips change */
  onChipsChange?: (chips: string[]) => void;
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Placeholder when no chips and no text */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ChipInput = React.forwardRef<HTMLInputElement, ChipInputProps>(
  (
    {
      chips = [],
      onChipsChange,
      label,
      hint,
      error,
      placeholder = 'Type...',
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = id || React.useId();

    const hasError = !!error;
    const hasChips = chips.length > 0;

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    const addChip = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || chips.includes(trimmed)) return;
      onChipsChange?.([...chips, trimmed]);
    };

    const removeChip = (index: number) => {
      onChipsChange?.(chips.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        addChip(inputValue);
        setInputValue('');
      }
      if (e.key === 'Backspace' && !inputValue && hasChips) {
        removeChip(chips.length - 1);
      }
    };

    const handleBoxClick = () => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    };

    return (
      <div className={['dls-chip-input', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-chip-input__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-chip-input__box"
          data-has-chips={hasChips || undefined}
          data-focused={focused || undefined}
          data-disabled={disabled || undefined}
          data-error={hasError || undefined}
          onClick={handleBoxClick}
        >
          <div className="dls-chip-input__content">
            {chips.map((chip, i) => (
              <ChipRegular
                key={`${chip}-${i}`}
                label={chip}
                variant="outline"
                intent="neutral"
                size="s"
                disabled={disabled}
                onRemove={!disabled ? () => removeChip(i) : undefined}
              />
            ))}

            <input
              ref={setRef}
              id={inputId}
              type="text"
              className="dls-chip-input__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={hasChips ? '' : placeholder}
              disabled={disabled}
            />
          </div>
        </div>

        {(hint || hasError) && (
          <div
            className="dls-chip-input__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-chip-input__hint-icon">
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

ChipInput.displayName = 'ChipInput';
