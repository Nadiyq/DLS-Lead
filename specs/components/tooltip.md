---
name: Tooltip
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/tooltip/Tooltip.tsx
  - apps/storybook/src/stories/tooltip/tooltip.css
  - apps/storybook/src/stories/tooltip/Tooltip.stories.tsx
  - tokens/tokens.json
---

# Tooltip

## Metadata

- Category: overlay / informational
- Types: `general | error`
- Orientations: `top-left | top-center | top-right | bottom-left | bottom-center | bottom-right | left | right`
- Figma properties: `intent`, `orientation`, `Text`, `pointer`, `slot`, `slot-content`

## Overview

Use `Tooltip` for brief contextual help attached to a trigger, such as
icon explanations, control clarifications, compact status hints, or
keyboard shortcuts. The component renders the tooltip body and arrow;
the consumer owns trigger wiring, placement, visibility, and collision
handling.

Use `type="general"` for informational guidance and contextual help.
Use `type="error"` only for validation failures, unavailable actions,
or invalid states.

Do not use Tooltip for critical information, required error recovery,
long-form instructions, forms, buttons, links, or content the user must
acknowledge. Use Alert, Inline Validation Message, Dialog, or
AlertDialog instead depending on severity and interaction model.

## Anatomy

- Root - `<div class="dls-tooltip" role="tooltip">`
- Body - text and optional trailing slot content
- Text - short tooltip message
- Slot content - optional compact supporting content, usually `Kbd` or
  `KbdGroup`
- Arrow - decorative CSS triangle positioned by orientation

## Tokens Used

- `--dls-font-family`
- `--dls-font-weight-normal`
- `--dls-radius-component-tooltip`
- `--dls-spacing-1-5`
- `--dls-spacing-2`
- `--dls-text-m-font-size`
- `--dls-text-m-line-height`
- `--dls-color-surface-base`
- `--dls-color-border-subtle`
- `--dls-color-text-primary`
- `--dls-color-intent-danger-subtle`
- `--dls-color-intent-danger-border`
- `--dls-shadow-surface-sm`

## Props / API

- `type` - visual type, default `general`.
  Values: `general | error`.
- `orientation` - arrow orientation relative to the body, default
  `top-center`.
  Values: `top-left | top-center | top-right | bottom-left |
  bottom-center | bottom-right | left | right`.
- `text` - required tooltip copy.
- `slotContent` - optional trailing content such as `Kbd` shortcuts,
  compact icons, badges, or metadata.
- `className` - additional CSS class on the root.

`TooltipProps` extends `React.HTMLAttributes<HTMLDivElement>`, so
consumers may pass root attributes such as `id`, `aria-describedby`,
or `data-*` when composing a trigger and tooltip pair.

## States

- Type - `general | error`
- Orientation - all eight arrow positions
- Slot presence - `slotContent` may be omitted

Tooltip is a passive display surface. It does not define hover,
pressed, selected, disabled, or focus-visible states on the root.
Visibility is controlled by the trigger/positioning layer.

## Figma Representation

The Figma component set at node `62:3906` represents a matrix of two
intents and eight orientations:

- `intent=general` -> `type="general"`
- `intent=error` -> `type="error"`
- `orientation` maps directly to the React `orientation` prop
- `Text` text override -> React `text`
- `slot=true` and `slot-content` -> provide `slotContent`
- `pointer=true` -> code default arrow

Figma exposes `pointer` as a boolean control. Code always renders the
decorative arrow, so hiding the pointer is a Figma-only composition
option today.

## Accessibility Contract

- Root uses `role="tooltip"`.
- The trigger should reference the tooltip with `aria-describedby` when
  the tooltip is visible or available to assistive technology.
- Tooltip content must be reachable through keyboard focus on the
  associated trigger, not hover only.
- Tooltips must not contain interactive controls.
- Tooltip text should be concise, normally one short sentence.
- The arrow is decorative and hidden from assistive technology.
- Do not rely on tooltip content as the only way to complete a task or
  understand a required error.

## Composition Rules

- Use plain text as the primary content.
- Use `slotContent` only for compact supporting content such as `Kbd`,
  `KbdGroup`, small status indicators, badges, icons, or metadata.
- Do not place buttons, links, forms, menus, or nested overlays inside
  Tooltip.
- Do not use Tooltip as a persistent error message for required form
  validation.
- Let the trigger/positioning layer handle open/close behavior,
  viewport collision, and touch interaction policy.

## Known Deviations

- No L4 color component tokens exist in `tokens.json` for Tooltip.
  Code and Figma use semantic surface, border, text, danger, and shadow
  tokens directly. Only `--dls-radius-component-tooltip` is
  component-scoped.
- Figma exposes a `pointer` boolean. Code always renders the
  decorative arrow.
- Figma separates `slot` visibility from the `slot-content` target.
  Code derives slot visibility from whether `slotContent` is provided.
- Figma uses the property name `intent`; code uses `type` to match the
  existing documented Storybook API.
- Trigger behavior, positioning, and viewport collision handling are
  consumer responsibilities in code.

## Code Example

```tsx
<Tooltip text="Save changes" orientation="top-center" />

<Tooltip
  text="Save changes"
  orientation="top-center"
  slotContent={
    <KbdGroup type="separated">
      <Kbd>Ctrl</Kbd>
      <Kbd>S</Kbd>
    </KbdGroup>
  }
/>
```

## Cross-References

- [kbd.md](kbd.md)
- [alert.md](alert.md)
- [alert-dialog.md](alert-dialog.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
