import React from 'react';
import './card.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CardType = 'regular' | 'outline' | 'muted';

export interface CardProps {
  /** Visual type */
  type?: CardType;
  /** Header icon (16×16) */
  headerIcon?: React.ReactNode;
  /** Custom header content (slot) */
  headerContent?: React.ReactNode;
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Custom content placed below title/description (slot) */
  children?: React.ReactNode;
  /** Footer content (slot) */
  footer?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      type = 'regular',
      headerIcon,
      headerContent,
      title,
      description,
      children,
      footer,
      className,
    },
    ref,
  ) => {
    const showHeader = headerIcon || headerContent;
    const showContent = title || description || children;

    return (
      <div
        ref={ref}
        className={['dls-card', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {showHeader && (
          <div className="dls-card__header">
            {headerIcon && (
              <span className="dls-card__header-icon">{headerIcon}</span>
            )}
            {headerContent && (
              <div className="dls-card__header-content">{headerContent}</div>
            )}
          </div>
        )}

        {showContent && (
          <div className="dls-card__content">
            {title && <div className="dls-card__title">{title}</div>}
            {description && <div className="dls-card__description">{description}</div>}
            {children}
          </div>
        )}

        {footer && (
          <div className="dls-card__footer">{footer}</div>
        )}
      </div>
    );
  },
);

Card.displayName = 'Card';
