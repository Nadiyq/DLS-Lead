# CalendarRange

Category: input / date range picker
React: <CalendarRange>
Spec: specs/components/calendar.md
TSX: apps/storybook/src/stories/calendar/CalendarRange.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-calendarrange--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6597-19819

--------------------------------------------
## State implementation contract

Overlay state model (delegated to CalendarDay cells).
CalendarRange itself has no interactive states — it
composes two Calendar month panels with shared range
selection logic.

- Day cells: delegated to CalendarDay component
- Nav arrows: overlay hover/pressed, focus ring
- Range highlight: CalendarDay highlight prop
--------------------------------------------

## Purpose
Dual-panel date range picker. Shows two consecutive months
side by side (horizontal) or stacked (vertical). Uses
CalendarDay for day cells, Dropdown for time fields, and
Tabs for AM/PM. Supports optional time picker and footer
action buttons.

## Use when
- Date range selection (check-in/check-out, start/end).
- Calendar dropdown in DateRangeInput.
- Booking or scheduling date spans.

## Do NOT use for
- Single date selection → use Calendar.
- Date text input → use DateInput or DateRangeInput.

## Figma → Code mapping

### Figma component: calendar-range (6597:19819)
Composed Figma component. Not a component set — shows two
month panels with day instances, optional footer.

### Code-only props
| React prop       | Notes |
|------------------|-------|
| startDate        | Date | null, optional. Range start. |
| endDate          | Date | null, optional. Range end. |
| onRangeChange    | (start, end) => void, optional. |
| today            | Date, optional. Today override. |
| minDate          | Date, optional. |
| maxDate          | Date, optional. |
| layout           | "horizontal" | "vertical", default "horizontal". |
| weekStartsOn     | 0 | 1, default 0 (Sunday). |
| showTimePicker   | boolean, default false. |
| hour             | string, default "09". |
| minute           | string, default "15". |
| period           | "AM" | "PM", default "AM". |
| onTimeChange     | (hour, minute, period) => void, optional. |
| footer           | ReactNode, optional. Action buttons. |
| className        | string, optional. |

Notes:
- Uses CalendarDay for all day cells (not internal cells).
- Uses Dropdown for hour/minute time fields.
- Uses Tabs for AM/PM period selector.
- Nav icons: lucide-react ChevronLeft/ChevronRight.
- Right panel is always leftMonth + 1.

## Anatomy
1. Root — <div class="dls-calendar-range">, panel container.
   data-layout="horizontal|vertical".
2. Panels wrapper — <div class="dls-calendar-range__panels">,
   side-by-side or stacked months.
3. Left month — header (nav prev + title + hidden next) +
   weekday row + 7×6 CalendarDay grid.
4. Right month — header (hidden prev + title + nav next) +
   weekday row + 7×6 CalendarDay grid.
5. Footer — separator + controls row.
6. Time picker — hour Dropdown : minute Dropdown + AM/PM Tabs.
7. Actions — consumer-provided footer ReactNode (buttons).

## Props / API
See code-only props table above.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-calendar (panel radius)
- --dls-radius-component-calendar-day (via CalendarDay)
- --dls-radius-component-button (nav button radius)

L2 semantic tokens:
- --dls-color-surface-base (panel bg)
- --dls-color-border-subtle (panel border)
- --dls-color-border-base (separator, footer)
- --dls-color-overlay-scrim (panel shadow)
- --dls-color-text-primary (nav icons, month title, colon)
- --dls-color-text-secondary (weekday headers)
- --dls-color-text-disabled (disabled nav)

L3 state tokens:
- --dls-state-hover-overlay (nav hover)
- --dls-state-pressed-overlay (nav pressed)
- --dls-state-focus-ring-color (nav/day focus)

Spacing:
- --dls-spacing-2, --dls-spacing-3, --dls-spacing-4

## States

### Code implementation
- Day cells: all states via CalendarDay (today, selected,
  highlight, outside, disabled, hover, focus).
- Nav buttons: hover → overlay, pressed → pressed-overlay,
  focus-visible → ring, disabled → text-disabled.
- Hidden nav buttons (inner arrows): visibility: hidden
  to maintain layout spacing.
- Range picking: two-click flow — first click sets start,
  second sets end. Click before start restarts.

## Accessibility contract
- Root is a <div> container.
- Each CalendarDay is a native <button> with label/today/
  selected/highlight/disabled/outside props.
- Nav arrows are native <button> with aria-label.
- Icons have aria-hidden="true".
- Keyboard: Tab between elements, Enter/Space to select.
- Time picker uses Dropdown (combobox) and Tabs (tablist).

## Composition rules
- CalendarRange uses CalendarDay for day cells.
- Time picker uses Dropdown and Tabs components.
- Footer content passed as ReactNode (typically Button pair).
- Right panel is always one month ahead of left.
- weekStartsOn controls Sunday (0) or Monday (1) start.

## Known deviations
- No L4 color tokens for calendar-range. Uses semantic
  and intent tokens. Only radius tokens exist as L4.
  Severity: low.

## Code example
<CalendarRange
  startDate={start}
  endDate={end}
  onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
/>

<!-- With time picker and actions -->
<CalendarRange
  startDate={start}
  endDate={end}
  onRangeChange={handleRange}
  showTimePicker
  hour={hour}
  minute={minute}
  period={period}
  onTimeChange={handleTime}
  footer={
    <>
      <Button variant="outline" onClick={cancel}>Cancel</Button>
      <Button variant="filled" onClick={confirm}>Confirm</Button>
    </>
  }
/>

## Cross-references
- Calendar (single date picker)
- CalendarDay (day cell)
- CalendarPeriods (period selector)
- DateRangeInput (range input + dropdown)
- Dropdown (time fields)
- Tabs (AM/PM selector)
- specs/components/calendar.md
