import React from 'react';
import './button.css';
export { Plus as PlusIcon } from 'lucide-react';

export type ButtonVariant = 'filled' | 'outline' | 'soft' | 'dotted' | 'ghost' | 'link';
export type ButtonIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'm' | 's';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the action. */
  variant?: ButtonVariant;
  /** Semantic intent that controls color tokens. */
  intent?: ButtonIntent;
  /** Button height, typography, padding, and icon slot size. */
  size?: ButtonSize;
  /** Optional leading icon. Use lucide-react icons. */
  icon?: React.ReactNode;
  /** Optional trailing icon. Use lucide-react icons. */
  iconEnd?: React.ReactNode;
  /** Hide visible label content and render a square icon button. Requires an accessible name. */
  iconOnly?: boolean;
  /** Visible button label unless iconOnly is true. */
  children?: React.ReactNode;
  /** Disable native button interaction and apply disabled tokens. */
  disabled?: boolean;
  /** Additional class name for the root button. */
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      intent = 'neutral',
      size = 'm',
      icon,
      iconEnd,
      iconOnly = false,
      children,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={['dls-button', className].filter(Boolean).join(' ')}
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        data-icon-only={iconOnly || undefined}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="dls-button__icon" aria-hidden="true">{icon}</span>}
        {!iconOnly && children}
        {iconEnd && <span className="dls-button__icon-end" aria-hidden="true">{iconEnd}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
