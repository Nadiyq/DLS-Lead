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

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual type: general information or validation/error message. */
  type?: TooltipType;
  /** Arrow orientation relative to the tooltip body. */
  orientation?: TooltipOrientation;
  /** Tooltip text. */
  text: string;
  /** Optional trailing content, such as a Kbd shortcut. */
  slotContent?: React.ReactNode;
  /** Additional class name for the root tooltip. */
  className?: string;
}

/* ---------------------------------------------------------------------------
   Arrow - 12x8 decorative triangle, styled in CSS
   --------------------------------------------------------------------------- */

const Arrow = () => <span className="dls-tooltip__arrow" aria-hidden="true" />;

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
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-tooltip', className].filter(Boolean).join(' ')}
        {...props}
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
