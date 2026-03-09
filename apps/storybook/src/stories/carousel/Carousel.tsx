import React from 'react';
import { CarouselArrow } from './CarouselArrow';
import { CarouselDots } from './CarouselDots';
import './carousel.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselProps {
  /** Slide elements */
  children: React.ReactNode;
  /** Layout direction */
  orientation?: CarouselOrientation;
  /** Show "Slide X of Y" label */
  showLabel?: boolean;
  /** Show pagination dots */
  showDots?: boolean;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Controlled current index */
  current?: number;
  /** Called when slide changes */
  onSlideChange?: (index: number) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      orientation = 'horizontal',
      showLabel = true,
      showDots = true,
      showArrows = true,
      current: currentProp,
      onSlideChange,
      className,
    },
    ref,
  ) => {
    const slides = React.Children.toArray(children);
    const total = slides.length;

    const [internalIndex, setInternalIndex] = React.useState(0);
    const current = currentProp ?? internalIndex;

    const goTo = (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      setInternalIndex(clamped);
      onSlideChange?.(clamped);
    };

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    const isVertical = orientation === 'vertical';
    const prevDir = isVertical ? 'up' : 'left';
    const nextDir = isVertical ? 'down' : 'right';

    const translateProp = isVertical ? 'Y' : 'X';
    const trackStyle: React.CSSProperties = {
      transform: `translate${translateProp}(-${current * 100}%)`,
    };

    return (
      <div
        ref={ref}
        className={['dls-carousel', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        aria-roledescription="carousel"
        aria-label="Carousel"
      >
        <div className="dls-carousel__content">
          {showArrows && (
            <CarouselArrow
              direction={prevDir}
              disabled={current === 0}
              onClick={prev}
            />
          )}

          <div className="dls-carousel__viewport">
            <div className="dls-carousel__track" style={trackStyle}>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${total}`}
                  style={{ flex: '0 0 100%' }}
                >
                  {slide}
                </div>
              ))}
            </div>
          </div>

          {showArrows && (
            <CarouselArrow
              direction={nextDir}
              disabled={current === total - 1}
              onClick={next}
            />
          )}
        </div>

        {(showLabel || showDots) && (
          <div className="dls-carousel__pagination">
            {showLabel && (
              <span className="dls-carousel__slide-label">
                Slide {current + 1} of {total}
              </span>
            )}
            {showDots && (
              <CarouselDots total={total} current={current} onDotClick={goTo} />
            )}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';
