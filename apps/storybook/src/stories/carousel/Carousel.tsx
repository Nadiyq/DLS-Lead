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
  /** Number of items visible at once */
  visibleItems?: number;
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
   Constants
   --------------------------------------------------------------------------- */

const GAP = 12; // matches --dls-spacing-3

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      orientation = 'horizontal',
      visibleItems = 1,
      showLabel = false,
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
    const maxIndex = Math.max(0, total - visibleItems);

    const [internalIndex, setInternalIndex] = React.useState(0);
    const current = currentProp ?? internalIndex;

    const isVertical = orientation === 'vertical';

    const viewportRef = React.useRef<HTMLDivElement>(null);
    const [itemSize, setItemSize] = React.useState(0);

    React.useEffect(() => {
      if (!viewportRef.current) return;
      const firstSlide = viewportRef.current.querySelector('[aria-roledescription="slide"]');
      if (firstSlide) {
        const el = firstSlide as HTMLElement;
        setItemSize(isVertical ? el.offsetHeight : el.offsetWidth);
      }
    }, [isVertical, children]);

    const goTo = (index: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, index));
      setInternalIndex(clamped);
      onSlideChange?.(clamped);
    };

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);
    const prevDir = isVertical ? 'up' : 'left';
    const nextDir = isVertical ? 'down' : 'right';

    // Translate by one item + gap per step
    const offset = itemSize ? current * (itemSize + GAP) : 0;
    const translateProp = isVertical ? 'Y' : 'X';
    const trackStyle: React.CSSProperties = {
      transform: itemSize ? `translate${translateProp}(-${offset}px)` : undefined,
    };

    // Viewport size = visibleItems * itemSize + (visibleItems - 1) * gap
    const viewportSize = itemSize
      ? visibleItems * itemSize + (visibleItems - 1) * GAP
      : undefined;

    const viewportStyle: React.CSSProperties | undefined = viewportSize
      ? isVertical
        ? { height: viewportSize }
        : { width: viewportSize }
      : undefined;

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

          <div
            className="dls-carousel__viewport"
            ref={viewportRef}
            style={viewportStyle}
          >
            <div className="dls-carousel__track" style={trackStyle}>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${total}`}
                  className="dls-carousel__slide"
                >
                  {slide}
                </div>
              ))}
            </div>
          </div>

          {showArrows && (
            <CarouselArrow
              direction={nextDir}
              disabled={current >= maxIndex}
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
