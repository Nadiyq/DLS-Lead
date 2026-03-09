import React from 'react';
import './calendar-day.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CalendarDayState = 'normal' | 'today' | 'selected' | 'highlight' | 'disabled';

export interface CalendarDayProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Display label (day number, month name, or year) */
  label: string | number;
  /** Whether this is today */
  today?: boolean;
  /** Whether this cell is selected */
  selected?: boolean;
  /** Whether this cell is highlighted (range) */
  highlight?: boolean;
  /** Whether this cell is outside the current month */
  outside?: boolean;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CalendarDay = React.forwardRef<HTMLButtonElement, CalendarDayProps>(
  (
    {
      label,
      today,
      selected,
      highlight,
      outside,
      disabled,
      className,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={['dls-calendar-day', className].filter(Boolean).join(' ')}
        disabled={disabled}
        data-today={today || undefined}
        data-selected={selected || undefined}
        data-highlight={highlight || undefined}
        data-outside={outside || undefined}
        {...buttonProps}
      >
        {label}
      </button>
    );
  },
);

CalendarDay.displayName = 'CalendarDay';
