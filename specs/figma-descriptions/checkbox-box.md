# CheckboxBox

Category: form control / card
React: <CheckboxBox>
Spec: specs/components/checkbox-box.md
TSX: apps/storybook/src/stories/checkbox/CheckboxBox.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-checkboxbox--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6602-6368

--------------------------------------------
## State implementation contract

Container uses overlay tokens for hover and selected
background. Non-filled surface.

- Unselected: border → `--dls-color-border-base`
- Selected: bg → `--dls-state-pressed-overlay`,
  border → `--dls-color-border-focus`
- Hover: bg → `--dls-state-hover-overlay`
- Selected hover: bg → `--dls-state-pressed-overlay`
  (unchanged)
- Focus-within: ring → `--dls-state-focus-ring-color`
  (0 0 0 3px box-shadow)
- Disabled: border → `--dls-color-border-disabled`,
  pointer-events none
- Disabled + selected: bg → `--dls-color-surface-disabled`
--------------------------------------------

## Purpose
Card-style checkbox selection — a bordered box wrapping
a Checkbox with label and description. Used to make the
control more visually prominent or for better visual
consistency with surrounding elements like buttons and
filters. Same box pattern is used for all toggles —
checkboxes, radiobuttons, and switchers.

## Use when
- Visually prominent checkbox selections in card layouts.
- Settings panels with toggle options.
- Multi-select card grids.
- Consistent with RadiobuttonBox and SwitcherBox toggle
  patterns.

## Do NOT use for
- Simple inline checkbox — use Checkbox.
- Mutually exclusive card selections — use RadiobuttonBox.
- Toggle with immediate effect card — use SwitcherBox.
- Small inline toggles — use Checkbox or Switcher.

## Figma → Code mapping

### Figma component set: checkbox-box (6602:6368)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| selected         | checked          | Boolean. Figma "selected" → code "checked". |
| state            | —                | Figma-only (normal/hover/focus/pressed/disabled). CSS pseudo-classes + disabled prop in code. |
| textOrientation  | textOrientation  | Direct mapping: right, left. |
| label            | label            | Editable text in Figma. String prop in code. |
| description      | —                | Boolean toggle in Figma (show/hide). In code, presence of description string controls visibility. |
| descriptionText  | description      | Editable text in Figma. description string prop in code. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| checked          | boolean, default false. |
| disabled         | boolean, default false. |
| label            | string, optional. |
| description      | string, optional. |
| textOrientation  | "right" | "left", default "right". |
| onChange          | (checked: boolean) => void, optional. |
| name             | string, optional. |
| value            | string, optional. |
| className        | string, optional. |

Notes:
- Figma has separate description (boolean) and
  descriptionText (string) properties. In code, a single
  description string prop controls both visibility and
  content.
- Figma "selected" maps to code "checked".
- The internal Checkbox component handles the check/minus
  icon rendering.

## Anatomy
1. Root — <div class="dls-checkbox-box" role="checkbox">,
   interactive container with border and padding.
   data-selected, data-disabled, data-text-orientation
   attributes.
2. Checkbox — embedded <Checkbox> component (internal).
   Handles the visual box and check/minus icon.
3. Text block — <div class="dls-checkbox-box__text">,
   contains label and description.
4. Label — <span class="dls-checkbox-box__label">,
   medium text, primary color.
5. Description — <span class="dls-checkbox-box__description">,
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
L4 component token (shared):
- --dls-radius-component-toggle-box

L2 semantic tokens:
- --dls-color-border-base (unselected border)
- --dls-color-border-focus (selected border)
- --dls-color-border-disabled (disabled border)
- --dls-color-surface-disabled (disabled + selected bg)
- --dls-color-text-primary (label)
- --dls-color-text-secondary (description)
- --dls-color-text-disabled (disabled text)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-pressed-overlay (selected bg)
- --dls-state-focus-ring-color (focus ring)

Spacing/typography:
- --dls-spacing-1, --dls-spacing-2, --dls-spacing-2-5,
  --dls-spacing-3
- --dls-font-family
- --dls-text-m-font-size, --dls-text-m-line-height
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-font-weight-normal

## States

### Figma representation (checkbox-box 6602:6368)
- selected: true / false
- state: normal / hover / focus / pressed / disabled
- textOrientation: right / left

### Code implementation
- :hover:not([data-disabled]) — hover overlay bg.
- [data-selected]:hover:not([data-disabled]) — pressed
  overlay bg (unchanged from selected base).
- :focus-within:not([data-disabled]) — box-shadow focus
  ring (0 0 0 3px).
- [data-selected] — pressed overlay bg + focus border.
- [data-disabled] — disabled border, no pointer events.
- [data-disabled][data-selected] — disabled surface bg.
- Transition: background 150ms ease, border-color 150ms
  ease. Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Root has role="checkbox" with aria-checked and
  aria-disabled.
- tabIndex=0 for keyboard access (tabIndex=-1 when disabled).
- Keyboard: Space and Enter toggle checked state.
- Contains an internal Checkbox with hidden native input.
- Focus ring appears via :focus-within on the container.
- Disabled uses aria-disabled, pointer-events: none, and
  cursor: not-allowed.
- Respects prefers-reduced-motion.

## Composition rules
- CheckboxBox wraps an internal Checkbox component.
  Do not nest additional components.
- For groups, stack CheckboxBox items vertically with
  consistent spacing.
- Use the same toggle-box pattern (CheckboxBox,
  RadiobuttonBox, SwitcherBox) within a single group.
- Do not mix with inline Checkbox in the same group.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  tokens directly. --dls-radius-component-toggle-box is
  shared across all toggle box variants. Severity: low.

## Code example
<CheckboxBox
  label="Email notifications"
  description="Receive updates via email"
  checked={emailAlerts}
  onChange={setEmailAlerts}
/>

<!-- Left-oriented text -->
<CheckboxBox
  label="Enable feature"
  description="Turn on this option"
  textOrientation="left"
  checked={enabled}
  onChange={setEnabled}
/>

<!-- Disabled -->
<CheckboxBox
  label="Premium feature"
  description="Upgrade to unlock"
  disabled
/>

## Cross-references
- Checkbox (inline checkbox without box)
- RadiobuttonBox (mutually exclusive card selection)
- SwitcherBox (toggle with immediate effect card)
- FormField (label/hint wrapper)
- specs/components/checkbox-box.md
