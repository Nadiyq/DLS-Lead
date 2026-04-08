import React from 'react';
import { CalendarDay } from './CalendarDay';
import { ListItem } from '../list-item/ListItem';
import './calendar-periods.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface PeriodOption {
  /** Unique key */
  value: string;
  /** Display label */
  label: string;
  /** Start date for this period */
  startDate?: Date;
  /** End date for this period */
  endDate?: Date;
}

export interface CalendarPeriodsProps {
  /** Preset period options */
  periods: PeriodOption[];
  /** Currently selected period value */
  selectedPeriod?: string;
  /** Called when a period is selected */
  onPeriodChange?: (value: string, start?: Date, end?: Date) => void;
  /** Range start date (for custom selection) */
  startDate?: Date | null;
  /** Range end date */
  endDate?: Date | null;
  /** Called when date range changes via calendar click */
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  /** Today override */
  today?: Date;
  /** First day of week: 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1;
  /** Footer content */
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

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const CalendarPeriods = React.forwardRef<HTMLDivElement, CalendarPeriodsProps>(
  (
    {
      periods,
      selectedPeriod,
      onPeriodChange,
      startDate,
      endDate,
      onRangeChange,
      today: todayProp,
      weekStartsOn = 0,
      footer,
      className,
    },
    ref,
  ) => {
    const today = todayProp || new Date();
    const [picking, setPicking] = React.useState<'start' | 'end'>('start');

    // Display two months: current and next based on startDate or today
    const baseYear = startDate?.getFullYear() ?? today.getFullYear();
    const baseMonth = startDate?.getMonth() ?? today.getMonth();
    const month1 = { year: baseYear, month: baseMonth };
    const month2Year = baseMonth === 11 ? baseYear + 1 : baseYear;
    const month2Month = baseMonth === 11 ? 0 : baseMonth + 1;
    const month2 = { year: month2Year, month: month2Month };

    const weekdays = weekStartsOn === 1 ? WEEKDAY_LABELS_MON : WEEKDAY_LABELS_SUN;

    const handleDayClick = (date: Date) => {
      if (picking === 'start') {
        onRangeChange?.(date, null);
        setPicking('end');
      } else {
        if (startDate && date < startDate) {
          onRangeChange?.(date, null);
          setPicking('end');
        } else {
          onRangeChange?.(startDate ?? null, date);
          setPicking('start');
        }
      }
    };

    const handlePeriodClick = (period: PeriodOption) => {
      onPeriodChange?.(period.value, period.startDate, period.endDate);
      setPicking('start');
    };

    const renderMonthGrid = (year: number, month: number) => {
      const days = getCalendarDays(year, month, weekStartsOn);
      return (
        <div className="dls-calendar-periods__month">
          <div className="dls-calendar-periods__month-header">
            <span className="dls-calendar-periods__month-title">
              {MONTH_NAMES[month]} {year}
            </span>
          </div>
          <div className="dls-calendar-periods__grid">
            {days.map(({ date, outside }, i) => {
              const isStart = startDate ? isSameDay(date, startDate) : false;
              const isEnd = endDate ? isSameDay(date, endDate) : false;
              const inRange = isInRange(date, startDate ?? null, endDate ?? null);

              return (
                <CalendarDay
                  key={i}
                  label={date.getDate()}
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
        className={['dls-calendar-periods', className].filter(Boolean).join(' ')}
      >
        {/* Sidebar — period presets */}
        <div className="dls-calendar-periods__sidebar">
          {periods.map(period => (
            <ListItem
              key={period.value}
              type="text"
              text={period.label}
              selected={selectedPeriod === period.value}
              onClick={() => handlePeriodClick(period)}
            />
          ))}
        </div>

        {/* Right — calendars */}
        <div className="dls-calendar-periods__right">
          <div className="dls-calendar-periods__dates">
            {/* Shared weekday header */}
            <div className="dls-calendar-periods__weekdays">
              {weekdays.map(wd => (
                <span key={wd} className="dls-calendar-periods__weekday">{wd}</span>
              ))}
            </div>

            {renderMonthGrid(month1.year, month1.month)}
            {renderMonthGrid(month2.year, month2.month)}
          </div>

          {footer && (
            <div className="dls-calendar-periods__footer">
              <div className="dls-calendar-periods__separator" />
              <div className="dls-calendar-periods__actions">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

CalendarPeriods.displayName = 'CalendarPeriods';
