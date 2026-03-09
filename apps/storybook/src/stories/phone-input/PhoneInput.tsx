import React from 'react';
import './phone-input.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
   Country data type
   --------------------------------------------------------------------------- */

export interface CountryOption {
  /** ISO 3166-1 alpha-2 code (e.g. "US") */
  code: string;
  /** Dial code with + (e.g. "+1") */
  dialCode: string;
  /** Flag emoji (e.g. "🇺🇸") */
  flag: string;
  /** Country name for aria-label */
  name: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text above the input */
  label?: string;
  /** Hint text below the input */
  hint?: string;
  /** Error message — puts the field in error state */
  error?: string;
  /** Selected country */
  country?: CountryOption;
  /** Callback when the country selector is clicked */
  onCountryClick?: React.MouseEventHandler;
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

const DEFAULT_COUNTRY: CountryOption = {
  code: 'US',
  dialCode: '+1',
  flag: '🇺🇸',
  name: 'United States',
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      hint,
      error,
      country = DEFAULT_COUNTRY,
      onCountryClick,
      onClear,
      disabled,
      value,
      className,
      id,
      placeholder = '000-000-0000',
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const hasValue = value !== undefined && value !== '';
    const inputId = id || React.useId();

    return (
      <div className={['dls-phone-input', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-phone-input__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-phone-input__box"
          data-disabled={disabled || undefined}
          data-error={hasError || undefined}
          data-filled={hasValue || undefined}
        >
          <button
            type="button"
            className="dls-phone-input__country"
            onClick={onCountryClick}
            disabled={disabled}
            aria-label={`Selected country: ${country.name}. Click to change.`}
          >
            <span className="dls-phone-input__flag">{country.flag}</span>
            <span className="dls-phone-input__chevron">
              <ChevronDown />
            </span>
          </button>

          <span className="dls-phone-input__code">{country.dialCode}</span>

          <input
            ref={ref}
            id={inputId}
            type="tel"
            className="dls-phone-input__input"
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            {...props}
          />

          {hasValue && !disabled && (
            <button
              type="button"
              className="dls-phone-input__clear"
              onClick={onClear}
              aria-label="Clear phone number"
            >
              <XIcon />
            </button>
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-phone-input__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-phone-input__hint-icon">
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

PhoneInput.displayName = 'PhoneInput';
