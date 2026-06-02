# Radiobutton

Category: form control
React: <Radiobutton>
Spec: specs/components/radiobutton.md
TSX: apps/storybook/src/stories/radiobutton/Radiobutton.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-radiobutton--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=59-7022

--------------------------------------------
## State implementation contract

Overlay state model. Both selected and unselected use
overlay tokens for hover/pressed. Circle is always a
non-filled surface.

- Unselected: bg → `--dls-color-surface-base`,
  border → `--dls-color-border-strong`
- Selected: border → `--dls-color-border-focus`,
  dot visible with `--dls-color-surface-inverse`
- Hover (both): bg → `--dls-state-hover-overlay`,
  border → `--dls-color-border-focus`
- Pressed (both): bg → `--dls-state-pressed-overlay`,
  border → `--dls-color-border-focus`
- Focus-visible: ring → `--dls-state-focus-ring-color`
  (0 0 0 3px box-shadow)
- Disabled: bg → `--dls-color-surface-disabled`,
  border → `--dls-color-border-disabled`,
  dot → `--dls-color-text-disabled`
--------------------------------------------

## Purpose
Mutually exclusive single-selection control within a
group. Supports label, description, and text orientation.
Uses a native radio input with a visual circle and inner
dot indicator.

## Use when
- Mutually exclusive single-selection within a group.
- Settings where only one option can be active.
- Plan or tier selection.
- Form fields requiring exactly one choice.

## Do NOT use for
- Binary on/off toggle — use Checkbox or Switcher.
- Multiple simultaneous selections — use Checkbox.
- Navigation or filtering — use Tabs or Dropdown.

## Figma → Code mapping

### Figma component set: radiobutton (59:7022)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| selected         | checked          | Boolean. Figma "selected" → code "checked". |
| state            | —                | Figma-only (normal/hover/focus/disable). CSS pseudo-classes + disabled prop in code. Note: Figma uses "disable" not "disabled". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| checked          | boolean, default false. |
| disabled         | boolean, default false. |
| label            | string, optional. Label text. |
| description      | string, optional. Description below label. |
| textOrientation  | "right" | "left", default "right". |
| onChange          | (checked: boolean) => void, optional. |
| name             | string, optional. Groups radios for mutual exclusion. |
| value            | string, optional. Native value attribute. |
| className        | string, optional. |

Notes:
- Figma component shows only the radio circle. Label and
  description are code-only — in Figma, label composition
  happens at the usage level.
- Figma state value "disable" is "disabled" in code.
- Radio buttons must share the same name prop to form
  a mutually exclusive group.

## Anatomy
1. Root — <label class="dls-radiobutton">, wrapping click
   target. data-text-orientation="left" when reversed.
2. Hidden input — <input type="radio"
   class="dls-radiobutton__input">, visually hidden but
   functionally active. Forwarded ref.
3. Circle wrapper — <span class="dls-radiobutton__circle-wrapper">,
   aligns radio to first line of text.
4. Visual circle — <span class="dls-radiobutton__circle">,
   18×18px with full-round radius.
5. Inner dot — <span class="dls-radiobutton__dot">,
   10×10px circle. display:none when unchecked,
   display:block when checked.
6. Text block — <span class="dls-radiobutton__text">,
   contains label and description.
7. Label — <span class="dls-radiobutton__label">,
   medium text, primary color.
8. Description — <span class="dls-radiobutton__description">,
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
- --dls-radius-component-radiobutton (radius.full = 9999px)

L2 semantic tokens:
- --dls-color-surface-base (unchecked circle bg)
- --dls-color-surface-inverse (inner dot color)
- --dls-color-surface-disabled (disabled circle bg)
- --dls-color-border-strong (unchecked border)
- --dls-color-border-focus (selected + hover border)
- --dls-color-border-disabled (disabled border)
- --dls-color-text-primary (label)
- --dls-color-text-secondary (description)
- --dls-color-text-disabled (disabled text + disabled dot)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-pressed-overlay (pressed bg)
- --dls-state-focus-ring-color (focus ring)

Spacing/typography:
- --dls-spacing-1, --dls-spacing-2
- --dls-font-family
- --dls-text-m-font-size, --dls-text-m-line-height
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-font-weight-normal

## States

### Figma representation (radiobutton 59:7022)
- selected: true / false
- state: normal / hover / focus / disable

### Code implementation
- Unselected :hover:not(:disabled) — overlay hover bg,
  focus border.
- Unselected :active:not(:disabled) — overlay pressed bg,
  focus border.
- Selected :hover:not(:disabled) — overlay hover bg.
- Selected :active:not(:disabled) — overlay pressed bg.
- :checked — focus border, inner dot visible.
- :focus-visible — external box-shadow ring (0 0 0 3px).
- :disabled — disabled surface, border, text, and dot.
- No transitions (dot uses display toggle, not opacity).
  No prefers-reduced-motion needed.

## Accessibility contract
- Uses native <input type="radio"> (visually hidden
  but functionally active).
- Wrapped in <label> element for click-target association.
- Native :checked state for selection.
- Radios sharing the same name form a native radio group.
- Keyboard: Arrow keys move selection within group.
  Space selects focused radio. Tab moves to/from group.
- Focus-visible uses external box-shadow ring.
- Disabled uses native disabled attribute.

## Composition rules
- Radiobutton is self-contained. Do not nest other
  components.
- Group radio buttons in a container with role="radiogroup".
- All radios in a group must share the same name prop.
- For labeled forms, wrap group in FormField.
- Use RadiobuttonBox for card-style radio selections.
- Use textOrientation="left" for right-aligned radios.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  tokens directly. Only --dls-radius-component-radiobutton
  exists as L4. Severity: low.
- Figma component (59:7022) shows only the circle. Label
  and description are code-only props. Severity: low.
- Figma uses "disable" (no d) for the disabled state value.
  Code uses "disabled". Severity: low.

## Code example
<div role="radiogroup">
  <Radiobutton
    name="plan"
    value="standard"
    label="Standard plan"
    description="Best for individuals"
    checked={plan === 'standard'}
    onChange={() => setPlan('standard')}
  />
  <Radiobutton
    name="plan"
    value="pro"
    label="Pro plan"
    description="Best for teams"
    checked={plan === 'pro'}
    onChange={() => setPlan('pro')}
  />
</div>

<!-- Left-oriented text -->
<Radiobutton
  label="Option"
  textOrientation="left"
  checked
/>

## Cross-references
- RadiobuttonBox (card-style radio selection)
- Checkbox (multi-select alternative)
- Switcher (toggle with immediate effect)
- FormField (label/hint wrapper)
- specs/components/radiobutton.md
