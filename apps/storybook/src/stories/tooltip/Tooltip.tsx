import React from 'react';
import './tooltip.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TooltipType = 'general' | 'error';
export type TooltipOrientation =
  | 'top-center' | 'top-left' | 'top-right'
  | 'bottom-center' | 'bottom-left' | 'bottom-right'
  | 'left' | 'right';

export interface TooltipProps {
  /** Visual type */
  type?: TooltipType;
  /** Arrow orientation relative to the tooltip body */
  orientation?: TooltipOrientation;
  /** Tooltip text */
  text: string;
  /** Optional trailing content (e.g. Kbd shortcut) */
  slotContent?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Arrow SVG — 12×8 triangle
   --------------------------------------------------------------------------- */

const Arrow = () => (
  <svg
    className="dls-tooltip__arrow"
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path className="dls-tooltip__arrow-stroke" d="M0 0L6 8L12 0H0Z" />
    <path className="dls-tooltip__arrow-fill" d="M1 0L6 6.5L11 0H1Z" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      type = 'general',
      orientation = 'top-center',
      text,
      slotContent,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-tooltip', className].filter(Boolean).join(' ')}
        data-type={type !== 'general' ? type : undefined}
        data-orientation={orientation}
        role="tooltip"
      >
        <div className="dls-tooltip__body">
          <span className="dls-tooltip__text">{text}</span>
          {slotContent}
        </div>
        <Arrow />
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';
