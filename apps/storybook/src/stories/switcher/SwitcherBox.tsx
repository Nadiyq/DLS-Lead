import React from 'react';
import { Switcher } from './Switcher';
import './switcher-box.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SwitcherBoxTextOrientation = 'right' | 'left';

export interface SwitcherBoxProps {
  /** Checked (on) state */
  checked?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Text position relative to switcher */
  textOrientation?: SwitcherBoxTextOrientation;
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

export const SwitcherBox = React.forwardRef<HTMLDivElement, SwitcherBoxProps>(
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
        className={['dls-switcher-box', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
        data-selected={checked ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Switcher
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        />
        {(label || description) && (
          <div className="dls-switcher-box__text">
            {label && <span className="dls-switcher-box__label">{label}</span>}
            {description && <span className="dls-switcher-box__description">{description}</span>}
          </div>
        )}
      </div>
    );
  },
);

SwitcherBox.displayName = 'SwitcherBox';
