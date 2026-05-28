# PhoneInput

Category: form input
React: <PhoneInput>
Spec: specs/components/phone-input.md
TSX: apps/storybook/src/stories/phone-input/PhoneInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-phoneinput--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6438-829

--------------------------------------------
## State implementation contract

PhoneInput hover changes border color only — no background
OKLCH shift or overlay. Same token-swap pattern as InputField.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
International phone number input with a country selector
showing flag, dial code, and chevron, plus a clear button
and optional label, hint, and error feedback.

## Use when
- International phone number entry with country selection.
- Forms requiring phone numbers with dial code.
- Contact or registration forms with phone fields.

## Do NOT use for
- General text input -> use InputField.
- Non-phone number input -> use InputField.
- Phone display only -> render text directly.

## Figma -> Code mapping
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| state          | (none)           | Visual-only. In code: CSS :hover, :focus-within, data-error, data-disabled. |
| text           | value            | Figma text -> HTML input value attribute. |
| placeholder    | placeholder      | Default "000-000-0000" in both Figma and code. |
| code           | country          | Figma string ("+1"). In code, part of CountryOption object: country.dialCode. |
| error          | error            | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText      | error            | Figma error text -> React error string prop value. |
| (none)         | label            | Code-only. Optional label above the field. |
| (none)         | hint             | Code-only. Optional hint text below the field. |
| (none)         | country          | Code-only object: { code, dialCode, flag, name }. |
| (none)         | onCountryClick   | Code-only. Callback for country selector. |
| (none)         | onClear          | Code-only. Callback for clear button. |

Notes:
- Figma "phone" component covers the bordered box + error row.
  In code, PhoneInput also renders label and hint rows.
- Figma has a simple "code" string and built-in US flag. In code,
  country is a full CountryOption object supporting any country.

## Anatomy
1. Root wrapper — <div class="dls-phone-input">, vertical
   stack: label -> box -> hint/error.
2. Label — <label class="dls-phone-input__label">, optional,
   associated via htmlFor.
3. Box — <div class="dls-phone-input__box">, bordered container
   with country button + dial code + input + clear.
4. Country button — <button class="dls-phone-input__country">,
   contains flag emoji + chevron icon. Has aria-label describing
   selected country.
5. Dial code — <span class="dls-phone-input__code">, displays
   the country dial code (e.g. "+1").
6. Input — <input type="tel" class="dls-phone-input__input">,
   native tel input with forwarded ref.
7. Clear button — shows when value is present and not disabled.
8. Hint/Error row — shows error with TriangleAlert icon or hint.

## Props / API
- label          string, optional. Label text above the input.
- hint           string, optional. Hint text below the input.
- error          string, optional. Error message — puts field
                 in error state.
- country        CountryOption, optional. Default US.
                 { code, dialCode, flag, name }.
- onCountryClick React.MouseEventHandler, optional. Callback
                 when country selector is clicked.
- onClear        () => void, optional. Callback when clear
                 button is clicked.
- className      string, optional. Pass-through for layout
                 composition only.
- placeholder    string, optional, default "000-000-0000".
- Extends Omit<React.InputHTMLAttributes, 'size' | 'type'> —
  type is fixed to "tel".

## Tokens used
L4 component tokens (shared with InputField, all in tokens.json):
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
- --dls-state-focus-ring-color (focus ring on box, country,
  clear)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, chevron, clear)
- --dls-color-text-primary (clear hover, dial code on focus)
- --dls-color-text-disabled (disabled chevron, label)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. No hover state in Figma.

### Code implementation
- :hover:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to hover token.
- :focus-within:not([data-disabled])
  — border shifts to focus, ring via box-shadow. Dial code
  text shifts from placeholder to primary color.
- [data-error] — danger intent bg + border.
  Input gets aria-invalid="true".
- [data-disabled] — disabled bg + border, cursor not-allowed.
  Country button disabled, pointer-events: none.
- Transitions: border-color, box-shadow, background-color
  150ms ease. Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Input uses native <input type="tel"> for phone semantics.
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the input.
- Country button has descriptive aria-label including
  country name.
- Chevron icon marked aria-hidden="true" (decorative).
- Clear button has aria-label="Clear phone number".
- Error icon (TriangleAlert) marked aria-hidden="true".
- Focus-visible on country and clear buttons uses box-shadow
  ring.
- Respects prefers-reduced-motion.

## Composition rules
- PhoneInput is a leaf component with no children.
- The country selector button triggers an external dropdown
  or picker — PhoneInput does not render the country list.
  Wire onCountryClick to open a Dropdown or Dialog.
- For form grouping, wrap in a FormField or use standard
  <form> / <fieldset> patterns.

## Known deviations
- Figma component does not include label or hint rows. In
  code, PhoneInput renders all three as a single component.
  Severity: low.
- Figma has a simple "code" string for dial code and a
  built-in US flag. In code, country is a full CountryOption
  object supporting any country with flag emoji.
  Severity: low.

## Code example
<PhoneInput
  label="Phone number"
  hint="Include area code."
  country={{
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    name: 'United States',
  }}
  placeholder="000-000-0000"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  onClear={() => setPhone('')}
  onCountryClick={openCountryPicker}
/>

## Cross-references
- InputField (general text input)
- FormField (form grouping)
- Dropdown (country picker)
- specs/components/phone-input.md
