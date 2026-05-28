# ButtonInputGroup

Category: input / compound
React: <ButtonInputGroup>
Spec: specs/components/button-input-group.md
TSX: apps/storybook/src/stories/button-input-group/ButtonInputGroup.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-buttoninputgroup--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6595-15608

--------------------------------------------
## State implementation contract

Button segments use overlay tokens for hover/pressed
(transparent surface). Input segment has no container
hover — only focus-visible with inset ring.

- Button hover: bg → `--dls-state-hover-overlay`
- Button pressed: bg → `--dls-state-pressed-overlay`
- Button focus-visible: inset ring →
  `--dls-state-focus-ring-color`
- Input focus-visible: inset ring →
  `--dls-state-focus-ring-color`
- Disabled: container bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Combined input field with attached action buttons on one
or both sides. Used for increment/decrement, apply, copy,
or other input-adjacent actions.

## Use when
- Input with attached action button (apply, copy, go).
- Increment/decrement stepper control.
- Input with action on one or both sides.
- Compact input + button combination in tight layouts.

## Do NOT use for
- Search with icon — use SearchField.
- Input with slot content (badges, labels) — use SlotInput.
- Multiple grouped buttons without input — use ButtonGroup.
- Form field with label and hint — wrap in FormField.

## Figma → Code mapping

### Figma component set: button-input (6595:15608)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| location         | location         | Direct mapping: start, end, both. |
| size             | size             | Figma uppercase M/S. In code, lowercase m/s. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| buttonLabel      | string or [start, end] tuple. Figma shows fixed "Button" text. |
| onStartClick     | Start button click handler. |
| onEndClick       | End button click handler. |
| startDisabled    | Disable start button independently. |
| endDisabled      | Disable end button independently. |
| disabled         | Disables entire component. |
| className        | Layout composition only. |

Notes:
- Figma shows fixed "Button" text in button segments.
  In code, buttonLabel prop controls the text and supports
  separate labels via tuple [start, end].
- Standard input HTML attributes are spread to the
  inner <input> element.

## Anatomy
1. Root wrapper — <div class="dls-button-input-group">,
   inline-flex container with shared border and radius.
   overflow: hidden clips child radii.
2. Start button — <button class="dls-button-input-group__button">,
   optional. Shows when location is "start" or "both".
3. Divider — <span class="dls-button-input-group__divider">,
   1px vertical separator between button and input.
4. Input — <input class="dls-button-input-group__input">,
   flex: 1. Native input with forwarded ref.
5. Divider — same as above, before end button.
6. End button — same as start button. Shows when location
   is "end" or "both".

## Props / API
- buttonLabel    string | [string, string], required.
- location       "start" | "end" | "both", default "start".
- size           "s" | "m", default "m".
- onStartClick   MouseEventHandler, optional.
- onEndClick     MouseEventHandler, optional.
- startDisabled  boolean, optional.
- endDisabled    boolean, optional.
- disabled       boolean, optional.
- className      string, optional.
- Ref forwarded to <input>.
- Extends Omit<React.InputHTMLAttributes, 'size'>.

## Tokens used
L4 component tokens (shared with InputField):
- --dls-color-component-input-bg-base
- --dls-color-component-input-bg-disabled
- --dls-color-component-input-fg-base
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-fg-disabled
- --dls-color-component-input-border-base
- --dls-color-component-input-border-disabled
- --dls-radius-component-input

L2/L3 semantic tokens:
- --dls-color-text-primary (button text)
- --dls-color-text-disabled (disabled button text)
- --dls-color-surface-subtle (button background)
- --dls-state-hover-overlay (button hover)
- --dls-state-pressed-overlay (button pressed)
- --dls-state-focus-ring-color (focus ring, inset)

## States

### Figma representation (button-input)
No state property on the component. Location and size
only. Button states inherit from button-soft styling.

### Code implementation
- Button :hover:not(:disabled) — overlay hover bg.
- Button :active:not(:disabled) — overlay pressed bg.
- Button :focus-visible — inset focus ring via box-shadow.
  z-index: 1 for stacking.
- Input :focus-visible — inset focus ring via box-shadow.
  z-index: 1 for stacking.
- Button :disabled — disabled text + disabled bg.
- [data-disabled] on container — disabled bg + border on
  entire component.
- Transition: background-color 150ms ease on button.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Buttons are native <button type="button"> elements.
- Button text provides accessible name from buttonLabel.
- Input is a native <input> with forwarded ref.
- Standard input attributes (placeholder, aria-label, etc.)
  passed through via ...inputProps spread.
- Keyboard: Tab moves between buttons and input naturally.
  Enter/Space activates focused button.
- Focus-visible uses inset box-shadow ring on both buttons
  and input.
- Respects prefers-reduced-motion.

## Composition rules
- ButtonInputGroup is self-contained. Do not nest other
  components inside it.
- For labels and hints, wrap in FormField.
- For increment/decrement, use buttonLabel={['−', '+']}
  with location="both".
- For single action, use location="start" or "end".
- Do not use for input with icon slots — use SlotInput.

## Known deviations
- Figma shows fixed "Button" text. In code, buttonLabel
  prop controls the text and supports tuple for separate
  start/end labels. Severity: low.

## Code example
<ButtonInputGroup
  buttonLabel="Apply"
  location="end"
  size="m"
  placeholder="Enter code"
  onEndClick={handleApply}
/>

<ButtonInputGroup
  buttonLabel={['−', '+']}
  location="both"
  value={count}
  onStartClick={() => setCount(c => c - 1)}
  onEndClick={() => setCount(c => c + 1)}
/>

## Cross-references
- Button (standalone action)
- ButtonGroup (grouped buttons without input)
- InputField (standalone input)
- SlotInput (input with icon/content slots)
- FormField (label/hint wrapper)
- specs/components/button-input-group.md
