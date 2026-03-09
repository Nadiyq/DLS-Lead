import React from 'react';
import './search-field.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text above the search field */
  label?: string;
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      label,
      onClear,
      disabled,
      value,
      className,
      id,
      placeholder = 'Search',
      ...props
    },
    ref,
  ) => {
    const hasValue = value !== undefined && value !== '';
    const inputId = id || React.useId();

    return (
      <div className={['dls-search-field', className].filter(Boolean).join(' ')}>
        {label && (
          <label
            className="dls-search-field__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-search-field__box"
          data-disabled={disabled || undefined}
        >
          <span className="dls-search-field__icon">
            <SearchIcon />
          </span>

          <input
            ref={ref}
            id={inputId}
            type="search"
            className="dls-search-field__input"
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            {...props}
          />

          {hasValue && !disabled && (
            <button
              type="button"
              className="dls-search-field__clear"
              onClick={onClear}
              aria-label="Clear search"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
