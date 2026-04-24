import React from 'react';
import { Info as InfoIcon } from 'lucide-react';
import './form-field.css';

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
            <InfoIcon aria-hidden="true" />
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
