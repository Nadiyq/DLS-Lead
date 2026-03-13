import React from 'react';
import './switcher.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SwitcherTextOrientation = 'right' | 'left';

export interface SwitcherProps {
  /** Checked (on) state */
  checked?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Position of the text relative to the switcher */
  textOrientation?: SwitcherTextOrientation;
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

export const Switcher = React.forwardRef<HTMLInputElement, SwitcherProps>(
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
        className={['dls-switcher', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="dls-switcher__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
        />
        <span className="dls-switcher__track-wrapper">
          <span className="dls-switcher__track">
            <span className="dls-switcher__toggle" />
          </span>
        </span>
        {(label || description) && (
          <span className="dls-switcher__text">
            {label && <span className="dls-switcher__label">{label}</span>}
            {description && <span className="dls-switcher__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Switcher.displayName = 'Switcher';
