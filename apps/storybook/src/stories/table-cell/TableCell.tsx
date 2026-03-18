import React from 'react';
import './table-cell.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TableCellAlign = 'left' | 'center' | 'right';

export type TableCellType =
  | 'text'
  | 'two-line'
  | 'badge'
  | 'trend'
  | 'button'
  | 'actions'
  | 'slot'
  | 'users-stacked'
  | 'credit-card';

export interface TableCellProps {
  /** Cell content type */
  type?: TableCellType;
  /** Text alignment */
  align?: TableCellAlign;
  /** Whether to include horizontal padding */
  padding?: boolean;
  /** Primary text content */
  text?: string;
  /** Secondary text (for two-line type) */
  secondaryText?: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Leading slot (checkbox, avatar, etc.) */
  slotLeft?: React.ReactNode;
  /** Trailing slot */
  slotRight?: React.ReactNode;
  /** Generic children (for badge, button, actions, slot types) */
  children?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>(
  (
    {
      type = 'text',
      align = 'left',
      padding = true,
      text,
      secondaryText,
      icon,
      slotLeft,
      slotRight,
      children,
      className,
    },
    ref,
  ) => {
    const isTextType = type === 'text';
    const isTwoLine = type === 'two-line';

    return (
      <div
        ref={ref}
        className={['dls-table-cell', className].filter(Boolean).join(' ')}
        data-type={type}
        data-align={align}
        data-padding={padding ? undefined : 'false'}
        role="cell"
      >
        {/* Text and two-line types render structured content */}
        {isTextType && (
          <>
            {slotLeft && <span className="dls-table-cell__slot">{slotLeft}</span>}
            {icon && <span className="dls-table-cell__icon">{icon}</span>}
            {text && <span className="dls-table-cell__text">{text}</span>}
            {slotRight && <span className="dls-table-cell__slot">{slotRight}</span>}
          </>
        )}

        {isTwoLine && (
          <>
            {slotLeft && <span className="dls-table-cell__slot">{slotLeft}</span>}
            <span className="dls-table-cell__text-group">
              {text && <span className="dls-table-cell__text">{text}</span>}
              {secondaryText && <span className="dls-table-cell__secondary">{secondaryText}</span>}
            </span>
          </>
        )}

        {/* All other types render children directly */}
        {!isTextType && !isTwoLine && children}
      </div>
    );
  },
);

TableCell.displayName = 'TableCell';
