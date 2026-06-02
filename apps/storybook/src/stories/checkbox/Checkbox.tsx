import React from 'react';
import { Check as CheckIcon, Minus as MinusIcon } from 'lucide-react';
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
  /** Accessible label when no visible label is rendered */
  'aria-label'?: string;
}

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
      'aria-label': ariaLabel,
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
          aria-label={ariaLabel}
        />
        <span className="dls-checkbox__box-wrapper">
          <span className="dls-checkbox__box">
            <CheckIcon className="dls-checkbox__icon-check" />
            <MinusIcon className="dls-checkbox__icon-minus" />
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
