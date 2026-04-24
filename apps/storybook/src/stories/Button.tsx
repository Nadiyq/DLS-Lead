import React from 'react';
import './button.css';
export { Plus as PlusIcon } from 'lucide-react';

export type ButtonVariant = 'filled' | 'outline' | 'soft' | 'dotted' | 'ghost' | 'link';
export type ButtonIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'm' | 's';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
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
        {icon && <span className="dls-button__icon">{icon}</span>}
        {!iconOnly && children}
        {iconEnd && <span className="dls-button__icon-end">{iconEnd}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
