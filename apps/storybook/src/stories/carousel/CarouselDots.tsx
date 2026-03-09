import React from 'react';
import './carousel-dots.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface CarouselDotsProps {
  /** Total number of dots */
  total: number;
  /** Index of the current/active dot (0-based) */
  current?: number;
  /** Called when a dot is clicked */
  onDotClick?: (index: number) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ total, current = 0, onDotClick, className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-carousel-dots', className].filter(Boolean).join(' ')}
        role="tablist"
        aria-label="Slide navigation"
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            className="dls-carousel-dot"
            data-current={i === current ? '' : undefined}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onDotClick?.(i)}
          />
        ))}
      </div>
    );
  },
);

CarouselDots.displayName = 'CarouselDots';
