import React from 'react';
import { CalendarDay } from './CalendarDay';
import './calendar.css';

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

export type CalendarView = 'date' | 'month' | 'year';

export interface CalendarProps {
  /** Currently selected date */
  value?: Date | null;
  /** Today's date override (defaults to new Date()) */
  today?: Date;
  /** Called when a date is selected */
  onSelect?: (date: Date) => void;
  /** Called when month/year changes */
  onMonthChange?: (year: number, month: number) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Dates to highlight (e.g. range) */
  highlightedDates?: Date[];
  /** Initial view */
  defaultView?: CalendarView;
  /** Controlled view */
  view?: CalendarView;
  /** Called when view changes */
  onViewChange?: (view: CalendarView) => void;
  /** First day of the week: 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
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

function getCalendarDays(year: number, month: number, weekStartsOn: 0 | 1) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const offset = (firstDay - weekStartsOn + 7) % 7;
  const days: { date: Date; outside: boolean }[] = [];

  // Previous month trailing days
  for (let i = offset - 1; i >= 0; i--) {
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

function getYearRange(year: number) {
  const start = Math.floor(year / 16) * 16;
  const years: number[] = [];
  for (let i = 0; i < 16; i++) years.push(start + i);
  return years;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      today: todayProp,
      onSelect,
      onMonthChange,
      minDate,
      maxDate,
      highlightedDates,
      defaultView = 'date',
      view: viewProp,
      onViewChange,
      weekStartsOn = 0,
      className,
    },
    ref,
  ) => {
    const today = todayProp || new Date();
    const [internalView, setInternalView] = React.useState<CalendarView>(defaultView);
    const currentView = viewProp ?? internalView;

    const setView = (v: CalendarView) => {
      if (!viewProp) setInternalView(v);
      onViewChange?.(v);
    };

    const [displayYear, setDisplayYear] = React.useState(value?.getFullYear() ?? today.getFullYear());
    const [displayMonth, setDisplayMonth] = React.useState(value?.getMonth() ?? today.getMonth());

    const highlightSet = React.useMemo(() => {
      if (!highlightedDates) return new Set<string>();
      return new Set(highlightedDates.map(d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`));
    }, [highlightedDates]);

    const isHighlighted = (date: Date) =>
      highlightSet.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

    const isDisabled = (date: Date) => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
      return false;
    };

    const navigateMonth = (delta: number) => {
      let newMonth = displayMonth + delta;
      let newYear = displayYear;
      if (newMonth < 0) { newMonth = 11; newYear--; }
      if (newMonth > 11) { newMonth = 0; newYear++; }
      setDisplayMonth(newMonth);
      setDisplayYear(newYear);
      onMonthChange?.(newYear, newMonth);
    };

    const navigateYear = (delta: number) => {
      setDisplayYear(y => y + delta);
    };

    const handleDayClick = (date: Date) => {
      if (isDisabled(date)) return;
      onSelect?.(date);
    };

    const handleMonthSelect = (month: number) => {
      setDisplayMonth(month);
      setView('date');
      onMonthChange?.(displayYear, month);
    };

    const handleYearSelect = (year: number) => {
      setDisplayYear(year);
      setView('month');
    };

    const handleTitleClick = () => {
      if (currentView === 'date') setView('month');
      else if (currentView === 'month') setView('year');
    };

    /* ----- Date view ----- */
    const renderDateView = () => {
      const days = getCalendarDays(displayYear, displayMonth, weekStartsOn);
      const weekdays = weekStartsOn === 1 ? WEEKDAY_LABELS_MON : WEEKDAY_LABELS_SUN;

      return (
        <>
          <div className="dls-calendar__weekdays">
            {weekdays.map(wd => (
              <span key={wd} className="dls-calendar__weekday">{wd}</span>
            ))}
          </div>
          <div className="dls-calendar__grid">
            {days.map(({ date, outside }, i) => (
              <CalendarDay
                key={i}
                label={date.getDate()}
                disabled={isDisabled(date)}
                outside={outside}
                today={isSameDay(date, today)}
                selected={value ? isSameDay(date, value) : false}
                highlight={isHighlighted(date)}
                onClick={() => handleDayClick(date)}
              />
            ))}
          </div>
        </>
      );
    };

    /* ----- Month view ----- */
    const renderMonthView = () => (
      <div className="dls-calendar__grid--months">
        {MONTH_NAMES.map((name, i) => (
          <CalendarDay
            key={i}
            label={name}
            selected={value ? value.getFullYear() === displayYear && value.getMonth() === i : false}
            onClick={() => handleMonthSelect(i)}
          />
        ))}
      </div>
    );

    /* ----- Year view ----- */
    const renderYearView = () => {
      const years = getYearRange(displayYear);
      return (
        <div className="dls-calendar__grid--years">
          {years.map(y => (
            <CalendarDay
              key={y}
              label={y}
              selected={value ? value.getFullYear() === y : false}
              onClick={() => handleYearSelect(y)}
            />
          ))}
        </div>
      );
    };

    /* ----- Header title text ----- */
    const titleText = currentView === 'date'
      ? `${MONTH_NAMES[displayMonth]} ${displayYear}`
      : currentView === 'month'
        ? `${displayYear}`
        : `${getYearRange(displayYear)[0]} – ${getYearRange(displayYear)[15]}`;

    /* ----- Navigation handlers ----- */
    const handlePrev = () => {
      if (currentView === 'date') navigateMonth(-1);
      else if (currentView === 'month') navigateYear(-1);
      else navigateYear(-16);
    };

    const handleNext = () => {
      if (currentView === 'date') navigateMonth(1);
      else if (currentView === 'month') navigateYear(1);
      else navigateYear(16);
    };

    return (
      <div
        ref={ref}
        className={['dls-calendar', className].filter(Boolean).join(' ')}
      >
        <div className="dls-calendar__header">
          <button type="button" className="dls-calendar__nav" onClick={handlePrev} aria-label="Previous">
            <ChevronLeft />
          </button>
          <span
            className="dls-calendar__title"
            role="button"
            tabIndex={0}
            onClick={handleTitleClick}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleTitleClick(); }}
          >
            {titleText}
          </span>
          <button type="button" className="dls-calendar__nav" onClick={handleNext} aria-label="Next">
            <ChevronRight />
          </button>
        </div>

        {currentView === 'date' && renderDateView()}
        {currentView === 'month' && renderMonthView()}
        {currentView === 'year' && renderYearView()}
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
