import React from 'react';
import { Radiobutton } from './Radiobutton';
import './radiobutton-box.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type RadiobuttonBoxTextOrientation = 'right' | 'left';

export interface RadiobuttonBoxProps {
  /** Selected state */
  checked?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Text position relative to radiobutton */
  textOrientation?: RadiobuttonBoxTextOrientation;
  /** Called on change */
  onChange?: (checked: boolean) => void;
  className?: string;
  /** Native name */
  name?: string;
  /** Native value */
  value?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const RadiobuttonBox = React.forwardRef<HTMLDivElement, RadiobuttonBoxProps>(
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
    const handleClick = () => {
      if (!disabled && !checked) {
        onChange?.(true);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={['dls-radiobutton-box', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
        data-selected={checked ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        role="radio"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Radiobutton
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        />
        {(label || description) && (
          <div className="dls-radiobutton-box__text">
            {label && <span className="dls-radiobutton-box__label">{label}</span>}
            {description && <span className="dls-radiobutton-box__description">{description}</span>}
          </div>
        )}
      </div>
    );
  },
);

RadiobuttonBox.displayName = 'RadiobuttonBox';
