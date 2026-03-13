import React from 'react';
import './radiobutton.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type RadiobuttonTextOrientation = 'right' | 'left';

export interface RadiobuttonProps {
  /** Selected state */
  checked?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Position of the text relative to the radio */
  textOrientation?: RadiobuttonTextOrientation;
  /** Called on change */
  onChange?: (checked: boolean) => void;
  className?: string;
  /** Native name attribute */
  name?: string;
  /** Native value attribute */
  value?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Radiobutton = React.forwardRef<HTMLInputElement, RadiobuttonProps>(
  (
    {
      checked = false,
      disabled = false,
      label,
      description,
      textOrientation = 'right',
      onChange,
      className,
      name,
      value,
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={['dls-radiobutton', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
      >
        <input
          ref={ref}
          type="radio"
          className="dls-radiobutton__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
        />
        <span className="dls-radiobutton__circle-wrapper">
          <span className="dls-radiobutton__circle">
            <span className="dls-radiobutton__dot" />
          </span>
        </span>
        {(label || description) && (
          <span className="dls-radiobutton__text">
            {label && <span className="dls-radiobutton__label">{label}</span>}
            {description && <span className="dls-radiobutton__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Radiobutton.displayName = 'Radiobutton';
