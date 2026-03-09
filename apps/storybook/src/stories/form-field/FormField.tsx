import React from 'react';
import './form-field.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 5.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="3.75" r="0.5" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type FormFieldOrientation = 'vertical' | 'horizontal';

export interface FormFieldProps {
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Show info icon next to label */
  showInfo?: boolean;
  /** Info icon click/hover handler */
  onInfoClick?: React.MouseEventHandler;
  /** Layout orientation */
  orientation?: FormFieldOrientation;
  /** htmlFor linking to input */
  htmlFor?: string;
  disabled?: boolean;
  /** The input component */
  children: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      hint,
      showInfo,
      onInfoClick,
      orientation = 'vertical',
      htmlFor,
      disabled = false,
      children,
      className,
    },
    ref,
  ) => {
    const labelContent = label && (
      <div className="dls-form-field__label-row">
        <label
          className="dls-form-field__label"
          htmlFor={htmlFor}
          data-disabled={disabled || undefined}
        >
          {label}
        </label>
        {showInfo && (
          <span
            className="dls-form-field__info"
            role="button"
            tabIndex={0}
            onClick={onInfoClick}
            aria-label="More info"
          >
            <InfoIcon />
          </span>
        )}
      </div>
    );

    const hintContent = hint && (
      <span className="dls-form-field__hint" data-disabled={disabled || undefined}>
        {hint}
      </span>
    );

    if (orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={['dls-form-field', className].filter(Boolean).join(' ')}
          data-orientation="horizontal"
        >
          <div className="dls-form-field__left">
            {labelContent}
            {hintContent}
          </div>
          <div className="dls-form-field__input">
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={['dls-form-field', className].filter(Boolean).join(' ')}
        data-orientation="vertical"
      >
        {labelContent}
        <div className="dls-form-field__input">
          {children}
        </div>
        {hintContent}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
