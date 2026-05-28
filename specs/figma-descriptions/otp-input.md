# OtpInput

Category: form input
React: <OtpInput>
Spec: specs/components/otp-input.md
TSX: apps/storybook/src/stories/otp-input/OtpInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-otpinput--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6617-10709

--------------------------------------------
## State implementation contract

OtpInput slot hover changes border color only (spacing type).
No-spacing and separator types change the group/field border.
No background OKLCH shift or overlay on the main surface.

- Slot hover (spacing): border → `--dls-color-component-input-border-hover`
- Slot focus-visible: ring → `--dls-state-focus-ring-color`,
  border → `--dls-color-component-input-border-focus` (spacing)
- Group/field focus-within: border → `--dls-color-component-input-border-focus`
  (no-spacing and separator types)
- Error: border → `--dls-color-intent-danger-border`,
  bg → `--dls-color-intent-danger-subtle`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
One-time-password input with configurable digit count and
visual grouping. Each digit renders as an individual slot
with auto-advance, backspace navigation, and paste support.

## Use when
- One-time password or verification code entry.
- PIN code input.
- Short numeric code entry with visual slot feedback.

## Do NOT use for
- General text input -> use InputField.
- Phone numbers -> use PhoneInput.
- Long numeric sequences -> use InputField with inputMode.
- Credit card numbers -> use SlotInput.

## Figma -> Code mapping

This component maps to TWO Figma component sets:

### Figma component set: otp (6617:10709)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| type             | type             | "no spacing" -> "no-spacing", "spacing" -> "spacing", "1-separator" -> "1-separator", "2-separator" -> "2-separator". |

### Figma component set: otp-slot (6617:11742)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: :focus-visible, :disabled, data-filled, data-error. |
| text             | value            | Figma single digit. In code, derived from value string split by index. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| length           | Number of digits. Default 6. |
| label            | Optional label above field. |
| hint             | Optional hint below field. |
| error            | Error string — puts all slots in error state. |
| onChange         | Callback when value changes. |
| disabled         | Disables all slots. |

Notes:
- Figma uses two component sets: "otp" for the group layout
  and "otp-slot" for individual cells. In code, OtpInput is
  a single component that renders both.
- Figma "otp" does not include label or hint/error rows.
- Figma "no spacing" uses space in the name; code uses
  hyphenated "no-spacing".

## Anatomy
1. Root wrapper — <div class="dls-otp-input">, vertical
   stack: label -> field -> hint/error.
2. Label — <label class="dls-otp-input__label">, optional.
3. Field — <div class="dls-otp-input__field">, holds slots
   with data-type controlling layout.
4. Groups (separator types) — <div class="dls-otp-input__group">,
   bordered containers holding slot subsets.
5. Slots — <input class="dls-otp-input__slot">, individual
   digit inputs with type="text", inputMode="numeric",
   maxLength=1.
6. Separators — <span class="dls-otp-input__separator">,
   MinusIcon between groups. aria-hidden="true".
7. Hint/Error row — shows error with TriangleAlert icon or
   hint text.

### Layout types
- **spacing**: Individual bordered slots with gap.
- **no-spacing**: Shared outer border, inner dividers, no gap.
- **1-separator**: Two groups split by one separator (dash).
- **2-separator**: Three groups split by two separators.

## Props / API
- length        number, optional, default 6. Digit count.
- type          OtpInputType, optional, default "spacing".
                "spacing" | "no-spacing" | "1-separator" |
                "2-separator".
- value         string, optional, default "". Current value.
- onChange      (value: string) => void, optional.
- label         string, optional. Label text.
- hint          string, optional. Hint text.
- error         string, optional. Error message — puts all
                slots in error state.
- disabled      boolean, optional, default false.
- className     string, optional. Layout composition only.
- Ref forwarded to root <div> wrapper.

## Tokens used
L4 component tokens (shared with InputField):
- --dls-color-component-input-bg-disabled
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-fg-disabled
- --dls-color-component-input-border-base
- --dls-color-component-input-border-hover
- --dls-color-component-input-border-focus
- --dls-color-component-input-border-disabled
- --dls-radius-component-input

L2/L3 semantic tokens also used:
- --dls-color-surface-base (slot background)
- --dls-state-focus-ring-color (focus ring on active slot)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-subtle (error background)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-primary (filled digit color)
- --dls-color-text-secondary (label, hint)
- --dls-color-text-disabled (disabled label)
- --dls-color-border-strong (separator icon color)

## States

### Figma representation (otp-slot)
state property with values: normal, focus, filled, error.

### Code implementation
- :hover:not(:disabled):not([data-error]) — border color
  shifts to hover token (spacing type only).
- :focus-visible — focus ring via box-shadow on the active
  slot, z-index: 1 to layer above siblings.
- :focus-within (no-spacing/groups) — group or field border
  shifts to focus token.
- [data-filled] — digit text color changes from placeholder
  to primary.
- [data-error] — danger intent border + subtle background
  on slots, groups, or field depending on type.
- :disabled — disabled bg/border/fg on all slots.
- Transitions: border-color, box-shadow 150ms ease on slots,
  border-color 150ms ease on groups and no-spacing field.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Each slot is a native <input type="text" inputMode="numeric">.
- Each slot has aria-label="Digit N" for screen readers.
- Hint and error text connected via aria-describedby on
  all slots.
- Error state sets aria-invalid="true" on all slots.
- Separator icons marked aria-hidden="true" (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: 0-9 to enter digit and auto-advance, Backspace
  to clear or move back, ArrowLeft/ArrowRight to navigate,
  paste support across all slots.
- Focus management: manual focus between slots via refs.
- Respects prefers-reduced-motion.

## Composition rules
- OtpInput is a self-contained component. It renders all
  slots internally based on the length prop.
- Do not manually compose individual slot inputs.
- For form grouping, wrap in FormField or standard form
  patterns.

## Known deviations
- Figma "otp" component does not include label or hint/error
  rows. In code, OtpInput renders all sections as a single
  component. Severity: low.

## Code example
<OtpInput
  length={6}
  type="1-separator"
  label="Verification code"
  hint="Enter the 6-digit code sent to your email."
  value={code}
  onChange={setCode}
/>

## Cross-references
- InputField (shares input tokens)
- SlotInput (structured input alternative)
- FormField (form grouping)
- specs/components/otp-input.md
