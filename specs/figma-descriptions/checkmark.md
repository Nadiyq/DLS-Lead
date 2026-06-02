# Checkmark

Category: icon / indicator
React: <Checkmark>
Spec: specs/components/checkmark.md
TSX: apps/storybook/src/stories/checkmark/Checkmark.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-checkmark--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6950-14099

--------------------------------------------
## State implementation contract

No interactive states. Checkmark is a static display
indicator — a filled circle with a check icon. No hover,
pressed, focus, disabled, transitions, or animations.
--------------------------------------------

## Purpose
Standalone success/completion indicator — a filled neutral
circle with a check icon inside. Three sizes with
proportional stroke widths. Used for step completion,
success confirmations, list item completion markers.

## Use when
- Step completion indicators (stepper, wizard).
- Success confirmation in dialogs or toasts.
- List item completion markers.
- Inline success badges.

## Do NOT use for
- Toggleable checkbox → use Checkbox.
- Intent-colored icon backgrounds → use IconShape.
- Interactive success actions → use Button with intent.

## Figma → Code mapping

### Figma component set: checkmark (6950:14099)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| size           | size             | "M" → "m" (32px), "S" → "s" (24px), "XS" → "xs" (16px). Default "m". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| size             | CheckmarkSize, default "m". |
| className        | string, optional. |

Notes:
- Figma uses uppercase size values (M/S/XS), code uses
  lowercase (m/s/xs).
- Figma uses Icon / Check (lucide). Code uses lucide-react
  Check with per-size strokeWidth.
- Stroke widths: m→2, s→1.33, xs→1.

## Anatomy
1. Root — <div class="dls-checkmark">, filled circle
   container. data-size attribute.
2. Check icon — <Check> from lucide-react, aria-hidden.
   Stroke width varies by size. Sized by CSS.

## Props / API
- size             CheckmarkSize, default "m".
                   "m" (32px) | "s" (24px) | "xs" (16px).
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component token:
- --dls-radius-component-checkmark (radius.full)

Intent tokens:
- --dls-color-intent-neutral-base (circle background)
- --dls-color-intent-neutral-on-base (check icon color)

## States

### Figma representation (checkmark 6950:14099)
- size: M / S / XS
- No state variations.

### Code implementation
- Static display only. No transitions or animations.
- No hover, focus, pressed, or disabled states.

## Accessibility contract
- Root is a plain <div> — decorative indicator.
- Not keyboard focusable.
- Check icon has aria-hidden="true".
- Consuming context should provide meaning via text
  (e.g., "Step completed").

## Composition rules
- Checkmark is self-contained. No children (icon built-in).
- Use alongside text for semantic context.
- For intent-colored icon containers, use IconShape instead.
- For toggleable checkboxes, use Checkbox.

## Known deviations
- No L4 color tokens in tokens.json. Uses intent tokens
  directly. Only --dls-radius-component-checkmark exists
  as L4.
  Severity: low.

## Code example
<Checkmark size="m" />

<!-- All sizes -->
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Checkmark size="m" />
  <Checkmark size="s" />
  <Checkmark size="xs" />
</div>

## Cross-references
- IconShape (intent-colored icon container)
- Checkbox (toggleable binary control)
- specs/components/checkmark.md
