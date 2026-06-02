import React from 'react';
import {
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
} from 'lucide-react';
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
   Direction → lucide-react icon map
   --------------------------------------------------------------------------- */

const ARROW_ICONS: Record<string, React.FC> = {
  right: ArrowRightIcon,
  left: ArrowLeftIcon,
  up: ArrowUpIcon,
  down: ArrowDownIcon,
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CarouselArrow = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ direction = 'right', className, children, ...rest }, ref) => {
    const Icon = ARROW_ICONS[direction] ?? ArrowRightIcon;

    return (
      <button
        ref={ref}
        type="button"
        className={['dls-carousel-arrow', className].filter(Boolean).join(' ')}
        data-direction={direction}
        aria-label={`Go ${direction}`}
        {...rest}
      >
        {children ?? <Icon aria-hidden="true" />}
      </button>
    );
  },
);

CarouselArrow.displayName = 'CarouselArrow';
