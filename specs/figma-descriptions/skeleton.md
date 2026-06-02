# Skeleton

Category: loading / placeholder
React: <Skeleton>
Spec: specs/components/skeleton.md
TSX: apps/storybook/src/stories/skeleton/Skeleton.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-skeleton--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6603-8027

--------------------------------------------
## State implementation contract

No interactive color states. Skeleton is a decorative
placeholder with a continuous opacity pulse animation.
No hover, pressed, focus, or disabled states.

- Animation: dls-skeleton-pulse 1.5s ease-in-out infinite
  (opacity 1 → 0.4 → 1)
- prefers-reduced-motion: animation stops, static display
--------------------------------------------

## Purpose
Loading placeholder that mimics the shape of content
before it loads. Three predefined layout types: regular
(avatar + text lines), card (text lines + image area),
text (text lines only). Entirely decorative — hidden
from assistive technology.

## Use when
- Initial page/section load with known layout structure.
- List loading where each item shape is predictable.
- Card grid placeholders.
- Content areas where Spinner alone is insufficient.

## Do NOT use for
- Indeterminate loading with no layout hint → use Spinner.
- Determinate progress → use ProgressBar.
- Empty states after loading completes → use EmptyState.

## Figma → Code mapping

### Figma component set: skeleton (6603:8027)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| type           | type             | "regular" / "card" / "text". Default "regular". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| type             | SkeletonType, default "regular". |
| className        | string, optional. |

Notes:
- Figma shows static placeholder shapes. In code, all
  shapes pulse with opacity animation.
- Figma uses `primitives/full` for avatar/line radius and
  `primitives/l` for image radius. Code uses L4 component
  tokens that resolve to the same primitives.

## Anatomy
1. Root — <div class="dls-skeleton" aria-hidden="true">,
   flex container. data-type controls layout.
2. Avatar (regular only) — <div class="dls-skeleton__avatar">,
   40×40px circle. Pulsing.
3. Lines group — <div class="dls-skeleton__lines">,
   vertical stack of line placeholders.
4. Line — <div class="dls-skeleton__line">, 16px tall pill.
   First line: 100% width. Second line: 45% width. Pulsing.
5. Image (card only) — <div class="dls-skeleton__image">,
   flexible-height rectangle. Pulsing.

## Props / API
- type            SkeletonType, default "regular".
                  "regular" | "card" | "text".
- className       string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-skeleton-avatar (radius.full)
- --dls-radius-component-skeleton-line (radius.full)
- --dls-radius-component-skeleton-image (radius.l)

L2 semantic tokens:
- --dls-color-surface-muted (all placeholder backgrounds)

Spacing:
- --dls-spacing-2, --dls-spacing-3, --dls-spacing-4
- --dls-font-family

## States

### Figma representation (skeleton 6603:8027)
- type: regular / card / text
- No state variations — static shapes in Figma.

### Code implementation
- Always pulsing: animation dls-skeleton-pulse 1.5s
  ease-in-out infinite on avatar, lines, and image.
- @media (prefers-reduced-motion: reduce): animation
  stops (static display).
- No interactive states.

## Accessibility contract
- Root has aria-hidden="true" — entirely decorative.
- Not keyboard focusable.
- Screen readers skip the skeleton entirely.
- Consuming layout should provide a live region
  (role="status" or aria-live="polite") to announce
  when content finishes loading.
- Respects prefers-reduced-motion (animation stops).

## Composition rules
- Skeleton is self-contained. No children.
- Use multiple Skeletons to match the expected content
  layout (list, grid, etc.).
- For single-element loading, prefer Spinner.
- Replace Skeleton with actual content once loaded —
  do not layer content on top.

## Known deviations
- No L4 color tokens in tokens.json. Uses
  --dls-color-surface-muted directly.
  Severity: low.

## Code example
<Skeleton type="regular" />

<!-- Card grid -->
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
  <Skeleton type="card" />
  <Skeleton type="card" />
</div>

<!-- Text block -->
<Skeleton type="text" />

## Cross-references
- Spinner (indeterminate loading indicator)
- ProgressBar (determinate progress)
- EmptyState (post-load empty content)
- specs/components/skeleton.md
