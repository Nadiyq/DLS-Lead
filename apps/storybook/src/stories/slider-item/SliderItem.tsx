import React from 'react';
import './slider-item.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface SliderItemProps {
  /** Disabled state */
  disabled?: boolean;
  /** Current value (for aria) */
  value?: number;
  /** Min value (for aria) */
  min?: number;
  /** Max value (for aria) */
  max?: number;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const SliderItem = React.forwardRef<HTMLDivElement, SliderItemProps>(
  (
    {
      disabled = false,
      value,
      min,
      max,
      'aria-label': ariaLabel,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-slider-item', className].filter(Boolean).join(' ')}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? '' : undefined}
        tabIndex={disabled ? -1 : 0}
      />
    );
  },
);

SliderItem.displayName = 'SliderItem';
