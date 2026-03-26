import React from 'react';
import './calendar.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CalendarView = 'date' | 'month' | 'year';

export interface CalendarProps {
  /** Currently selected date */
  value?: Date;
  /** For range mode: end date */
  valueEnd?: Date;
  /** Called when a date is selected */
  onSelect?: (date: Date) => void;
  /** Month being viewed (controlled) */
  month?: Date;
  /** Called when month changes via navigation */
  onMonthChange?: (date: Date) => void;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** View type: date grid, month picker, or year picker */
  view?: CalendarView;
  /** Called when view changes (e.g. clicking month title) */
  onViewChange?: (view: CalendarView) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_LABELS_SHORT = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Returns the start year for a 16-year range block containing the given year */
function getYearRangeStart(year: number): number {
  return Math.floor(year / 16) * 16;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarDays(year: number, month: number): { date: Date; outside: boolean }[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const days: { date: Date; outside: boolean }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), outside: true });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), outside: false });
  }

  // Next month leading days (fill to 42 = 6 rows)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), outside: true });
  }

  return days;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      valueEnd,
      onSelect,
      month: monthProp,
      onMonthChange,
      min,
      max,
      view: viewProp,
      onViewChange,
      className,
    },
    ref,
  ) => {
    const today = new Date();

    // Controlled vs uncontrolled view
    const [internalView, setInternalView] = React.useState<CalendarView>('date');
    const view = viewProp ?? internalView;
    const changeView = (v: CalendarView) => {
      if (!viewProp) setInternalView(v);
      onViewChange?.(v);
    };

    // Controlled vs uncontrolled month
    const [internalMonth, setInternalMonth] = React.useState<Date>(
      () => monthProp ?? value ?? today,
    );

    const displayDate = monthProp ?? internalMonth;
    const displayYear = displayDate.getFullYear();
    const displayMonth = displayDate.getMonth();

    const navigateMonth = (delta: number) => {
      let newMonth = displayMonth + delta;
      let newYear = displayYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      const next = new Date(newYear, newMonth, 1);
      if (!monthProp) setInternalMonth(next);
      onMonthChange?.(next);
    };

    const navigateYear = (delta: number) => {
      const next = new Date(displayYear + delta, displayMonth, 1);
      if (!monthProp) setInternalMonth(next);
      onMonthChange?.(next);
    };

    const navigateYearRange = (delta: number) => {
      const next = new Date(displayYear + delta * 16, displayMonth, 1);
      if (!monthProp) setInternalMonth(next);
      onMonthChange?.(next);
    };

    const isDisabled = (date: Date): boolean => {
      const d = stripTime(date);
      if (min && d < stripTime(min)) return true;
      if (max && d > stripTime(max)) return true;
      return false;
    };

    const isInRange = (date: Date): boolean => {
      if (!value || !valueEnd) return false;
      const d = stripTime(date);
      const start = stripTime(value);
      const end = stripTime(valueEnd);
      const rangeStart = start <= end ? start : end;
      const rangeEnd = start <= end ? end : start;
      return d > rangeStart && d < rangeEnd;
    };

    const handleDayClick = (date: Date) => {
      if (isDisabled(date)) return;
      onSelect?.(date);
    };

    const handleMonthClick = (monthIndex: number) => {
      const next = new Date(displayYear, monthIndex, 1);
      if (!monthProp) setInternalMonth(next);
      onMonthChange?.(next);
      changeView('date');
    };

    const handleYearClick = (year: number) => {
      const next = new Date(year, displayMonth, 1);
      if (!monthProp) setInternalMonth(next);
      onMonthChange?.(next);
      changeView('month');
    };

    /* ---- Date view ---- */
    if (view === 'date') {
      const days = getCalendarDays(displayYear, displayMonth);
      const titleText = `${MONTH_NAMES[displayMonth]} ${displayYear}`;

      return (
        <div
          ref={ref}
          className={['dls-calendar', className].filter(Boolean).join(' ')}
        >
          <div className="dls-calendar__header">
            <button
              type="button"
              className="dls-calendar__nav"
              onClick={() => navigateMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="dls-calendar__title"
              onClick={() => changeView('month')}
              aria-label="Select month"
            >
              {titleText}
            </button>
            <button
              type="button"
              className="dls-calendar__nav"
              onClick={() => navigateMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="dls-calendar__weekdays">
            {WEEKDAY_LABELS.map((wd) => (
              <span key={wd} className="dls-calendar__weekday">
                {wd}
              </span>
            ))}
          </div>

          <div className="dls-calendar__grid">
            {days.map(({ date, outside }, i) => {
              const isToday = isSameDay(date, today);
              const isSelected =
                (value ? isSameDay(date, value) : false) ||
                (valueEnd ? isSameDay(date, valueEnd) : false);
              const inRange = isInRange(date);
              const disabled = isDisabled(date);

              return (
                <button
                  key={i}
                  type="button"
                  className="dls-calendar__day"
                  disabled={disabled}
                  data-today={isToday || undefined}
                  data-selected={isSelected || undefined}
                  data-in-range={inRange || undefined}
                  data-outside={outside || undefined}
                  aria-label={date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  aria-pressed={isSelected || undefined}
                  onClick={() => handleDayClick(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ---- Month view ---- */
    if (view === 'month') {
      return (
        <div
          ref={ref}
          className={['dls-calendar', 'dls-calendar--month', className].filter(Boolean).join(' ')}
        >
          <div className="dls-calendar__header">
            <button
              type="button"
              className="dls-calendar__nav"
              onClick={() => navigateYear(-1)}
              aria-label="Previous year"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="dls-calendar__title"
              onClick={() => changeView('year')}
              aria-label="Select year"
            >
              {displayYear}
            </button>
            <button
              type="button"
              className="dls-calendar__nav"
              onClick={() => navigateYear(1)}
              aria-label="Next year"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="dls-calendar__month-grid">
            {MONTH_LABELS_SHORT.map((label, i) => {
              const isSelected = value
                ? value.getFullYear() === displayYear && value.getMonth() === i
                : false;
              return (
                <button
                  key={i}
                  type="button"
                  className="dls-calendar__month-cell"
                  data-selected={isSelected || undefined}
                  onClick={() => handleMonthClick(i)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ---- Year view ---- */
    const rangeStart = getYearRangeStart(displayYear);
    const rangeEnd = rangeStart + 15;
    const years = Array.from({ length: 16 }, (_, i) => rangeStart + i);

    return (
      <div
        ref={ref}
        className={['dls-calendar', 'dls-calendar--year', className].filter(Boolean).join(' ')}
      >
        <div className="dls-calendar__header">
          <button
            type="button"
            className="dls-calendar__nav"
            onClick={() => navigateYearRange(-1)}
            aria-label="Previous year range"
          >
            <ChevronLeft />
          </button>
          <span className="dls-calendar__title">{rangeStart}–{rangeEnd}</span>
          <button
            type="button"
            className="dls-calendar__nav"
            onClick={() => navigateYearRange(1)}
            aria-label="Next year range"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="dls-calendar__year-grid">
          {years.map((year) => {
            const isSelected = value ? value.getFullYear() === year : false;
            return (
              <button
                key={year}
                type="button"
                className="dls-calendar__year-cell"
                data-selected={isSelected || undefined}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
