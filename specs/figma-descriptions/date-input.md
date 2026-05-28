# DateInput

Category: form input / date picker
React: <DateInput>
Spec: specs/components/date-input.md
TSX: apps/storybook/src/stories/date-input/DateInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dateinput--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=124-8432

--------------------------------------------
## State implementation contract

DateInput trigger hover changes border color only.
No background OKLCH shift or overlay on the main surface.

- Trigger hover: border → `--dls-color-component-input-border-hover`
- Trigger focus-visible: ring → `--dls-state-focus-ring-color`,
  border → `--dls-color-component-input-border-focus`
- Open: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`, chevron rotated 180°
- Error: border → `--dls-color-intent-danger-border`,
  bg → `--dls-color-intent-danger-subtle`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Single-date selection with a calendar dropdown trigger. Renders
a button-style trigger with calendar icon, date value, optional
clear button, and chevron. Opens a Calendar component as a
dropdown for date selection.

## Use when
- Single-date selection with calendar dropdown.
- Date picker trigger field with label and hint.
- Date entry with min/max constraints.

## Do NOT use for
- Date range selection -> use DateRangeInput.
- Free-form text date entry -> use InputField with date validation.
- Time-only selection -> use a dedicated time picker.

## Figma -> Code mapping

### Figma component set: date (124:8432)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: :hover, :focus-visible, :disabled, [data-open], [data-error]. |
| text             | value            | Figma display text. In code, value prop or derived from selectedDate. |
| placeholder      | placeholder      | Direct mapping. Default "MM / DD / YYYY". |
| chevronDown      | (none)           | Figma toggle for chevron visibility. In code, chevron is always shown. |
| error            | (none)           | Figma boolean toggle. In code, derived from !!error string. |
| errorText        | error            | Figma error text string. Maps to error prop. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| selectedDate     | Date object for calendar. |
| onDateSelect     | Callback when date selected from calendar. |
| onClick          | Click handler for trigger. |
| onClear          | Clear callback. |
| label            | Optional label above field. |
| hint             | Optional hint below field. |
| clearable        | Allow clearing selection. Default true. |
| min              | Minimum selectable date. |
| max              | Maximum selectable date. |
| disabled         | Disables the trigger. |
| id               | HTML id for the trigger button. |

Notes:
- Figma "date" component does not include label or hint/error
  rows. In code, DateInput renders all sections as a single
  component.
- Figma chevronDown boolean hides the chevron icon. In code,
  the chevron is always rendered.

## Anatomy
1. Root wrapper — <div class="dls-date-input">, vertical
   stack: label -> trigger -> dropdown -> hint/error.
2. Label — <label class="dls-date-input__label">, optional.
3. Trigger — <div class="dls-date-input__trigger">,
   bordered container holding trigger button, clear, chevron.
3a. Trigger button — <button class="dls-date-input__trigger-btn">,
   unstyled inner button for keyboard/ARIA. Fills available space.
4. Content — <span class="dls-date-input__content">, flex
   row for calendar icon + value text.
5. Calendar icon — <span class="dls-date-input__calendar-icon">,
   CalendarIcon from lucide-react. aria-hidden="true".
6. Value — <span class="dls-date-input__value">, shows
   selected date or placeholder text.
7. Clear button — <button class="dls-date-input__clear">,
   XIcon. aria-label="Clear date".
8. Chevron — <span class="dls-date-input__chevron">,
   ChevronDownIcon. Rotates 180° when open. aria-hidden="true".
9. Calendar dropdown — <div class="dls-date-input__dropdown">,
   positioned absolute below trigger. Contains Calendar component.
10. Hint/Error row — shows error with TriangleAlert icon or
    hint text.

## Props / API
- value         string, optional. Display string.
- selectedDate  Date, optional. Date object for calendar.
- onDateSelect  (date: Date) => void, optional.
- onClick       React.MouseEventHandler, optional.
- onClear       React.MouseEventHandler, optional.
- placeholder   string, optional, default "MM / DD / YYYY".
- label         string, optional. Label text.
- hint          string, optional. Hint text.
- error         string, optional. Error message.
- clearable     boolean, optional, default true.
- min           Date, optional. Minimum selectable date.
- max           Date, optional. Maximum selectable date.
- disabled      boolean, optional, default false.
- className     string, optional. Layout composition only.
- id            string, optional. HTML id for trigger.
- Ref forwarded to trigger <button>.

## Tokens used
L4 component tokens (shared with InputField):
- --dls-color-component-input-bg-base
- --dls-color-component-input-bg-disabled
- --dls-color-component-input-fg-base
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-fg-disabled
- --dls-color-component-input-border-base
- --dls-color-component-input-border-hover
- --dls-color-component-input-border-focus
- --dls-color-component-input-border-disabled
- --dls-radius-component-input

L2/L3 semantic tokens also used:
- --dls-color-surface-base (resolved by input bg-base)
- --dls-state-focus-ring-color (focus ring on trigger)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-subtle (error background)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-primary (filled value color)
- --dls-color-text-secondary (label, hint, icons)
- --dls-color-text-disabled (disabled label, icons)

## States

### Figma representation (date)
state property with values: normal, filled, focused, error,
disabled.

### Code implementation
- :hover:not(:disabled):not([data-error]) — border color
  shifts to hover token.
- :focus-visible — focus ring via box-shadow, border shifts
  to focus token.
- [data-open] — focus ring + focus border + chevron rotated
  180°.
- [data-error] — danger intent border + subtle background.
- :disabled — disabled bg/border/fg on trigger.
- Transitions: border-color, box-shadow, background-color
  150ms ease on trigger. Guarded by
  @media (prefers-reduced-motion).

## Accessibility contract
- Trigger is a native <button type="button">.
- Trigger has aria-expanded reflecting open state.
- Trigger has aria-haspopup="dialog" for calendar dropdown.
- Hint and error text connected via aria-describedby on
  trigger.
- Error state sets aria-invalid="true" on trigger.
- Clear button has aria-label="Clear date".
- Calendar icon marked aria-hidden="true" (decorative).
- Chevron icon marked aria-hidden="true" (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: Enter/Space toggles calendar, Escape closes it,
  Tab moves focus.
- Focus returns to trigger when calendar closes.
- Respects prefers-reduced-motion.

## Composition rules
- DateInput composes Calendar internally for the dropdown.
- Do not manually render Calendar alongside DateInput.
- For date range selection, use DateRangeInput instead.
- For form grouping, wrap in FormField or standard form
  patterns.

## Known deviations
- Figma "date" component does not include label or hint/error
  rows. In code, DateInput renders all sections as a single
  component. Severity: low.
- Figma has a chevronDown boolean to show/hide the chevron.
  In code, the chevron is always rendered. Severity: low.

## Code example
<DateInput
  label="Start date"
  hint="Select a project start date."
  placeholder="MM / DD / YYYY"
  selectedDate={date}
  onDateSelect={setDate}
  onClear={() => setDate(undefined)}
  clearable
/>

## Cross-references
- Calendar (dropdown content)
- DateRangeInput (range variant)
- InputField (shares input tokens)
- specs/components/date-input.md
