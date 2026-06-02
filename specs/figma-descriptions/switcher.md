# Switcher

Category: form control
React: <Switcher>
Spec: specs/components/switcher.md
TSX: apps/storybook/src/stories/switcher/Switcher.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-switcher--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=59-7103

--------------------------------------------
## State implementation contract

Hybrid state model. Unchecked track uses overlay tokens
for hover/pressed (transparent surface over subtle bg).
Checked track uses OKLCH L-shift on neutral-base fill.

- Unchecked hover: bg → `--dls-state-hover-overlay`
- Unchecked pressed: bg → `--dls-state-pressed-overlay`
- Checked hover: bg → OKLCH shift
  (l + `--dls-state-l-delta-hover`) on
  `--dls-color-intent-neutral-base`
- Checked pressed: bg → OKLCH shift
  (l + `--dls-state-l-delta-pressed`) on
  `--dls-color-intent-neutral-base`
- Focus-visible: ring → `--dls-state-focus-ring-color`
  (0 0 0 3px box-shadow)
- Disabled: bg → `--dls-color-surface-disabled`,
  border → `--dls-color-border-disabled`,
  toggle → `--dls-color-text-disabled`
--------------------------------------------

## Purpose
On/off toggle control rendered as a native checkbox with
role="switch". Supports label, description, and text
orientation. The toggle slides right when checked and
the track fills with the neutral base color.

## Use when
- Immediate on/off toggles (notifications, features).
- Settings that take effect right away.
- Single binary choice with visual toggle feedback.

## Do NOT use for
- Multi-option selection — use Checkbox.
- Mutually exclusive choices — use Radiobutton.
- Form submission toggles that only apply on save —
  prefer Checkbox for deferred-submit forms.

## Figma → Code mapping

### Figma component set: switcher (59:7103)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| selected       | checked          | true → checked=true, false → checked=false. |
| state          | —                | Figma-only visual state (normal/hover/focus/pressed/disabled). CSS pseudo-classes + disabled prop in code. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| checked          | boolean, default false. |
| disabled         | boolean, default false. |
| label            | string, optional. Label text. |
| description      | string, optional. Description below label. |
| textOrientation  | "right" | "left", default "right". |
| onChange          | (checked: boolean) => void, optional. |
| name             | string, optional. Native name attribute. |
| value            | string, optional. Native value attribute. |
| className        | string, optional. |

Notes:
- Figma component shows only the switch track + toggle.
  Label and description are code-only — in Figma, label
  composition happens at the usage level.
- `state` in Figma is visual only. In code, states come
  from native pseudo-classes — never a prop, never
  .is-* classes.

## Anatomy
1. Root — <label class="dls-switcher">, wrapping click
   target. data-text-orientation="left" when reversed.
2. Hidden input — <input type="checkbox" role="switch"
   class="dls-switcher__input">, visually hidden but
   functionally active. Forwarded ref.
3. Track wrapper — <span class="dls-switcher__track-wrapper">,
   aligns switch to first line of text.
4. Track — <span class="dls-switcher__track">, 32×18px
   pill shape with component radius. Contains toggle.
5. Toggle — <span class="dls-switcher__toggle">, 14×14px
   circle that slides right when checked (translateX 14px).
6. Text block — <span class="dls-switcher__text">,
   contains label and description. Only rendered when
   label or description is provided.
7. Label — <span class="dls-switcher__label">, medium
   text, primary color.
8. Description — <span class="dls-switcher__description">,
   small text, secondary color.

## Props / API
- checked          boolean, default false.
- disabled         boolean, default false.
- label            string, optional.
- description      string, optional.
- textOrientation  "right" | "left", default "right".
- onChange          (checked: boolean) => void, optional.
- name             string, optional.
- value            string, optional.
- className        string, optional.
- Ref forwarded to <input>.

## Tokens used
L4 component token:
- --dls-radius-component-switcher

Intent tokens:
- --dls-color-intent-neutral-base (checked track bg)
- --dls-color-intent-neutral-on-base (checked toggle color)
- --dls-color-intent-neutral-text (unchecked toggle color)
- --dls-color-intent-neutral-subtle (unchecked track bg)

L2 semantic tokens:
- --dls-color-surface-disabled (disabled track bg)
- --dls-color-border-base (unchecked track border)
- --dls-color-border-disabled (disabled track border)
- --dls-color-text-primary (label text)
- --dls-color-text-secondary (description text)
- --dls-color-text-disabled (disabled toggle + text)

L3 state tokens:
- --dls-state-hover-overlay (unchecked hover)
- --dls-state-pressed-overlay (unchecked pressed)
- --dls-state-l-delta-hover (checked hover OKLCH shift)
- --dls-state-l-delta-pressed (checked pressed OKLCH shift)
- --dls-state-focus-ring-color (focus ring)

Typography/spacing:
- --dls-spacing-1, --dls-spacing-2
- --dls-font-family
- --dls-text-m-font-size, --dls-text-m-line-height
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-font-weight-normal

## States

### Figma representation (switcher 59:7103)
- selected: true / false
- state: normal / hover / focus / pressed / disabled

### Code implementation
- Unchecked :hover:not(:disabled) — overlay hover bg.
- Unchecked :active:not(:disabled) — overlay pressed bg.
- Checked :hover:not(:disabled) — OKLCH L-shift hover on
  neutral-base.
- Checked :active:not(:disabled) — OKLCH L-shift pressed
  on neutral-base.
- :focus-visible — external box-shadow ring (0 0 0 3px).
- :disabled — disabled surface, border, and text tokens.
  Toggle stays at correct position for checked state.
- Transition: background 150ms ease, border-color 150ms
  ease on track. transform 150ms ease, background 150ms
  ease on toggle.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Uses native <input type="checkbox" role="switch">
  (visually hidden but functionally active).
- Wrapped in <label> element for click-target association.
- Native :checked state via DOM API.
- When no visible label provided, aria-label is required
  on the input.
- Keyboard: Space toggles checked. Tab moves focus.
- Focus-visible uses external box-shadow ring.
- Disabled uses native disabled attribute.
- Respects prefers-reduced-motion.

## Composition rules
- Switcher is self-contained. Do not nest other components.
- For labeled forms, wrap in FormField for labels/hints.
- For groups of switchers, use a <fieldset> with <legend>.
- Use SwitcherBox for a standalone switch without label/desc.
- Use textOrientation="left" for left-aligned labels
  (e.g., in settings lists).

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  and intent tokens directly. Only
  --dls-radius-component-switcher exists as L4.
  Severity: low.
- Figma component (59:7103) shows only the track + toggle.
  Label and description are code-only props. Figma composes
  the full control at usage level. Severity: low.

## Code example
<Switcher
  label="Notifications"
  checked={enabled}
  onChange={setEnabled}
/>

<!-- With description -->
<Switcher
  label="Email notifications"
  description="Receive updates via email"
  checked={emailEnabled}
  onChange={setEmailEnabled}
/>

<!-- Without label (requires aria-label) -->
<Switcher checked aria-label="Toggle feature" />

<!-- Left-oriented text -->
<Switcher
  label="Enable feature"
  textOrientation="left"
  checked={enabled}
  onChange={setEnabled}
/>

## Cross-references
- SwitcherBox (standalone visual switch)
- Checkbox (binary selection, deferred submit)
- Radiobutton (mutually exclusive choices)
- FormField (label/hint wrapper)
- specs/components/switcher.md
