import React from 'react';
import { CalendarDay } from './CalendarDay';
import './calendar-range.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CalendarRangeLayout = 'horizontal' | 'vertical';

export interface CalendarRangeProps {
  /** Range start date */
  startDate?: Date | null;
  /** Range end date */
  endDate?: Date | null;
  /** Called when range changes */
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  /** Today override */
  today?: Date;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
  /** Layout */
  layout?: CalendarRangeLayout;
  /** First day of the week: 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
  /** Footer content (e.g. action buttons) */
  footer?: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAY_LABELS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const d = date.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d > s && d < e;
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
  return false;
}

function getCalendarDays(year: number, month: number, weekStartsOn: 0 | 1) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const offset = (firstDay - weekStartsOn + 7) % 7;
  const days: { date: Date; outside: boolean }[] = [];

  for (let i = offset - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), outside: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), outside: false });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), outside: true });
  }

  return days;
}

function addMonths(year: number, month: number, delta: number) {
  let m = month + delta;
  let y = year;
  while (m < 0) { m += 12; y--; }
  while (m > 11) { m -= 12; y++; }
  return { year: y, month: m };
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CalendarRange = React.forwardRef<HTMLDivElement, CalendarRangeProps>(
  (
    {
      startDate,
      endDate,
      onRangeChange,
      today: todayProp,
      minDate,
      maxDate,
      layout = 'horizontal',
      weekStartsOn = 0,
      footer,
      className,
    },
    ref,
  ) => {
    const today = todayProp || new Date();
    const [leftYear, setLeftYear] = React.useState(startDate?.getFullYear() ?? today.getFullYear());
    const [leftMonth, setLeftMonth] = React.useState(startDate?.getMonth() ?? today.getMonth());

    // Right panel is always the next month
    const right = addMonths(leftYear, leftMonth, 1);

    const [picking, setPicking] = React.useState<'start' | 'end'>('start');

    const navigateLeft = (delta: number) => {
      const next = addMonths(leftYear, leftMonth, delta);
      setLeftYear(next.year);
      setLeftMonth(next.month);
    };

    const handleDayClick = (date: Date) => {
      if (isDateDisabled(date, minDate, maxDate)) return;

      if (picking === 'start') {
        onRangeChange?.(date, null);
        setPicking('end');
      } else {
        if (startDate && date < startDate) {
          // Clicked before start — restart
          onRangeChange?.(date, null);
          setPicking('end');
        } else {
          onRangeChange?.(startDate ?? null, date);
          setPicking('start');
        }
      }
    };

    const weekdays = weekStartsOn === 1 ? WEEKDAY_LABELS_MON : WEEKDAY_LABELS_SUN;

    const renderMonth = (year: number, month: number, showPrev: boolean, showNext: boolean) => {
      const days = getCalendarDays(year, month, weekStartsOn);

      return (
        <div className="dls-calendar-range__month">
          <div className="dls-calendar-range__header">
            <button
              type="button"
              className="dls-calendar-range__nav"
              data-hidden={!showPrev || undefined}
              disabled={!showPrev}
              onClick={() => navigateLeft(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <span className="dls-calendar-range__month-title">
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              className="dls-calendar-range__nav"
              data-hidden={!showNext || undefined}
              disabled={!showNext}
              onClick={() => navigateLeft(1)}
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="dls-calendar-range__weekdays">
            {weekdays.map(wd => (
              <span key={wd} className="dls-calendar-range__weekday">{wd}</span>
            ))}
          </div>

          <div className="dls-calendar-range__grid">
            {days.map(({ date, outside }, i) => {
              const isStart = startDate ? isSameDay(date, startDate) : false;
              const isEnd = endDate ? isSameDay(date, endDate) : false;
              const inRange = isInRange(date, startDate ?? null, endDate ?? null);

              return (
                <CalendarDay
                  key={i}
                  label={date.getDate()}
                  disabled={isDateDisabled(date, minDate, maxDate)}
                  outside={outside}
                  today={isSameDay(date, today)}
                  selected={isStart || isEnd}
                  highlight={inRange}
                  onClick={() => handleDayClick(date)}
                />
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={['dls-calendar-range', className].filter(Boolean).join(' ')}
        data-layout={layout}
      >
        <div className="dls-calendar-range__panels">
          {renderMonth(leftYear, leftMonth, true, false)}
          {renderMonth(right.year, right.month, false, true)}
        </div>

        {footer && (
          <div className="dls-calendar-range__footer">
            <div className="dls-calendar-range__separator" />
            <div className="dls-calendar-range__actions">
              {footer}
            </div>
          </div>
        )}
      </div>
    );
  },
);

CalendarRange.displayName = 'CalendarRange';
