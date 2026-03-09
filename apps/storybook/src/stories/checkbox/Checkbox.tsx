import React from 'react';
import './checkbox.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CheckboxTextOrientation = 'right' | 'left';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state (visual only, overrides checked appearance) */
  indeterminate?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Position of the text relative to the checkbox */
  textOrientation?: CheckboxTextOrientation;
  /** Called on change */
  onChange?: (checked: boolean) => void;
  className?: string;
  /** Native name attribute */
  name?: string;
  /** Native value attribute */
  value?: string;
}

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const CheckIcon = () => (
  <svg className="dls-checkbox__icon-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12.6667L9.33333 18L20 7.33333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = () => (
  <svg className="dls-checkbox__icon-minus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33333 12H18.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
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
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={['dls-checkbox', className].filter(Boolean).join(' ')}
        data-text-orientation={textOrientation !== 'right' ? textOrientation : undefined}
      >
        <input
          ref={inputRef}
          type="checkbox"
          className="dls-checkbox__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
        />
        <span className="dls-checkbox__box-wrapper">
          <span className="dls-checkbox__box">
            <CheckIcon />
            <MinusIcon />
          </span>
        </span>
        {(label || description) && (
          <span className="dls-checkbox__text">
            {label && <span className="dls-checkbox__label">{label}</span>}
            {description && <span className="dls-checkbox__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
