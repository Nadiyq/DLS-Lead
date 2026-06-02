# SwitcherBox

Category: form control / card
React: <SwitcherBox>
Spec: specs/components/switcher-box.md
TSX: apps/storybook/src/stories/switcher/SwitcherBox.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-switcherbox--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6602-8812

--------------------------------------------
## State implementation contract

Overlay state model. The box is a transparent surface
(border-only when unselected, light overlay when selected).
Hover/pressed use overlay tokens on the box level. The inner
Switcher handles its own hybrid state model independently.

- Unselected hover: bg → `--dls-state-hover-overlay`
- Selected normal: bg → `--dls-state-pressed-overlay`,
  border → `--dls-color-border-focus`
- Selected hover: bg → `--dls-state-pressed-overlay`
  (retains selected appearance)
- Focus-within: ring → `--dls-state-focus-ring-color`
  (0 0 0 3px box-shadow)
- Disabled: border → `--dls-color-border-disabled`,
  pointer-events: none
- Disabled selected: bg → `--dls-color-surface-disabled`
--------------------------------------------

## Purpose
Card-style toggle container wrapping a Switcher with label
and description. Used to make a toggle control more visually
prominent or for better visual consistency with surrounding
elements like buttons and filters. Same box pattern is shared
across CheckboxBox, RadiobuttonBox, and SwitcherBox.

## Use when
- Toggle needs visual prominence in a card layout.
- Group of toggle options needs bordered consistency.
- Settings panels where each option is a distinct card.

## Do NOT use for
- Inline toggles without card treatment — use Switcher.
- Multi-select cards — use CheckboxBox.
- Mutually exclusive card selection — use RadiobuttonBox.

## Figma → Code mapping

### Figma component set: switcher-box (6602:8812)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| selected         | checked          | true → checked=true, false → checked=false. |
| state            | —                | Figma-only visual state (normal/hover/focus/pressed/disabled). CSS pseudo-classes + disabled prop in code. |
| textOrientation  | textOrientation  | "right" (default) / "left". |
| description      | —                | Boolean toggle in Figma. In code, description presence is controlled by passing or omitting the description string prop. |
| descriptionText  | description      | String content. Figma separates visibility from content; code uses a single optional string. |
| label            | label            | String content. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| checked          | boolean, default false. |
| disabled         | boolean, default false. |
| label            | string, optional. Label text. |
| description      | string, optional. Description below label. |
| textOrientation  | "right" | "left", default "right". |
| onChange          | (checked: boolean) => void, optional. |
| name             | string, optional. Passed to inner Switcher. |
| value            | string, optional. Passed to inner Switcher. |
| className        | string, optional. |

Notes:
- Figma uses separate `description` (boolean) and
  `descriptionText` (string) properties. In code, these
  are a single optional `description` string prop — presence
  controls visibility.
- `state` in Figma is visual only. In code, states come
  from CSS pseudo-classes and the disabled prop.

## Anatomy
1. Root — <div class="dls-switcher-box" role="switch">,
   the card container. data-selected when checked,
   data-disabled when disabled,
   data-text-orientation="left" when reversed.
2. Inner Switcher — <Switcher> without label/description,
   provides the visual toggle. Cursor inherited from box.
3. Text block — <div class="dls-switcher-box__text">,
   contains label and description. Only rendered when
   label or description is provided.
4. Label — <span class="dls-switcher-box__label">,
   medium text, primary color.
5. Description — <span class="dls-switcher-box__description">,
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
- Ref forwarded to root <div>.

## Tokens used
L4 component token:
- --dls-radius-component-toggle-box (shared with
  CheckboxBox and RadiobuttonBox)

L2 semantic tokens:
- --dls-color-border-base (unselected border)
- --dls-color-border-focus (selected border)
- --dls-color-border-disabled (disabled border)
- --dls-color-surface-disabled (disabled selected bg)
- --dls-color-text-primary (label text)
- --dls-color-text-secondary (description text)
- --dls-color-text-disabled (disabled text)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-pressed-overlay (selected bg)
- --dls-state-focus-ring-color (focus ring)

Typography/spacing:
- --dls-spacing-1, --dls-spacing-2, --dls-spacing-2-5,
  --dls-spacing-3
- --dls-font-family
- --dls-text-m-font-size, --dls-text-m-line-height
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-font-weight-normal

## States

### Figma representation (switcher-box 6602:8812)
- selected: true / false
- state: normal / hover / focus / pressed / disabled
- textOrientation: right / left

### Code implementation
- Unselected normal — border-base, no bg.
- Selected normal — pressed-overlay bg, border-focus.
- :hover:not([data-disabled]) — hover-overlay bg.
- Selected :hover:not([data-disabled]) — pressed-overlay bg
  (retains selected appearance).
- :focus-within:not([data-disabled]) — box-shadow ring.
- [data-disabled] — disabled border, no pointer events.
- [data-disabled][data-selected] — disabled surface bg.
- Transition: background 150ms ease, border-color 150ms ease.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Root <div> has role="switch" with aria-checked and
  aria-disabled.
- tabIndex={0} when enabled, tabIndex={-1} when disabled.
- Keyboard: Space and Enter toggle checked.
- Contains inner Switcher (hidden from tab order by box's
  role taking precedence).
- Focus-within uses external box-shadow ring.
- When no visible label provided, aria-label is required
  on the box.
- Respects prefers-reduced-motion.

## Composition rules
- SwitcherBox is self-contained. Do not nest other
  components inside it.
- For groups of toggle boxes, use a <fieldset> with
  <legend>.
- Use Switcher when card treatment is not needed.
- Shared box pattern: same --dls-radius-component-toggle-box
  token is used by CheckboxBox and RadiobuttonBox.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  and L3 state tokens directly. Only
  --dls-radius-component-toggle-box exists as L4.
  Severity: low.

## Code example
<SwitcherBox
  label="Dark mode"
  description="Use dark theme"
  checked={darkMode}
  onChange={setDarkMode}
/>

<!-- Selected -->
<SwitcherBox
  label="Email notifications"
  description="Receive updates via email"
  checked={true}
  onChange={toggle}
/>

<!-- Left-oriented text -->
<SwitcherBox
  label="Enable feature"
  textOrientation="left"
  checked={enabled}
  onChange={setEnabled}
/>

## Cross-references
- Switcher (inline toggle without card)
- CheckboxBox (multi-select card)
- RadiobuttonBox (exclusive-select card)
- FormField (label/hint wrapper)
- specs/components/switcher-box.md
