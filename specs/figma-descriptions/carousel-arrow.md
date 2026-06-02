# CarouselArrow

Category: content / navigation
React: <CarouselArrow>
Spec: specs/components/carousel.md
TSX: apps/storybook/src/stories/carousel/CarouselArrow.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-carouselarrow--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6601-4940

--------------------------------------------
## State implementation contract

Overlay state model. CarouselArrow is a subtle-fill surface
with border and drop shadow. Hover/pressed use overlay tokens.

- Hover: bg → --dls-state-hover-overlay
- Pressed: bg → --dls-state-pressed-overlay
- Focus-visible: ring → --dls-state-focus-ring-color
  (0 0 0 3px box-shadow, replaces drop shadow)
- Disabled: bg → --dls-color-surface-disabled,
  text → --dls-color-text-disabled,
  border → --dls-color-border-disabled, no shadow
--------------------------------------------

## Purpose
Circular navigation button for the Carousel component.
Four directions (left, right, up, down) with matching
lucide-react arrow icons. Used as prev/next controls
within a carousel or as standalone directional buttons.

## Use when
- Carousel prev/next navigation.
- Directional navigation in scrollable areas.
- Step-through controls for content panels.

## Do NOT use for
- General buttons → use Button.
- Pagination → use Pagination.
- Tab switching → use Tabs.

## Figma → Code mapping

### Figma component set: arrow (6601:4940)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| direction      | direction        | "right" / "left" / "up" / "down". Default "right". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| direction        | CarouselArrowDirection, default "right". |
| disabled         | boolean (from ButtonHTMLAttributes). |
| onClick          | MouseEventHandler (from ButtonHTMLAttributes). |
| children         | ReactNode, optional. Override default icon. |
| className        | string, optional. |
| aria-label       | string, auto-set to "Go {direction}". |

Notes:
- Figma shows the arrow as a wrapper around an icon-soft
  button instance. In code, CarouselArrow is a standalone
  native <button> with a lucide-react icon.
- Figma uses Icon / ArrowRight, ArrowLeft, ArrowUp, ArrowDown.
  Code uses matching lucide-react imports.
- Extends ButtonHTMLAttributes — all native button props
  are supported.

## Anatomy
1. Root — <button class="dls-carousel-arrow">, native button.
   data-direction attribute. aria-label auto-set.
   32×32px circle with border and drop shadow.
2. Arrow icon — lucide-react ArrowRight/Left/Up/Down,
   aria-hidden. 16×16px, colored by currentColor.

## Props / API
- direction        CarouselArrowDirection, default "right".
                   "left" | "right" | "up" | "down".
- disabled         boolean, optional. From ButtonHTMLAttributes.
- children         ReactNode, optional. Override default icon.
- className        string, optional.
- All other ButtonHTMLAttributes supported.
- Ref forwarded to <button>.

## Tokens used
L4 component token:
- --dls-radius-component-carousel-arrow (radius.full)

Intent/semantic tokens:
- --dls-color-intent-neutral-subtle (default bg)
- --dls-color-intent-neutral-text (icon color)
- --dls-color-border-base (border)
- --dls-color-overlay-scrim (drop shadow)
- --dls-color-surface-disabled (disabled bg)
- --dls-color-text-disabled (disabled icon)
- --dls-color-border-disabled (disabled border)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-pressed-overlay (pressed bg)
- --dls-state-focus-ring-color (focus ring)

Spacing:
- --dls-spacing-2 (padding)

## States

### Figma representation (arrow 6601:4940)
- direction: right / left / up / down
- No state variants in Figma — shows normal only.

### Code implementation
- :hover:not(:disabled) — overlay hover bg.
- :active:not(:disabled) — overlay pressed bg.
- :focus-visible — box-shadow focus ring (replaces
  drop shadow).
- :disabled — disabled surface/text/border, no shadow,
  pointer-events none.
- No transitions — state changes are instant.

## Accessibility contract
- Root is a native <button type="button">.
- aria-label auto-set to "Go {direction}".
- Arrow icon has aria-hidden (button text provides name).
- Keyboard: standard button (Tab/Enter/Space).
- Disabled uses native disabled attribute.
- Focus-visible ring.

## Composition rules
- CarouselArrow is self-contained.
- Used inside Carousel when showArrows is true.
- Can be used standalone for directional navigation.
- Override the icon via children prop if needed.
- Disabled at carousel boundaries (first/last slide).

## Known deviations
- No L4 color tokens in tokens.json for carousel-arrow.
  Uses intent and semantic tokens directly. Only
  --dls-radius-component-carousel-arrow exists as L4.
  Severity: low.

## Code example
<CarouselArrow direction="left" onClick={goPrev} />
<CarouselArrow direction="right" onClick={goNext} />

<!-- Disabled at boundary -->
<CarouselArrow direction="left" disabled />

<!-- All directions -->
<CarouselArrow direction="up" />
<CarouselArrow direction="down" />

## Cross-references
- Carousel (parent component)
- CarouselDots (pagination dots)
- CarouselItem (slide content)
- Button (general actions — not for carousel nav)
- specs/components/carousel.md
