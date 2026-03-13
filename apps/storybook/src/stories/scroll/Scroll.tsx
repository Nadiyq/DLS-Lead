import React from 'react';
import './scroll.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ScrollOrientation = 'vertical' | 'horizontal';

export interface ScrollProps {
  /** Scroll direction */
  orientation?: ScrollOrientation;
  /** Thumb size as a percentage (0–100) of the track */
  thumbSize?: number;
  /** Thumb position as a percentage (0–100) along the track */
  thumbPosition?: number;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      orientation = 'vertical',
      thumbSize = 50,
      thumbPosition = 0,
      className,
    },
    ref,
  ) => {
    const clampedSize = Math.max(5, Math.min(100, thumbSize));
    const maxPosition = 100 - clampedSize;
    const clampedPosition = Math.max(0, Math.min(maxPosition, thumbPosition));

    const isVertical = orientation === 'vertical';

    const thumbStyle: React.CSSProperties = isVertical
      ? { height: `${clampedSize}%`, marginTop: `${clampedPosition}%` }
      : { width: `${clampedSize}%`, marginLeft: `${clampedPosition}%` };

    return (
      <div
        ref={ref}
        className={['dls-scroll', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        role="scrollbar"
        aria-orientation={orientation}
        aria-valuenow={clampedPosition}
        aria-valuemin={0}
        aria-valuemax={maxPosition}
      >
        <div className="dls-scroll__thumb" style={thumbStyle} />
      </div>
    );
  },
);

Scroll.displayName = 'Scroll';
