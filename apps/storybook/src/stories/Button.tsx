import React from 'react';
import './button.css';

export type ButtonVariant = 'filled' | 'outline' | 'soft' | 'dotted' | 'ghost' | 'link';
export type ButtonIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'm' | 's';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  icon?: React.ReactNode;
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
      </button>
    );
  },
);

Button.displayName = 'Button';

export const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="3" x2="8" y2="13" />
    <line x1="3" y1="8" x2="13" y2="8" />
  </svg>
);
