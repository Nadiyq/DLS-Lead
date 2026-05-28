# DateRangeInput

Category: form input / date range picker
React: <DateRangeInput>
Spec: specs/components/date-range-input.md
TSX: apps/storybook/src/stories/date-range-input/DateRangeInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-daterangeinput--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=124-8544

--------------------------------------------
## State implementation contract

DateRangeInput delegates state rendering to child DateInput
components. No direct interactive states on the range wrapper.
Error styling is forwarded to child DateInput triggers.
Focus/hover/disabled states are handled by each DateInput.

--------------------------------------------

## Purpose
Start-end date range selection composed of two DateInput
triggers with a shared calendar dropdown and dash separator.
Selecting a start date auto-advances focus to the end field.

## Use when
- Start-end date range selection.
- Date range filter with calendar dropdown.
- Period selection with visual range feedback.

## Do NOT use for
- Single-date selection -> use DateInput.
- Free-form date entry -> use InputField with date validation.
- Time range selection -> use a dedicated time range component.

## Figma -> Code mapping

### Figma component set: date-range (124:8544)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| line             | separator        | Figma "line" maps to "separator" prop. Both boolean, default true. |

### Code-only props
| React prop         | Notes |
|--------------------|-------|
| startValue         | Start date display string. |
| endValue           | End date display string. |
| startDate          | Start date as Date object. |
| endDate            | End date as Date object. |
| onStartDateSelect  | Callback for start date selection. |
| onEndDateSelect    | Callback for end date selection. |
| onStartClick       | Click handler for start field. |
| onEndClick         | Click handler for end field. |
| onStartClear       | Clear start date. |
| onEndClear         | Clear end date. |
| startPlaceholder   | Placeholder for start field. Default "MM / DD / YYYY". |
| endPlaceholder     | Placeholder for end field. Default "MM / DD / YYYY". |
| label              | Optional label above fields. |
| hint               | Optional hint below fields. |
| error              | Error message — puts both fields in error state. |
| min                | Minimum selectable date. |
| max                | Maximum selectable date. |
| disabled           | Disables both date fields. |

Notes:
- Figma "date-range" component does not include label or
  hint/error rows. In code, DateRangeInput renders all
  sections as a single component.
- Figma "line" maps to code "separator" prop. Both boolean,
  default true.
- Figma date-range has no state property. States are shown
  on child date component instances.

## Anatomy
1. Root wrapper — <div class="dls-date-range-input">,
   vertical stack: label -> row -> hint/error.
2. Label — <label class="dls-date-range-input__label">,
   optional.
3. Row — <div class="dls-date-range-input__row"
   role="group">, holds start DateInput + separator + end
   DateInput + calendar dropdown.
4. Start DateInput — <DateInput> for start date.
5. Separator — <span class="dls-date-range-input__separator">,
   MinusIcon (dash). aria-hidden="true".
6. End DateInput — <DateInput> for end date.
7. Calendar dropdown — <div class="dls-date-range-input__dropdown">,
   positioned absolute, shared Calendar with range support.
8. Hint/Error row — shows error with TriangleAlert icon or
   hint text.

## Props / API
- startValue      string, optional. Start date display string.
- endValue        string, optional. End date display string.
- startDate       Date, optional. Start date object.
- endDate         Date, optional. End date object.
- onStartDateSelect  (date: Date) => void, optional.
- onEndDateSelect    (date: Date) => void, optional.
- onStartClick    React.MouseEventHandler, optional.
- onEndClick      React.MouseEventHandler, optional.
- onStartClear    React.MouseEventHandler, optional.
- onEndClear      React.MouseEventHandler, optional.
- startPlaceholder  string, optional, default "MM / DD / YYYY".
- endPlaceholder    string, optional, default "MM / DD / YYYY".
- label           string, optional. Label text.
- hint            string, optional. Hint text.
- error           string, optional. Error message.
- min             Date, optional. Minimum selectable date.
- max             Date, optional. Maximum selectable date.
- separator       boolean, optional, default true. Show dash.
- disabled        boolean, optional, default false.
- className       string, optional. Layout composition only.
- Ref forwarded to root <div> wrapper.

## Tokens used
Inherits all tokens from child DateInput components:
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
- --dls-state-focus-ring-color (focus ring on active field)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-subtle (error background)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, separator)
- --dls-color-text-disabled (disabled label)
- --dls-color-border-strong (separator icon color)

## States

### Figma representation (date-range)
No state property. States are shown on child date component
instances.

### Code implementation
States are delegated to child DateInput components:
- hover, focus-visible, error, disabled — all handled by
  DateInput CSS and ARIA.
- activeField (internal state) — tracks which field has an
  open calendar ('start' | 'end' | null).
- Error forwarding: passes error=' ' to child DateInput to
  trigger visual error styling; real error text rendered at
  range level.
- No transitions in DateRangeInput CSS itself; child DateInput
  handles its own transition guards.

## Accessibility contract
- Row container has role="group" with aria-label for screen
  readers.
- Range-level hint/error connected via aria-describedby on
  the group.
- Each child DateInput has its own aria-expanded, aria-haspopup,
  aria-invalid, and focus management.
- Separator icon marked aria-hidden="true" (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: Enter/Space toggles calendar on focused field,
  Escape closes, Tab moves between start/end fields.
- Focus flow: selecting start date auto-advances to end field.
- Respects prefers-reduced-motion (via child DateInput).

## Composition rules
- DateRangeInput composes two DateInput instances internally.
- Do not manually render DateInput alongside DateRangeInput.
- The calendar dropdown is shared between both fields.
- Child DateInput chevrons are hidden via CSS override.
- For form grouping, wrap in FormField or standard form
  patterns.

## Known deviations
- Figma "date-range" component does not include label or
  hint/error rows. In code, DateRangeInput renders all
  sections as a single component. Severity: low.
- Figma date-range has no state property. States are shown
  on child date instances. In code, error styling forwarded
  via space-string error prop. Severity: low.

## Code example
<DateRangeInput
  label="Period"
  hint="Select a start and end date."
  startDate={startDate}
  endDate={endDate}
  onStartDateSelect={setStartDate}
  onEndDateSelect={setEndDate}
  onStartClear={() => setStartDate(undefined)}
  onEndClear={() => setEndDate(undefined)}
/>

## Cross-references
- DateInput (child component)
- Calendar (dropdown content)
- InputField (shares input tokens)
- specs/components/date-range-input.md
