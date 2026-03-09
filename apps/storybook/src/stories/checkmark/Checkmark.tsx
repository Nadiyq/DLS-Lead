import React from 'react';
import './checkmark.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CheckmarkSize = 'm' | 's' | 'xs';

export interface CheckmarkProps {
  /** Size */
  size?: CheckmarkSize;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Default check icon
   --------------------------------------------------------------------------- */

const CheckIcon = ({ strokeWidth }: { strokeWidth: number }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 13L9 17L19 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const STROKE_BY_SIZE: Record<CheckmarkSize, number> = {
  m: 2,
  s: 1.33,
  xs: 1,
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Checkmark = React.forwardRef<HTMLDivElement, CheckmarkProps>(
  ({ size = 'm', className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-checkmark', className].filter(Boolean).join(' ')}
        data-size={size}
      >
        <CheckIcon strokeWidth={STROKE_BY_SIZE[size]} />
      </div>
    );
  },
);

Checkmark.displayName = 'Checkmark';
