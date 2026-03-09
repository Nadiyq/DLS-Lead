import React from 'react';
import { Checkbox } from './Checkbox';
import './checkbox-box.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CheckboxBoxTextOrientation = 'right' | 'left';

export interface CheckboxBoxProps {
  /** Checked state */
  checked?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Text position relative to checkbox */
  textOrientation?: CheckboxBoxTextOrientation;
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

export const CheckboxBox = React.forwardRef<HTMLDivElement, CheckboxBoxProps>(
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
      if (!disabled) {
        onChange?.(!checked);
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
        className={['dls-checkbox-box', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
        data-selected={checked ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        />
        {(label || description) && (
          <div className="dls-checkbox-box__text">
            {label && <span className="dls-checkbox-box__label">{label}</span>}
            {description && <span className="dls-checkbox-box__description">{description}</span>}
          </div>
        )}
      </div>
    );
  },
);

CheckboxBox.displayName = 'CheckboxBox';
