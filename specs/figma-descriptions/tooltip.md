# Tooltip

Category: overlay / informational
React: <Tooltip>
Spec: specs/components/tooltip.md
TSX: apps/storybook/src/stories/tooltip/Tooltip.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tooltip--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=62-3906

--------------------------------------------
## State implementation contract

Tooltip is a passive contextual help surface. The component renders the
tooltip body and decorative arrow; trigger behavior, placement,
visibility, and collision handling are owned by the consumer or
positioning layer.

- Root: `<div class="dls-tooltip" role="tooltip">`
- Type: `type="general | error"`; Figma calls this `intent`
- Orientation: `data-orientation`, all eight arrow positions
- Text: required short message
- Slot: optional compact trailing content, usually `Kbd` or `KbdGroup`
- Arrow: decorative CSS triangle, hidden from assistive technology
- Motion: none in Tooltip CSS
--------------------------------------------

## Purpose

Provides brief explanatory information for an associated UI element
without interrupting the workflow. Use Tooltip for concise hints,
control clarifications, unavailable-action explanations, and keyboard
shortcuts.

## Use when

- Explaining icons or controls that do not have visible labels.
- Clarifying an action, status, or compact UI affordance.
- Showing a keyboard shortcut next to a short hint.
- Explaining why a control is unavailable.
- Providing helpful context that is not required to complete the task.

## Do NOT use for

- Critical information users must see.
- Required form errors or recovery steps - use inline validation,
  Alert, Dialog, or AlertDialog.
- Long-form instructions or documentation.
- Interactive content such as buttons, links, forms, or menus.
- Content users must acknowledge before continuing.

## Figma -> Code mapping

### Figma component set: tooltip (62:3906)

| Figma property | React prop | Values / Notes |
|---|---|---|
| intent | type | general -> `general`, error -> `error`. |
| orientation | orientation | top-center, top-left, top-right, left, right, bottom-center, bottom-left, bottom-right. |
| Text | text | Text override maps to the required React `text` string. |
| slot | slotContent | true -> provide compact `slotContent`; false -> omit `slotContent`. |
| slot-content | slotContent | Figma slot target. Recommended inserted content: Kbd, KbdGroup, small badge, status indicator, icon, or compact metadata. |
| pointer | - | Figma-only arrow visibility toggle. Code always renders the decorative arrow. |
| - | className | Code-only root class extension. |

Notes:
- Figma uses the property name `intent`; code keeps the documented
  `type` prop.
- Figma separates slot visibility from the slot target. Code derives
  visibility from whether `slotContent` is provided.
- The Figma pointer can be hidden. Code always renders the tooltip
  arrow.

## Anatomy

1. Root - `<div class="dls-tooltip" role="tooltip">`.
2. Body - inline-flex text surface.
3. Text - required short message.
4. Slot content - optional compact trailing content.
5. Arrow - decorative CSS triangle positioned by orientation.

## Props / API

- type          TooltipType, optional. Default `general`.
  Values: general, error.
- orientation   TooltipOrientation, optional. Default `top-center`.
  Values: top-center, top-left, top-right, bottom-center, bottom-left,
  bottom-right, left, right.
- text          string, required. Tooltip message.
- slotContent   ReactNode, optional. Compact trailing content.
- className     string, optional. Additional root class.
- Ref forwarded to root `<div>`.
- Extends `React.HTMLAttributes<HTMLDivElement>` for root attributes.

## Tokens used

Component token:
- --dls-radius-component-tooltip

Foundation / semantic tokens:
- --dls-font-family
- --dls-font-weight-normal
- --dls-spacing-1-5
- --dls-spacing-2
- --dls-text-m-font-size
- --dls-text-m-line-height
- --dls-color-surface-base
- --dls-color-border-subtle
- --dls-color-text-primary
- --dls-color-intent-danger-subtle
- --dls-color-intent-danger-border
- --dls-shadow-surface-sm

## States

### Figma representation

- intent: general / error
- orientation: top-center / top-left / top-right / left / right /
  bottom-center / bottom-left / bottom-right
- pointer: true / false
- slot: true / false

### Code implementation

- General type is the default base surface.
- Error type uses `data-type="error"`.
- Orientation uses `data-orientation`.
- Slot renders only when `slotContent` exists.
- Root has no hover, pressed, selected, disabled, or focus visual
  state.
- Trigger open/close and focus behavior are consumer responsibilities.

## Accessibility contract

- Root uses `role="tooltip"`.
- The trigger should reference the tooltip with `aria-describedby`.
- Tooltip content must be available through keyboard focus on the
  trigger, not hover only.
- Do not place interactive controls inside Tooltip.
- Keep content concise, normally one short sentence.
- The arrow is decorative and hidden from assistive technology.
- Do not make Tooltip the only source of critical task information.

## Composition rules

- Use short text as the primary content.
- Use slot content only for compact supporting elements such as `Kbd`,
  `KbdGroup`, icons, badges, status indicators, or metadata.
- Do not nest forms, buttons, links, menus, or other overlays.
- Do not use Tooltip as a persistent validation message.
- Pair error tooltips with accessible field-level error semantics when
  used for validation context.

## Known deviations

- No L4 color component tokens exist in `tokens.json` for Tooltip.
  Code and Figma use semantic surface, border, text, danger, and shadow
  tokens directly. Only `--dls-radius-component-tooltip` is
  component-scoped.
- Figma exposes `pointer`; code always renders the decorative arrow.
- Figma exposes separate `slot` and `slot-content` controls; code uses
  `slotContent` presence.
- Trigger behavior, positioning, visibility, and viewport collision are
  outside the React Tooltip component.

## Code example

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

## Cross-references

- Kbd (keyboard shortcut display)
- Alert (persistent inline status)
- AlertDialog (blocking decision)
- specs/components/tooltip.md
- specs/foundations/accessibility.md
