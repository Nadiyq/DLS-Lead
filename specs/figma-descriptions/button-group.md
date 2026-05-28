# ButtonGroup

Category: action
React: <ButtonGroup>
Spec: specs/components/button-group.md
TSX: apps/storybook/src/stories/button-group/ButtonGroup.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-buttongroup--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6464-794

--------------------------------------------
## State implementation contract

ButtonGroup is a layout wrapper. No hover/focus/pressed
states on the container itself — individual child Button
components handle their own states.
--------------------------------------------

## Purpose
Groups related buttons into a unified segmented control.
All children share the same variant, size, and visual
treatment. Clips child button radii and adds dividers
between them.

## Use when
- Segmented controls (view switcher, mode toggle).
- Pagination controls.
- Toolbar actions grouped together.
- Split actions (primary + dropdown).
- Formatting controls (bold, italic, underline).

## Do NOT use for
- Unrelated actions — use standalone Buttons.
- Mixed variants — all buttons in a group share the same
  style.
- Navigation tabs — use Tabs.
- Toggle between two states — use Switcher.

## Figma → Code mapping

### Figma component set: button-button (6464:794)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| type             | variant          | filled, outline, soft, ghost. Direct mapping. |
| horizontal       | orientation      | Figma boolean. true→"horizontal", false→"vertical". |
| size             | size             | Figma uppercase M/S. In code, lowercase m/s. |
| item3            | (none)           | Figma boolean. In code, controlled by children count. |
| item4            | (none)           | Figma boolean. In code, controlled by children count. |
| item5            | (none)           | Figma boolean. In code, controlled by children count. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| children         | Button elements to group. |
| className        | Layout composition only. |

Notes:
- Figma uses item3/item4/item5 booleans to toggle
  visibility of 3rd through 5th buttons. In code, the
  number of buttons is controlled by the children prop.
  Figma always shows at least 2 buttons.
- Figma uses a "horizontal" boolean. In code, orientation
  uses string values "horizontal" | "vertical".

## Anatomy
1. Root wrapper — <div class="dls-button-group"
   role="group">, inline-flex container with
   overflow: hidden to clip child radii.
2. Child buttons — <Button> components rendered as
   children. Radii reset to 0 by parent. Borders removed
   by parent; group handles dividers.

### Variant anatomy
- **Filled**: group gets neutral-base background. Dividers
  use color-mix(neutral-on-base 20%, transparent).
- **Outline**: group gets 1px neutral-base border. Dividers
  use neutral-base border.
- **Soft**: group gets neutral-subtle background + base
  border. Dividers use base border.
- **Ghost**: transparent background, no dividers.

## Props / API
- variant       "filled" | "outline" | "soft" | "ghost",
                 default "outline".
- orientation   "horizontal" | "vertical",
                 default "horizontal".
- size          "m" | "s", default "m".
- children      ReactNode, required. Button elements.
- className     string, optional. Layout composition only.
- Ref forwarded to root <div>.
- Spreads remaining props to root.

## Tokens used
L4 component tokens:
- --dls-radius-component-button (border radius on container)

L2 semantic / intent tokens:
- --dls-color-intent-neutral-base (filled bg, outline border)
- --dls-color-intent-neutral-on-base (filled divider via
  color-mix)
- --dls-color-intent-neutral-subtle (soft bg)
- --dls-color-border-base (soft border, soft divider)

## States

### Figma representation (button-button)
No state property on the group itself. Child buttons
have their own state property.

### Code implementation
- No interactive states on the group container.
- data-variant controls background, border, and divider
  styling.
- data-orientation controls flex-direction.
- data-size passed for context (child buttons read their
  own size prop).
- Child .dls-button elements get border-radius: 0 and
  border: none from parent CSS.
- No transitions on the container — no reduced-motion
  guard needed.

## Accessibility contract
- Root has role="group" for semantic grouping.
- Consumers should add aria-label when the group purpose
  isn't clear from context.
- Child buttons are native <button> elements with their
  own accessible names.
- Keyboard: Tab moves between child buttons naturally.
- Each child button manages its own focus ring.

## Composition rules
- ButtonGroup wraps only Button components as children.
- All children should share the same variant and size
  as the group for visual consistency.
- For filled variant, use variant="filled" on both group
  and child buttons.
- For outline/soft/ghost, use variant="ghost" on child
  buttons (group handles the container styling).
- Do not nest ButtonGroup inside ButtonGroup.
- For button + input combinations, use ButtonInputGroup.

## Known deviations
- Figma uses item3/item4/item5 booleans for button
  count. In code, children determine count. Severity: low.
- Figma uses a "horizontal" boolean. In code, orientation
  uses string values. Severity: low.

## Code example
<ButtonGroup variant="outline" orientation="horizontal" size="m">
  <Button variant="ghost" intent="neutral" size="m">One</Button>
  <Button variant="ghost" intent="neutral" size="m">Two</Button>
  <Button variant="ghost" intent="neutral" size="m">Three</Button>
</ButtonGroup>

<ButtonGroup variant="filled" orientation="vertical" size="s">
  <Button variant="filled" intent="neutral" size="s" icon={<PlusIcon />} iconOnly />
  <Button variant="filled" intent="neutral" size="s" icon={<MinusIcon />} iconOnly />
</ButtonGroup>

## Cross-references
- Button (child component)
- ButtonInputGroup (button + input combination)
- specs/components/button-group.md
