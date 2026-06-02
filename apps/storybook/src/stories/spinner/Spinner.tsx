import React from 'react';
import { LoaderCircle as LoaderCircleIcon } from 'lucide-react';
import './spinner.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SpinnerSize = '12' | '16' | '20' | '24' | '32';

export interface SpinnerProps {
  /** Size of the spinner in pixels */
  size?: SpinnerSize;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Stroke width per size (matches Figma)
   --------------------------------------------------------------------------- */

const strokeWidths: Record<SpinnerSize, number> = {
  '12': 1,
  '16': 1.33,
  '20': 1.67,
  '24': 2,
  '32': 2,
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = '24',
      'aria-label': ariaLabel = 'Loading',
      className,
    },
    ref,
  ) => {
    const sw = strokeWidths[size];

    return (
      <div
        ref={ref}
        className={['dls-spinner', className].filter(Boolean).join(' ')}
        data-size={size}
        role="status"
        aria-label={ariaLabel}
      >
        <LoaderCircleIcon strokeWidth={sw} aria-hidden="true" />
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';
