# Calendar

Category: input / date picker
React: <Calendar>
Spec: specs/components/calendar.md
TSX: apps/storybook/src/stories/calendar/Calendar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-calendar--docs
Figma day button: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=143-11729
Figma calendar: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=143-11772
Figma footer: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6597-19628

--------------------------------------------
## State implementation contract

Overlay state model for day cells. Day buttons are
transparent surfaces; hover uses overlay token.

- Day hover: bg → --dls-state-hover-overlay
- Day today: bg → --dls-color-intent-primary-subtle,
  border → --dls-color-intent-primary-border
- Day selected: bg → --dls-color-intent-neutral-base,
  text → --dls-color-intent-neutral-on-base
- Day in-range: bg → --dls-state-hover-overlay,
  no radius
- Day disabled: text → --dls-color-text-disabled
- Focus-visible: ring → --dls-state-focus-ring-color
--------------------------------------------

## Purpose
Date picker panel supporting single date, date range
highlighting, and min/max constraints. Three views:
date grid (7×6), month picker (3×4), year picker (4×4).
Header navigates months/years/year-ranges. Used internally
by DateInput and CalendarRange.

## Use when
- Date selection in forms.
- Calendar dropdown in DateInput.
- Range selection in CalendarRange.
- Standalone date picker.

## Do NOT use for
- Date range with two panels → use CalendarRange.
- Date text input only → use DateInput.
- Time-only selection → use time picker components.

## Figma → Code mapping

### Figma component set: day (143:11729)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| state          | —                | normal/today/hover/highlight/selected/disabled. CSS data attrs + :hover/:disabled in code. |
| date           | label (internal) | Day number text. In code, auto-generated from date grid. |

### Figma component: calendar (143:11772)
Composed view — not a component set. Shows header + weekdays
+ day grid. In code, <Calendar> renders all views internally.

### Figma component set: footer (6597:19628)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| type           | —                | "basic" / "range". In code, footer is not a separate component — actions are part of consuming DateInput/CalendarRange. |
| timePicker     | —                | boolean. Time picker is a future feature. |
| actions        | —                | boolean. Cancel/Confirm buttons. |

### Code-only props — Calendar
| React prop       | Notes |
|------------------|-------|
| value            | Date, optional. Selected date. |
| valueEnd         | Date, optional. Range end date. |
| onSelect         | (date: Date) => void, optional. |
| month            | Date, optional. Controlled displayed month. |
| onMonthChange    | (date: Date) => void, optional. |
| min              | Date, optional. Minimum selectable date. |
| max              | Date, optional. Maximum selectable date. |
| view             | "date" | "month" | "year", optional. |
| onViewChange     | (view: CalendarView) => void, optional. |
| className        | string, optional. |

Notes:
- Figma has three separate component sets (day, calendar,
  footer). In code, Calendar is a single component that
  renders day cells internally. Footer/actions are handled
  by consuming components (DateInput, CalendarRange).
- CalendarDay exists as a separate exported sub-component
  but Calendar renders its own internal day cells.
- Navigation icons: lucide-react ChevronLeft/ChevronRight.

## Anatomy
1. Root — <div class="dls-calendar">, panel container
   with border, radius, shadow.
2. Header — nav arrows (ChevronLeft/Right) + title button
   (month/year label, clickable to change view).
3. Weekday row — 7 column headers (Sun–Sat).
4. Day grid — 7×6 grid of day buttons. data-today,
   data-selected, data-in-range, data-outside attributes.
5. Month grid — 3×4 grid of month cells (month view).
6. Year grid — 4×4 grid of year cells (year view).

## Props / API
See code-only props table above.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-calendar (panel radius)
- --dls-radius-component-calendar-day (day/month/year cell radius)
- --dls-radius-component-button (nav button radius)

L2 semantic tokens:
- --dls-color-surface-base (panel bg)
- --dls-color-border-subtle (panel border)
- --dls-color-overlay-scrim (panel shadow)
- --dls-color-text-primary (day text)
- --dls-color-text-secondary (weekday headers, title)
- --dls-color-text-disabled (disabled/outside days)
- --dls-color-intent-primary-subtle (today bg)
- --dls-color-intent-primary-border (today border)
- --dls-color-intent-primary-text (today text)
- --dls-color-intent-neutral-base (selected bg)
- --dls-color-intent-neutral-on-base (selected text)
- --dls-color-intent-neutral-text (default day text)

L3 state tokens:
- --dls-state-hover-overlay (day hover, in-range)
- --dls-state-pressed-overlay (nav pressed)
- --dls-state-focus-ring-color (focus ring)

## States

### Figma representation
- day: normal / today / hover / highlight / selected / disabled
- calendar: composed view of header + grid

### Code implementation
- :hover:not(:disabled):not([data-selected]) — overlay bg.
- [data-today]:not([data-selected]) — primary subtle + border.
- [data-selected] — neutral-base + on-base text.
- [data-in-range] — overlay bg, no radius, full width.
- [data-outside] — disabled text color.
- :disabled — disabled text, no pointer events.
- :focus-visible — focus ring, z-index for layering.

## Accessibility contract
- Day cells are native <button> with aria-label (full
  date string) and aria-pressed for selected.
- Nav arrows are native <button> with aria-label
  (Previous/Next month/year).
- Title is a <button> with aria-label for view switching.
- Weekday headers are <span> (presentational).
- Keyboard: standard button Tab/Enter/Space for all
  interactive cells.
- Icons have aria-hidden="true".

## Composition rules
- Calendar is self-contained. Renders all views internally.
- Used inside DateInput dropdown and CalendarRange.
- Footer (time picker + action buttons) is handled by
  consuming components, not by Calendar itself.
- CalendarDay is a separate exported component for
  standalone use but Calendar uses internal day cells.

## Known deviations
- No L4 color tokens for calendar in tokens.json. Uses
  semantic and intent tokens directly. Only radius tokens
  exist as L4.
  Severity: low.
- Footer (time picker, actions) exists as a Figma component
  (6597:19628) but is not a separate React component.
  Actions are handled by DateInput/CalendarRange consumers.
  Severity: low.

## Code example
<Calendar value={selectedDate} onSelect={setSelectedDate} />

<!-- With range highlighting -->
<Calendar
  value={rangeStart}
  valueEnd={rangeEnd}
  onSelect={handleSelect}
/>

<!-- With min/max constraints -->
<Calendar
  value={date}
  onSelect={setDate}
  min={new Date(2024, 0, 1)}
  max={new Date(2024, 11, 31)}
/>

## Cross-references
- CalendarDay (standalone day cell)
- CalendarRange (dual-panel range picker)
- CalendarPeriods (period selector)
- DateInput (single date input + dropdown)
- DateRangeInput (range input + dropdown)
- specs/components/calendar.md
