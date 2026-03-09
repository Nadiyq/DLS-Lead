import React from 'react';
import './list-item.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ListItemType =
  | 'text'
  | 'label'
  | 'with-slots'
  | 'two-line'
  | 'two-line-slots'
  | 'buttons'
  | 'search'
  | 'empty-state'
  | 'chips'
  | 'divider';

export interface ListItemProps {
  /** Item type */
  type?: ListItemType;
  /** Primary text */
  text?: string;
  /** Secondary line text (two-line types) */
  secondaryText?: string;
  /** Secondary line custom content (two-line types) */
  secondaryContent?: React.ReactNode;
  /** Leading icon */
  iconStart?: React.ReactNode;
  /** Trailing icon */
  iconEnd?: React.ReactNode;
  /** Left slot content */
  slotLeft?: React.ReactNode;
  /** Right slot content */
  slotRight?: React.ReactNode;
  /** Children — for buttons, chips, search types */
  children?: React.ReactNode;
  /** Disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      type = 'text',
      text,
      secondaryText,
      secondaryContent,
      iconStart,
      iconEnd,
      slotLeft,
      slotRight,
      children,
      disabled,
      onClick,
      className,
    },
    ref,
  ) => {
    const isInteractive = type !== 'divider' && type !== 'label' && type !== 'empty-state';
    const Tag = isInteractive ? 'button' : 'div';

    const renderContent = () => {
      switch (type) {
        case 'divider':
          return <div className="dls-list-item__divider" />;

        case 'empty-state':
          return <span className="dls-list-item__empty">{text}</span>;

        case 'label':
          return <span className="dls-list-item__label">{text}</span>;

        case 'buttons':
          return <div className="dls-list-item__buttons">{children}</div>;

        case 'chips':
          return <div className="dls-list-item__chips">{children}</div>;

        case 'search':
          return <div className="dls-list-item__search">{children}</div>;

        case 'two-line':
          return (
            <div className="dls-list-item__two-line">
              <span className="dls-list-item__primary">{text}</span>
              {secondaryContent || (
                <span className="dls-list-item__secondary">{secondaryText}</span>
              )}
            </div>
          );

        case 'two-line-slots':
          return (
            <>
              {iconStart && <span className="dls-list-item__icon">{iconStart}</span>}
              {slotLeft && <span className="dls-list-item__slot">{slotLeft}</span>}
              <div className="dls-list-item__two-line">
                <span className="dls-list-item__primary">{text}</span>
                {secondaryContent || (
                  <span className="dls-list-item__secondary">{secondaryText}</span>
                )}
              </div>
              {slotRight && <span className="dls-list-item__slot">{slotRight}</span>}
              {iconEnd && <span className="dls-list-item__icon">{iconEnd}</span>}
            </>
          );

        case 'with-slots':
          return (
            <>
              {iconStart && <span className="dls-list-item__icon">{iconStart}</span>}
              {slotLeft && <span className="dls-list-item__slot">{slotLeft}</span>}
              <span className="dls-list-item__text">{text}</span>
              {slotRight && <span className="dls-list-item__slot">{slotRight}</span>}
              {iconEnd && <span className="dls-list-item__icon">{iconEnd}</span>}
            </>
          );

        case 'text':
        default:
          return <span className="dls-list-item__text">{text}</span>;
      }
    };

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLDivElement>}
        className={['dls-list-item', className].filter(Boolean).join(' ')}
        data-type={type}
        disabled={isInteractive ? disabled : undefined}
        onClick={isInteractive ? onClick : undefined}
        type={isInteractive ? 'button' : undefined}
      >
        {renderContent()}
      </Tag>
    );
  },
);

ListItem.displayName = 'ListItem';
