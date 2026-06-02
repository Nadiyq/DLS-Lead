import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
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
   Stroke width per size (matches Figma)
   --------------------------------------------------------------------------- */

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
        <CheckIcon strokeWidth={STROKE_BY_SIZE[size]} aria-hidden="true" />
      </div>
    );
  },
);

Checkmark.displayName = 'Checkmark';
