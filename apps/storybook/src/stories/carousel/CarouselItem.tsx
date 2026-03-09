import React from 'react';
import './carousel-item.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface CarouselItemProps {
  /** Slide content */
  children: React.ReactNode;
  /** Fixed width */
  width?: number | string;
  /** Fixed height */
  height?: number | string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ children, width, height, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-carousel-item', className].filter(Boolean).join(' ')}
        style={{ width, height }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
