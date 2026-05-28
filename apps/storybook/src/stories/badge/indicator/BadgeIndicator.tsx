import React from 'react';
import './badge-indicator.css';

export type BadgeIndicatorIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeIndicatorSize = 'xs' | 's' | 'm' | 'l';

export interface BadgeIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Numeric value to display. Ignored at size "xs" (dot-only). */
  value?: number;
  /** Maximum value before showing "{max}+" */
  max?: number;
  /** Semantic intent that controls the filled indicator color */
  intent?: BadgeIndicatorIntent;
  /** Indicator dimensions and count typography */
  size?: BadgeIndicatorSize;
  /** Additional class name for the root indicator */
  className?: string;
}

export const BadgeIndicator = React.forwardRef<HTMLSpanElement, BadgeIndicatorProps>(
  (
    {
      value,
      max = 99,
      intent = 'danger',
      size = 'm',
      className,
      ...props
    },
    ref,
  ) => {
    const showValue = size !== 'xs' && value !== undefined;
    const display = showValue
      ? value > max ? `${max}+` : `${value}`
      : null;

    return (
      <span
        ref={ref}
        className={['dls-badge-indicator', className].filter(Boolean).join(' ')}
        data-intent={intent}
        data-size={size}
        {...props}
      >
        {display}
      </span>
    );
  },
);

BadgeIndicator.displayName = 'BadgeIndicator';
