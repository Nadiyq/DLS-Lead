# IconShape

Category: icon container
React: <IconShape>
Spec: specs/components/icon-shape.md
TSX: apps/storybook/src/stories/icon-shape/IconShape.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-iconshape--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6594-8253

--------------------------------------------
## State implementation contract

No interactive states. IconShape is a static display
component — a colored background shape around an icon.
No hover, pressed, focus, disabled, transitions, or
animations.
--------------------------------------------

## Purpose
Semantic icon badge — a colored subtle background shape
wrapping a lucide-react icon. Intent controls the color
scheme (subtle background + intent text color). Used in
popups, cards, items, alerts, and empty states to bring
attention to associated information.

## Use when
- Status indicators in cards or dialogs.
- Empty state illustrations with semantic color.
- Feature highlights or info callouts.
- Alert or notification icon badges.

## Do NOT use for
- User/entity identity → use Avatar.
- Interactive icon buttons → use Button with icon-only.
- Status dots → use BadgeIndicator.

## Figma → Code mapping

### Figma component set: icon-shape (6594:8253)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| intent         | intent           | "primary" / "success" / "warning" / "danger" / "info" / "neutral". Default "neutral" in code, "primary" in Figma. |
| size           | size             | "M" → "m", "S" → "s", "XS" → "xs". Default "m". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| intent           | IconShapeIntent, default "neutral". |
| size             | IconShapeSize, default "m". |
| children         | ReactNode, required. Icon element from lucide-react. |
| className        | string, optional. |

Notes:
- Figma uses uppercase size values (M/S/XS), code uses
  lowercase (m/s/xs).
- Figma default intent is "primary"; code default is
  "neutral". Pick intent explicitly in usage.
- Icon in Figma is a nested instance (Icon / Bell etc.).
  In code, pass any lucide-react icon as children.

## Anatomy
1. Root — <div class="dls-icon-shape">, colored container.
   data-intent and data-size attributes.
2. Icon child — lucide-react SVG, sized by CSS per
   data-size (24px / 16px / 12px).

## Props / API
- intent           IconShapeIntent, default "neutral".
                   "primary" | "success" | "warning" |
                   "danger" | "info" | "neutral".
- size             IconShapeSize, default "m".
                   "m" (40px) | "s" (32px) | "xs" (24px).
- children         ReactNode, required. Lucide-react icon.
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-icon-shape (M/S radius, radius.l)
- --dls-radius-component-icon-shape-xs (XS radius, radius.m)

Intent tokens (per data-intent):
- --dls-color-intent-{intent}-subtle (background)
- --dls-color-intent-{intent}-text (icon color)

Spacing:
- --dls-spacing-2 (M/S padding)
- --dls-spacing-1-5 (XS padding)
- --dls-font-family

## States

### Figma representation (icon-shape 6594:8253)
- intent: primary / success / warning / danger / info / neutral
- size: M / S / XS
- No state variations.

### Code implementation
- Static display only. No transitions or animations.
- No hover, focus, pressed, or disabled states.
- Uses CSS custom property overrides (--_subtle, --_text)
  per data-intent for clean intent switching.

## Accessibility contract
- Root is a plain <div> — decorative container.
- Not keyboard focusable.
- Icon child should have aria-hidden="true" when used
  alongside text that provides the meaning.
- When used standalone without text, the consuming context
  should provide an accessible label.

## Composition rules
- IconShape is a presentation wrapper. Pass one icon child.
- Always use lucide-react icons as children.
- Do not nest other components or text inside.
- Use with text/label in the consuming layout for context.
- For user identity, use Avatar instead.

## Known deviations
None.

## Code example
<IconShape intent="success" size="m">
  <CheckIcon />
</IconShape>

<!-- In a card -->
<div style={{ display: 'flex', gap: 12 }}>
  <IconShape intent="warning" size="s">
    <AlertTriangleIcon />
  </IconShape>
  <Text>Warning: action required</Text>
</div>

<!-- Small size -->
<IconShape intent="info" size="xs">
  <InfoIcon />
</IconShape>

## Cross-references
- Avatar (user/entity identity)
- Badge / BadgeIndicator (status indicators)
- Checkmark (success checkmark)
- specs/components/icon-shape.md
