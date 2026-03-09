import React from 'react';
import './badge-number.css';

export type BadgeNumberVariant = 'filled' | 'soft' | 'outline';
export type BadgeNumberIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeNumberSize = 'm' | 's' | 'xs';

export interface BadgeNumberProps {
  /** The numeric value to display */
  value: number;
  /** Maximum value before showing "{max}+" */
  max?: number;
  variant?: BadgeNumberVariant;
  intent?: BadgeNumberIntent;
  size?: BadgeNumberSize;
  className?: string;
}

export const BadgeNumber = React.forwardRef<HTMLSpanElement, BadgeNumberProps>(
  (
    {
      value,
      max = 99,
      variant = 'filled',
      intent = 'danger',
      size = 'm',
      className,
      ...props
    },
    ref,
  ) => {
    const display = value > max ? `${max}+` : `${value}`;

    return (
      <span
        ref={ref}
        className={['dls-badge-number', className].filter(Boolean).join(' ')}
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        {...props}
      >
        {display}
      </span>
    );
  },
);

BadgeNumber.displayName = 'BadgeNumber';
