# FormField

Category: form wrapper / layout
React: <FormField>
Spec: specs/components/form-field.md
TSX: apps/storybook/src/stories/form-field/FormField.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-formfield--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6435-1554

--------------------------------------------
## State implementation contract

FormField is a pure layout wrapper. No hover/focus states
on the wrapper itself — the child input handles its own
states. Only the info icon has hover/focus-visible.
--------------------------------------------

## Purpose
Layout wrapper that groups any input component with a
consistent label, optional info icon, and hint text.
Supports vertical (stacked) and horizontal (side-by-side)
orientations.

## Use when
- Wrapping any input with label + hint in a form.
- Building consistent form layouts (vertical or horizontal).
- Adding an info icon tooltip next to a label.

## Do NOT use for
- Rendering an input without label/hint — use the input
  component directly (InputField, SlotInput, etc.).
- Form-level validation or submission — use a <form> element.

## Figma → Code mapping

### Figma component set: input (6435:1554)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| vertical         | orientation      | Figma boolean. true→"vertical", false→"horizontal". |
| label            | (none)           | Figma boolean toggle. In code, derived from !!label string. |
| labelText        | label            | Figma text string. Maps to label prop. |
| hint             | (none)           | Figma boolean toggle. In code, derived from !!hint string. |
| hintText         | hint             | Figma text string. Maps to hint prop. |
| infoIcon         | showInfo         | Direct boolean mapping. |
| changeInput      | children         | Figma instance swap. In code, ReactNode children — any input component. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| onInfoClick      | Click handler for info icon. |
| htmlFor          | Links <label> to input id. |
| disabled         | Dims label and hint text. |
| className        | Layout composition only. |

Notes:
- Figma uses boolean toggles for label/hint visibility with
  separate text properties (label + labelText, hint + hintText).
  In code, a single string prop serves both — truthy means
  visible.
- Figma "vertical" boolean maps to orientation prop with
  "vertical" | "horizontal" values.

## Anatomy
1. Root wrapper — <div class="dls-form-field">,
   data-orientation="vertical" | "horizontal".
2. Label row — <div class="dls-form-field__label-row">,
   flex row for label text + optional info icon.
3. Label — <label class="dls-form-field__label">,
   htmlFor links to child input id.
4. Info icon — <span class="dls-form-field__info">,
   InfoIcon from lucide-react. role="button", tabIndex=0,
   aria-label="More info". 12×12px.
5. Input area — <div class="dls-form-field__input">,
   flex: 1. Contains children (any input component).
6. Hint — <span class="dls-form-field__hint">, hint text.

Vertical layout: label row → input → hint (stacked).
Horizontal layout: left column (label + hint, 140px fixed) →
input area (flex: 1).

## Props / API
- label         string, optional. Label text.
- hint          string, optional. Hint text.
- showInfo      boolean, optional. Show info icon.
- onInfoClick   MouseEventHandler, optional.
- orientation   "vertical" | "horizontal", default "vertical".
- htmlFor       string, optional. Links label to input.
- disabled      boolean, optional, default false.
- children      ReactNode, required. The input component.
- className     string, optional. Layout composition only.
- Ref forwarded to root <div>.

## Tokens used
L2 semantic tokens:
- --dls-color-text-secondary (label, hint, info icon)
- --dls-color-text-primary (info icon hover)
- --dls-color-text-disabled (disabled label, hint)
- --dls-state-focus-ring-color (info icon focus-visible)
- --dls-radius-component-input (info icon focus ring radius)

Spacing tokens:
- --dls-spacing-2 (vertical gap between sections)
- --dls-spacing-1 (horizontal gap, label-row gap)

## States

### Figma representation (input)
No state property — layout wrapper only. Child input
component has its own states.

### Code implementation
- [data-orientation="vertical"] — stacked layout.
- [data-orientation="horizontal"] — side-by-side layout.
- [data-disabled] on label/hint — dims text color.
- Info icon: :hover — color shifts to primary.
  :focus-visible — focus ring via box-shadow.
- Transition: info icon color 150ms ease. Guarded by
  @media (prefers-reduced-motion).

## Accessibility contract
- Root is a <div> — no implicit ARIA role.
- <label> linked to child input via htmlFor/id.
- Info icon has role="button", tabIndex=0, and
  aria-label="More info".
- Info icon is keyboard-accessible (Tab, Enter/Space).
- Respects prefers-reduced-motion.

## Composition rules
- FormField wraps exactly one input component as children.
- Compatible with: InputField, SlotInput, Textarea,
  SearchField, PhoneInput, Dropdown, DropdownAutocomplete,
  ChipInput, OtpInput, DateInput, DateRangeInput.
- When using FormField, pass label/hint to FormField
  instead of the child input.
- Do not nest FormField inside FormField.

## Known deviations
- Figma uses separate boolean + text properties for
  label/hint visibility. In code, a single string prop
  serves both. Severity: low.
- Figma uses a "vertical" boolean. In code, orientation
  uses string values "vertical" | "horizontal".
  Severity: low.

## Code example
<FormField label="Email" hint="We'll never share this." orientation="vertical">
  <InputField placeholder="name@company.com" />
</FormField>

<FormField label="Search" showInfo orientation="horizontal">
  <SlotInput iconStart={<SearchIcon />} placeholder="Search..." />
</FormField>

## Cross-references
- InputField, SlotInput, Textarea, SearchField, PhoneInput,
  Dropdown, OtpInput, DateInput, DateRangeInput (children)
- specs/components/form-field.md
