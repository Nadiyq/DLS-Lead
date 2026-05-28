# InputField

Category: input
React: <InputField>
Spec: specs/components/input-field.md
TSX: apps/storybook/src/stories/input-field/InputField.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-inputfield--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=124-9046

--------------------------------------------
## State implementation contract

InputField hover changes border color only — no background
OKLCH shift or overlay. Error and disabled states swap to
dedicated L4 and L2 semantic tokens.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Single-line labeled text field with optional hint, error
feedback, clear action, and leading/trailing icon slots.

## Use when
- Single-line text entry with label, hint, and/or validation.
- Search or filter inputs that need a clear action.
- Fields that benefit from leading/trailing icon affordances.

## Do NOT use for
- Multi-line text -> use Textarea.
- Option selection -> use Dropdown.
- Phone numbers -> use PhoneInput.
- OTP codes -> use OtpInput.
- Date entry -> use DateInput.
- Chip/tag entry -> use ChipInput.

## Figma -> Code mapping
| Figma property | React prop  | Values / Notes |
|----------------|-------------|----------------|
| state          | (none)      | Visual-only. In code: CSS :hover, :focus-within, data-error, data-disabled. |
| text           | value       | Figma text -> HTML input value attribute. |
| placeholder    | placeholder | HTML attribute pass-through. |
| error          | error       | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText      | error       | Figma error text content -> React error string prop value. |
| (none)         | label       | Code-only. Not in Figma component. |
| (none)         | hint        | Code-only. Not in Figma component. |
| (none)         | clearable   | Code-only. Clear button shown when clearable + filled + not disabled. |
| (none)         | onClear     | Code-only. Callback for clear button. |
| (none)         | iconStart   | Code-only. Leading icon ReactNode. |
| (none)         | iconEnd     | Code-only. Trailing icon ReactNode. |

Notes:
- Figma "field" component covers the bordered box + error row
  only. In code, InputField also renders label and hint rows
  as a single component.
- No Figma variants, intents, or sizes. The single component
  set captures all visual states via the state property.

## Anatomy
1. Root wrapper — <div class="dls-input-field">, vertical
   stack: label -> field -> hint/error.
2. Label — <label class="dls-input-field__label">,
   associated via htmlFor.
3. Field — <div class="dls-input-field__field">, bordered
   box with icon slots + input.
4. Icon start — optional leading icon slot, aria-hidden.
5. Input — <input class="dls-input-field__input">, native
   element with forwarded ref.
6. Clear button or Icon end — clear button (when clearable +
   filled) replaces trailing icon.
7. Hint/Error row — <div class="dls-input-field__hint">,
   shows error with TriangleAlert icon or hint text.

## Props / API
- label       string, optional. Label text above the input.
- hint        string, optional. Hint text below the input.
- error       string, optional. Error message — puts field
              in error state.
- clearable   boolean, optional, default false. Show clear
              button when input has value.
- onClear     () => void, optional. Callback when clear
              button is clicked.
- iconStart   React.ReactNode, optional. Leading icon.
- iconEnd     React.ReactNode, optional. Trailing icon
              (replaced by clear icon when clearable + filled).
- className   string, optional. Pass-through for layout
              composition only.
- Extends Omit<React.InputHTMLAttributes, 'size'> — all
  standard HTML input attributes are passed through.

## Tokens used
L4 component tokens (all in tokens.json):
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
- --dls-state-focus-ring-color (focus ring)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, icons)
- --dls-color-text-primary (clear hover, input fg)
- --dls-color-text-disabled (disabled label, icons)
- --dls-color-text-placeholder (placeholder)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. No hover state in Figma — hover is code-only via
CSS pseudo-class.

### Code implementation
- :hover:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to hover token.
- :focus-within:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to focus token, focus ring via
  box-shadow.
- [data-error] — danger intent bg + border.
  Input gets aria-invalid="true".
- [data-disabled] — disabled bg + border, cursor not-allowed.
- Transitions: border-color, box-shadow, background-color
  150ms ease. Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Input is a native <input> with forwarded ref.
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the input.
- Clear button has aria-label="Clear input".
- Icon slots marked aria-hidden="true".
- Error icon (TriangleAlert) marked aria-hidden="true" —
  error is communicated via text, not icon alone.
- Focus-visible on clear button uses box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- InputField is a leaf component. It does not accept
  component children (only ReactNode for icon slots).
- For form grouping, wrap in a FormField or use standard
  <form> / <fieldset> patterns.
- Do not nest InputField inside another InputField.

## Known deviations
- Figma "field" component does not include label or hint
  rows. In code, InputField renders label, field, and
  hint/error as a single component. Label and hint are
  code-only props with no Figma property counterpart.
  Severity: low.

## Code example
<InputField
  label="Email address"
  placeholder="you@example.com"
  hint="We will never share your email."
  clearable
  onClear={() => setValue('')}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

## Cross-references
- FormField (form grouping with validation)
- SearchField (search-specific input variant)
- Textarea (multi-line text)
- Dropdown (option selection)
- specs/components/input-field.md
- specs/patterns/composition.md
