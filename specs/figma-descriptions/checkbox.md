# Checkbox

Category: form control
React: <Checkbox>
Spec: specs/components/checkbox.md
TSX: apps/storybook/src/stories/checkbox/Checkbox.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-checkbox--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=59-6942

--------------------------------------------
## State implementation contract

Hybrid state model. Unchecked box uses overlay tokens
for hover/pressed (transparent surface). Checked and
indeterminate box uses OKLCH L-shift on neutral-base fill.

- Unchecked hover: bg → `--dls-state-hover-overlay`,
  border → `--dls-color-border-focus`
- Unchecked pressed: bg → `--dls-state-pressed-overlay`,
  border → `--dls-color-border-focus`
- Checked/indeterminate hover: bg → OKLCH shift
  (l + `--dls-state-l-delta-hover`) on
  `--dls-color-intent-neutral-base`
- Checked/indeterminate pressed: bg → OKLCH shift
  (l + `--dls-state-l-delta-pressed`) on
  `--dls-color-intent-neutral-base`
- Focus-visible: ring → `--dls-state-focus-ring-color`
  (0 0 0 3px box-shadow)
- Disabled: bg → `--dls-color-surface-disabled`,
  border → `--dls-color-border-disabled`,
  text → `--dls-color-text-disabled`
--------------------------------------------

## Purpose
Binary or indeterminate selection control with optional
label and description. Supports checked, indeterminate,
and disabled states with text on either side.

## Use when
- Binary on/off selections.
- Multiple independent selections in a list.
- Indeterminate parent checkbox for select-all/some pattern.
- Accepting terms or toggling preferences.

## Do NOT use for
- Mutually exclusive choices — use Radiobutton.
- Toggle with immediate effect — use Switcher.
- Single on/off with visual toggle — use Switcher.

## Figma → Code mapping

### Figma component set: checkbox (59:6942)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| type             | —                | "unselected" → checked=false, "selected" → checked=true, "middle" → indeterminate=true. |
| state            | —                | Figma-only visual state (normal/hover/focus/pressed/disabled). CSS pseudo-classes + disabled prop in code. |
| checked?         | checked          | Boolean toggle. Maps directly to checked prop. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| checked          | boolean, default false. |
| indeterminate    | boolean, default false. Visual only, overrides checked appearance. |
| disabled         | boolean, default false. |
| label            | string, optional. Label text. |
| description      | string, optional. Description below label. |
| textOrientation  | "right" | "left", default "right". |
| onChange          | (checked: boolean) => void, optional. |
| name             | string, optional. Native name attribute. |
| value            | string, optional. Native value attribute. |
| aria-label       | string, optional. Required when no visible label. |
| className        | string, optional. |

Notes:
- Figma component shows only the checkbox box. Label and
  description are code-only — in Figma, label composition
  happens at the usage level.
- Figma type "middle" maps to indeterminate=true in code.
- Icon / Check and Icon / Minus are lucide-react Check
  and Minus icons in code.

## Anatomy
1. Root — <label class="dls-checkbox">, wrapping click
   target. data-text-orientation="left" when reversed.
2. Hidden input — <input type="checkbox"
   class="dls-checkbox__input">, visually hidden but
   functionally active. Forwarded ref.
3. Box wrapper — <span class="dls-checkbox__box-wrapper">,
   aligns checkbox to first line of text.
4. Visual box — <span class="dls-checkbox__box">, 18×18px
   with component radius. Contains Check and Minus icons.
5. Check icon — <Check class="dls-checkbox__icon-check">,
   shown when checked. Opacity transition.
6. Minus icon — <Minus class="dls-checkbox__icon-minus">,
   shown when indeterminate. Opacity transition.
7. Text block — <span class="dls-checkbox__text">,
   contains label and description. Only rendered when
   label or description is provided.
8. Label — <span class="dls-checkbox__label">, medium
   text, primary color.
9. Description — <span class="dls-checkbox__description">,
   small text, secondary color.

## Props / API
- checked          boolean, default false.
- indeterminate    boolean, default false.
- disabled         boolean, default false.
- label            string, optional.
- description      string, optional.
- textOrientation  "right" | "left", default "right".
- onChange          (checked: boolean) => void, optional.
- name             string, optional.
- value            string, optional.
- aria-label       string, optional.
- className        string, optional.
- Ref forwarded to <input>.

## Tokens used
L4 component token:
- --dls-radius-component-checkbox

Intent tokens:
- --dls-color-intent-neutral-base (checked/indeterminate bg + border)
- --dls-color-intent-neutral-on-base (check/minus icon color)

L2 semantic tokens:
- --dls-color-surface-base (unchecked bg)
- --dls-color-surface-disabled (disabled bg)
- --dls-color-border-strong (unchecked border)
- --dls-color-border-focus (hover border)
- --dls-color-border-disabled (disabled border)
- --dls-color-text-primary (label text)
- --dls-color-text-secondary (description text)
- --dls-color-text-disabled (disabled text)

L3 state tokens:
- --dls-state-hover-overlay (unchecked hover)
- --dls-state-pressed-overlay (unchecked pressed)
- --dls-state-l-delta-hover (checked/indeterminate hover OKLCH shift)
- --dls-state-l-delta-pressed (checked/indeterminate pressed OKLCH shift)
- --dls-state-focus-ring-color (focus ring)

Typography/spacing:
- --dls-spacing-1, --dls-spacing-2
- --dls-font-family
- --dls-text-m-font-size, --dls-text-m-line-height
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-font-weight-normal

## States

### Figma representation (checkbox 59:6942)
- type: unselected / selected / middle
- state: normal / hover / focus / pressed / disabled
- checked?: true / false

### Code implementation
- Unchecked :hover:not(:disabled) — overlay hover bg,
  focus border.
- Unchecked :active:not(:disabled) — overlay pressed bg,
  focus border.
- Checked :hover:not(:disabled) — OKLCH L-shift hover on
  neutral-base.
- Checked :active:not(:disabled) — OKLCH L-shift pressed
  on neutral-base.
- Indeterminate — same states as checked.
- :focus-visible — external box-shadow ring (0 0 0 3px).
- :disabled — disabled surface, border, and text tokens.
- Transition: background-color 150ms ease, border-color
  150ms ease on box. Opacity 150ms ease on icons.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Uses native <input type="checkbox"> (visually hidden
  but functionally active).
- Wrapped in <label> element for click-target association.
- Native :checked and :indeterminate states via DOM API.
- When no visible label provided, aria-label is required.
- Keyboard: Space toggles checked. Tab moves focus.
- Focus-visible uses external box-shadow ring.
- Disabled uses native disabled attribute.
- Respects prefers-reduced-motion.

## Composition rules
- Checkbox is self-contained. Do not nest other components.
- For labeled forms, wrap in FormField for labels/hints.
- For groups of checkboxes, use a <fieldset> with <legend>.
- Use CheckboxBox for a standalone box without label/desc.
- Use textOrientation="left" for right-aligned checkboxes
  (e.g., in settings lists).

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  and intent tokens directly. Only
  --dls-radius-component-checkbox exists as L4.
  Severity: low.
- Figma component (59:6942) shows only the box. Label and
  description are code-only props. Figma composes the
  full control at usage level. Severity: low.

## Code example
<Checkbox
  label="Accept terms"
  description="You agree to our terms of service"
  checked={accepted}
  onChange={setAccepted}
/>

<!-- Indeterminate parent -->
<Checkbox
  checked={allChecked}
  indeterminate={!allChecked && !noneChecked}
  label="Select all"
  onChange={toggleAll}
/>

<!-- Without label (requires aria-label) -->
<Checkbox checked aria-label="Select row" />

<!-- Left-oriented text -->
<Checkbox
  label="Enable feature"
  textOrientation="left"
  checked={enabled}
  onChange={setEnabled}
/>

## Cross-references
- CheckboxBox (standalone visual box)
- Radiobutton (mutually exclusive choices)
- Switcher (toggle with immediate effect)
- FormField (label/hint wrapper)
- specs/components/checkbox.md
