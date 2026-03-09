import React from 'react';
import './badge.css';

export type BadgeVariant = 'outline' | 'soft' | 'filled' | 'ghost';
export type BadgeIntent = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'm' | 's' | 'xs';

export interface BadgeProps {
  variant?: BadgeVariant;
  intent?: BadgeIntent;
  size?: BadgeSize;
  /** Leading icon */
  iconStart?: React.ReactNode;
  /** Trailing icon */
  iconEnd?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'outline',
      intent = 'neutral',
      size = 'm',
      iconStart,
      iconEnd,
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={['dls-badge', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      {...props}
    >
      {variant === 'ghost' && <span className="dls-badge__dot" />}
      {iconStart && <span className="dls-badge__icon">{iconStart}</span>}
      <span>{children}</span>
      {iconEnd && <span className="dls-badge__icon">{iconEnd}</span>}
    </span>
  ),
);

Badge.displayName = 'Badge';
