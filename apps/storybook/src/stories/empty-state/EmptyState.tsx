import React from 'react';
import './empty-state.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type EmptyStateVariant = 'borderless' | 'bordered';

export interface EmptyStateProps {
  /** Visual variant */
  variant?: EmptyStateVariant;
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
      variant = 'borderless',
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
        data-variant={variant}
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
