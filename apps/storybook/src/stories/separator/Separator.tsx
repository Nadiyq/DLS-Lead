import React from 'react';
import './separator.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: SeparatorOrientation;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-separator', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        role="separator"
        aria-orientation={orientation}
      />
    );
  },
);

Separator.displayName = 'Separator';
