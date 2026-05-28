import React from 'react';
import './badge.css';

export type BadgeVariant = 'outline' | 'soft' | 'filled' | 'ghost';
export type BadgeIntent = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'm' | 's' | 'xs';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual treatment for the status label. */
  variant?: BadgeVariant;
  /** Semantic intent that controls color tokens. */
  intent?: BadgeIntent;
  /** Badge height, typography, padding, and icon slot size. */
  size?: BadgeSize;
  /** Show the ghost status dot. Only applies when variant="ghost". */
  dot?: boolean;
  /** Optional leading icon. Use lucide-react icons. */
  iconStart?: React.ReactNode;
  /** Optional trailing icon. Use lucide-react icons. */
  iconEnd?: React.ReactNode;
  /** Visible badge label. */
  children: React.ReactNode;
  /** Additional class name for the root badge. */
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'outline',
      intent = 'neutral',
      size = 'm',
      dot = true,
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
      {variant === 'ghost' && dot && <span className="dls-badge__dot" aria-hidden="true" />}
      {iconStart && <span className="dls-badge__icon" aria-hidden="true">{iconStart}</span>}
      <span>{children}</span>
      {iconEnd && <span className="dls-badge__icon" aria-hidden="true">{iconEnd}</span>}
    </span>
  ),
);

Badge.displayName = 'Badge';
