import React from 'react';
import './item.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ItemType = 'regular' | 'outline' | 'muted';

export interface ItemProps {
  /** Visual type */
  type?: ItemType;
  /** Leading media slot — icon-shape, avatar, or image */
  media?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Additional content below title/description */
  innerContent?: React.ReactNode;
  /** Trailing controls — buttons, icons, badges */
  controls?: React.ReactNode;
  /** Whether the item is interactive (clickable) */
  interactive?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      type = 'regular',
      media,
      title,
      description,
      innerContent,
      controls,
      interactive = false,
      disabled,
      onClick,
      className,
    },
    ref,
  ) => {
    const showText = title || description;
    const showContent = showText || innerContent;
    const Tag = interactive ? 'button' : 'div';

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLDivElement>}
        className={['dls-item', className].filter(Boolean).join(' ')}
        data-type={type}
        data-interactive={interactive ? undefined : 'false'}
        disabled={interactive ? disabled : undefined}
        onClick={interactive ? onClick : undefined}
        type={interactive ? 'button' : undefined}
      >
        {media && <div className="dls-item__media">{media}</div>}

        {showContent && (
          <div className="dls-item__content">
            {showText && (
              <div className="dls-item__text">
                {title && <div className="dls-item__title">{title}</div>}
                {description && (
                  <div className="dls-item__description">{description}</div>
                )}
              </div>
            )}
            {innerContent}
          </div>
        )}

        {controls && <div className="dls-item__controls">{controls}</div>}
      </Tag>
    );
  },
);

Item.displayName = 'Item';
