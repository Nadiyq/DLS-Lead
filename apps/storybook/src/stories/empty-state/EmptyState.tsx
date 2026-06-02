import React from 'react';
import './empty-state.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface EmptyStateProps {
  /** Media slot — icon-shape, illustration, or any visual */
  media?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Action area — buttons, links, inputs */
  children?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      media,
      title,
      description,
      children,
      className,
    },
    ref,
  ) => {
    const showText = title || description;

    return (
      <div
        ref={ref}
        className={['dls-empty-state', className].filter(Boolean).join(' ')}
      >
        {media && <div className="dls-empty-state__media">{media}</div>}

        {showText && (
          <div className="dls-empty-state__text">
            {title && <div className="dls-empty-state__title">{title}</div>}
            {description && (
              <div className="dls-empty-state__description">{description}</div>
            )}
          </div>
        )}

        {children && (
          <div className="dls-empty-state__actions">{children}</div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
