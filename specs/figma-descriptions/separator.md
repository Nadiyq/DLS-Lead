# Separator

Category: layout / visual divider
React: <Separator>
Spec: specs/components/separator.md
TSX: apps/storybook/src/stories/separator/Separator.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-separator--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6597-19415

--------------------------------------------
## State implementation contract

No interactive states. Separator is a static visual
divider line. No hover, pressed, focus, disabled,
transitions, or animations.
--------------------------------------------

## Purpose
Visual divider line between content sections, list items,
or toolbar groups. Renders as a 1px line using the base
border color. Supports horizontal and vertical orientations.

## Use when
- Dividing content sections vertically.
- Separating list items.
- Grouping toolbar actions.
- Creating visual breaks between card sections.

## Do NOT use for
- Decorative borders on containers → use border tokens.
- Spacing between elements → use spacing tokens.
- Content grouping with headings → use section headings.

## Figma → Code mapping

### Figma component set: separator (6597:19415)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| vertical       | orientation      | false → "horizontal" (default), true → "vertical". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| orientation      | SeparatorOrientation, default "horizontal". |
| className        | string, optional. |

Notes:
- Figma uses a boolean `vertical` property. Code uses a
  string `orientation` prop with "horizontal" | "vertical".
- Figma wraps the 1px line in a container div for layout.
  Code renders the line directly as the root element.

## Anatomy
1. Root — <div class="dls-separator" role="separator"
   aria-orientation="...">, the 1px line itself.
   data-orientation controls direction.

## Props / API
- orientation      SeparatorOrientation, default "horizontal".
                   "horizontal" | "vertical".
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L2 semantic tokens:
- --dls-color-border-base (line color)

No L4 component tokens exist for separator in tokens.json.

## States

### Figma representation (separator 6597:19415)
- vertical: false / true
- No state variations.

### Code implementation
- Static display only. No transitions or animations.
- No hover, focus, pressed, or disabled states.

## Accessibility contract
- Root has role="separator" with aria-orientation.
- Not keyboard focusable.
- Decorative visual — assistive technology recognizes
  the separator role for structural context.
- No motion to guard.

## Composition rules
- Separator is self-contained. No children.
- Horizontal: place between vertical content sections.
  Width stretches to 100% of parent.
- Vertical: place between horizontal items (toolbars,
  inline groups). Height stretches via align-self: stretch.
- Do not use for spacing — use spacing tokens instead.

## Known deviations
- No L4 component tokens in tokens.json. Uses
  --dls-color-border-base directly.
  Severity: low.

## Code example
<!-- Horizontal (default) -->
<Separator />

<!-- Vertical in toolbar -->
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Separator orientation="vertical" />
  <Button>Left</Button>
  <Button>Center</Button>
</div>

<!-- Between list items -->
<ListItem label="Item one" />
<Separator />
<ListItem label="Item two" />

## Cross-references
- Resizable (drag-handle divider)
- List / ListItem (list context)
- Toolbar (toolbar context)
- specs/components/separator.md
