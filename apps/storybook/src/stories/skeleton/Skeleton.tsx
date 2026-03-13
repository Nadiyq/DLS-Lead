import React from 'react';
import './skeleton.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SkeletonType = 'regular' | 'card' | 'text';

export interface SkeletonProps {
  /** Skeleton layout type */
  type?: SkeletonType;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ type = 'regular', className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-skeleton', className].filter(Boolean).join(' ')}
        data-type={type}
        aria-hidden="true"
      >
        {type === 'regular' && (
          <>
            <div className="dls-skeleton__avatar" />
            <div className="dls-skeleton__lines">
              <div className="dls-skeleton__line" />
              <div className="dls-skeleton__line" />
            </div>
          </>
        )}

        {type === 'card' && (
          <>
            <div className="dls-skeleton__lines">
              <div className="dls-skeleton__line" />
              <div className="dls-skeleton__line" />
            </div>
            <div className="dls-skeleton__image" />
          </>
        )}

        {type === 'text' && (
          <div className="dls-skeleton__lines">
            <div className="dls-skeleton__line" />
            <div className="dls-skeleton__line" />
          </div>
        )}
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';
