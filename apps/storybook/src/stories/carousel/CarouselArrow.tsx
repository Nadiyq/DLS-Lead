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
   Arrow icons — one per direction (no CSS rotation needed)
   --------------------------------------------------------------------------- */

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33 8H12.67M8.67 4L12.67 8L8.67 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.67 8H3.33M7.33 4L3.33 8L7.33 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12.67V3.33M4 7.33L8 3.33L12 7.33" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.33V12.67M4 8.67L8 12.67L12 8.67" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ARROW_ICONS: Record<string, React.FC> = {
  right: ArrowRight,
  left: ArrowLeft,
  up: ArrowUp,
  down: ArrowDown,
};

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
        {children ?? React.createElement(ARROW_ICONS[direction] ?? ArrowRight)}
      </button>
    );
  },
);

CarouselArrow.displayName = 'CarouselArrow';
