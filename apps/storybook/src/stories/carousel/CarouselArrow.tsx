import React from 'react';
import './carousel-arrow.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CarouselArrowDirection = 'left' | 'right' | 'up' | 'down';

export interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Arrow direction */
  direction?: CarouselArrowDirection;
}

/* ---------------------------------------------------------------------------
   Default chevron icon (points right; rotated via CSS for other directions)
   --------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CarouselArrow = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ direction = 'right', className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={['dls-carousel-arrow', className].filter(Boolean).join(' ')}
        data-direction={direction}
        aria-label={`Go ${direction}`}
        {...rest}
      >
        {children ?? <ChevronIcon />}
      </button>
    );
  },
);

CarouselArrow.displayName = 'CarouselArrow';
