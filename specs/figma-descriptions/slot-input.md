# SlotInput

Category: form input
React: <SlotInput>
Spec: specs/components/slot-input.md
TSX: apps/storybook/src/stories/slot-input/SlotInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-slotinput--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6441-1431

--------------------------------------------
## State implementation contract

SlotInput field hover changes border color only.
No background OKLCH shift or overlay on the main surface.

- Field hover: border → `--dls-color-component-input-border-hover`
- Field focus-within: ring → `--dls-state-focus-ring-color`,
  border → `--dls-color-component-input-border-focus`
- Error: border → `--dls-color-intent-danger-border`,
  bg → `--dls-color-intent-danger-subtle`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Text input with flexible leading/trailing slots for icons,
buttons, labels, badges, or custom elements on either side.
Extends InputField with configurable slot composition.

## Use when
- Text input with leading or trailing icons.
- Input with prefix/suffix labels or badges.
- Input with clearable action button.
- Structured input with custom slot content.

## Do NOT use for
- OTP or verification codes → use OtpInput.
- Phone numbers → use PhoneInput.
- Plain text input without slots → use InputField.
- Date selection → use DateInput.

## Figma → Code mapping

### Figma component set: with-slots (6441:1431)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: :hover, :focus-within, :disabled, [data-error], [data-disabled]. |
| text             | value            | Figma display text. In code, standard input value prop. |
| placeholder      | placeholder      | Direct mapping. |
| iconLeft         | iconStart        | Figma boolean toggle. In code, ReactNode — truthy means visible. |
| iconRight        | iconEnd          | Figma boolean toggle. In code, ReactNode — truthy means visible. |
| slotLeft         | slotLeft         | Figma boolean toggle. In code, ReactNode — truthy means visible. |
| slotRight        | slotRight        | Figma boolean toggle. In code, ReactNode — truthy means visible. |
| slotLeftContent  | slotLeft         | Figma content swap. In code, slotLeft accepts any ReactNode directly. |
| slotRightContent | slotRight        | Figma content swap. In code, slotRight accepts any ReactNode directly. |
| error            | (none)           | Figma boolean toggle. In code, derived from !!error string. |
| errorText        | error            | Figma error text string. Maps to error prop. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| label            | Optional label above field. |
| hint             | Optional hint below field. |
| clearable        | Show clear button when value is present. |
| onClear          | Clear callback. |
| disabled         | Disables the input. |
| id               | HTML id for the input element. |

Notes:
- Figma "with-slots" component does not include label or
  hint/error rows. In code, SlotInput renders all sections
  as a single component.
- Figma uses separate boolean + content swap properties for
  slots (slotLeft + slotLeftContent). In code, a single
  ReactNode prop serves both purposes — truthy means visible.

## Anatomy
1. Root wrapper — <div class="dls-slot-input">, vertical
   stack: label → field → hint/error.
2. Label — <label class="dls-slot-input__label">, optional.
   htmlFor links to input id.
3. Field — <div class="dls-slot-input__field">, bordered
   container for icon/slot/input elements.
4. Icon start — <span class="dls-slot-input__icon">,
   leading icon. aria-hidden="true".
5. Slot left — <span class="dls-slot-input__slot">,
   leading slot content (after icon start).
6. Input — <input class="dls-slot-input__input">,
   native text input. flex: 1.
7. Clear button — <button class="dls-slot-input__clear">,
   XIcon. aria-label="Clear". Visible when clearable +
   value + not disabled.
8. Icon end — <span class="dls-slot-input__icon">,
   trailing icon. aria-hidden="true".
9. Slot right — <span class="dls-slot-input__slot">,
   trailing slot content (after icon end).
10. Hint/Error row — <div class="dls-slot-input__hint">,
    shows error with TriangleAlert icon or hint text.

## Props / API
- label         string, optional. Label text.
- hint          string, optional. Hint text.
- error         string, optional. Error message.
- iconStart     ReactNode, optional. Leading icon.
- iconEnd       ReactNode, optional. Trailing icon.
- slotLeft      ReactNode, optional. Leading slot content.
- slotRight     ReactNode, optional. Trailing slot content.
- clearable     boolean, optional. Show clear button.
- onClear       () => void, optional. Clear callback.
- disabled      boolean, optional. Disables the input.
- value         string | number | readonly string[], optional.
- className     string, optional. Layout composition only.
- id            string, optional. HTML id for input.
- Ref forwarded to <input>.
- Extends React.InputHTMLAttributes<HTMLInputElement>
  (omitting 'size').

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
- --dls-state-focus-ring-color (focus ring on field)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-subtle (error background)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, icons)
- --dls-color-text-primary (clear hover color)
- --dls-color-text-disabled (disabled label)
- --dls-color-surface-subtle (slot background example)

## States

### Figma representation (with-slots)
state property with values: normal, filled, focused,
error, disabled.

### Code implementation
- :hover:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to hover token.
- :focus-within:not(:disabled):not([data-disabled]):not([data-error])
  — focus ring via box-shadow, border shifts to focus token.
- [data-error] — danger intent border + subtle background.
- [data-disabled] — disabled bg/border, cursor not-allowed.
- Transitions: border-color, box-shadow, background-color
  150ms ease on field. Guarded by
  @media (prefers-reduced-motion).

## Accessibility contract
- Native <input> element inside field wrapper.
- Label linked via htmlFor/id to input.
- Hint and error text connected via aria-describedby on
  input.
- Error state sets aria-invalid="true" on input.
- Clear button has aria-label="Clear".
- Leading/trailing icons marked aria-hidden="true"
  (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: Tab focuses input, Escape blurs or clears.
- Focus-within ring on field wrapper for visual focus.
- Respects prefers-reduced-motion.

## Composition rules
- SlotInput is self-contained. Pass content via props.
- slotLeft/slotRight accept any ReactNode (badges, labels,
  buttons, custom elements).
- iconStart/iconEnd accept icon elements (lucide-react).
- Do not nest interactive elements in slots if they
  conflict with input focus.
- For form grouping, wrap in FormField or standard form
  patterns.

## Known deviations
- Figma "with-slots" component does not include label or
  hint/error rows. In code, SlotInput renders all sections
  as a single component. Severity: low.
- Figma uses separate boolean + content swap properties for
  slots (slotLeft + slotLeftContent). In code, a single
  ReactNode prop serves both purposes — truthy means
  visible. Severity: low.

## Code example
<SlotInput
  label="Email"
  hint="We will never share your email."
  iconStart={<MailIcon />}
  placeholder="you@example.com"
  clearable
  onClear={() => setValue('')}
/>

## Cross-references
- InputField (plain text input)
- OtpInput (verification codes)
- PhoneInput (phone numbers)
- SearchField (search variant)
- specs/components/slot-input.md
