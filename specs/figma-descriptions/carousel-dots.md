# CarouselDots

Category: content / navigation indicator
React: <CarouselDots>
Spec: specs/components/carousel.md
TSX: apps/storybook/src/stories/carousel/CarouselDots.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-carouseldots--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6601-4952

--------------------------------------------
## State implementation contract

Minimal interaction. Dots are small circles — inactive dots
use neutral-base, the current dot uses info-base. Hover
shifts inactive dots to neutral-text.

- Default dot: bg → --dls-color-intent-neutral-base
- Current dot: bg → --dls-color-intent-info-base
- Hover (inactive): bg → --dls-color-intent-neutral-text
- Focus-visible: ring → --dls-state-focus-ring-color
- Transition: background 150ms ease
- prefers-reduced-motion: transition disabled
--------------------------------------------

## Purpose
Pagination dots for Carousel. Row of small circular
indicators showing total slides, with one active/current
dot highlighted in info color. Each dot is clickable to
navigate to that slide.

## Use when
- Carousel slide indicators.
- Image gallery pagination.
- Onboarding step indicators.

## Do NOT use for
- Numbered pagination → use Pagination.
- Tab navigation → use Tabs.
- Progress steps → use a stepper pattern.

## Figma → Code mapping

### Figma component: pagination-dots (6601:4952)
This is a single Figma component (not a component set).
Layout is static in Figma — dot count and active dot are
fixed. In code, controlled dynamically.

### Code-only props
| React prop       | Notes |
|------------------|-------|
| total            | number, required. Number of dots. |
| current          | number, default 0. Active dot index (0-based). |
| onDotClick       | (index: number) => void, optional. |
| className        | string, optional. |

## Anatomy
1. Root — <div class="dls-carousel-dots" role="tablist"
   aria-label="Slide navigation">.
2. Dots — <button class="dls-carousel-dot" role="tab">,
   8×8px circles. data-current on active dot.

## Props / API
- total            number, required.
- current          number, default 0.
- onDotClick       (index: number) => void, optional.
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component token:
- --dls-radius-component-carousel-dot (radius.full)

Intent tokens:
- --dls-color-intent-neutral-base (inactive dot)
- --dls-color-intent-info-base (current dot)
- --dls-color-intent-neutral-text (hover inactive)

L3 state token:
- --dls-state-focus-ring-color (focus ring)

Spacing:
- --dls-spacing-2 (gap between dots)

## States

### Code implementation
- Default: neutral-base dots, info-base current.
- :hover:not(:disabled):not([data-current]) — neutral-text.
- :focus-visible — focus ring.
- Transition: background 150ms ease.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Root has role="tablist" with aria-label="Slide navigation".
- Each dot is <button role="tab"> with aria-selected and
  aria-label="Go to slide N".
- Keyboard: Tab moves between dots, Enter/Space activates.
- Focus-visible ring.
- Respects prefers-reduced-motion.

## Composition rules
- CarouselDots is used inside Carousel when showDots=true.
- Can be used standalone for custom carousel layouts.
- total must match the actual number of slides.

## Known deviations
- No L4 color tokens in tokens.json. Uses intent tokens
  directly. Only --dls-radius-component-carousel-dot as L4.
  Severity: low.

## Code example
<CarouselDots total={5} current={2} onDotClick={goToSlide} />

## Cross-references
- Carousel (parent component)
- CarouselArrow (directional navigation)
- CarouselItem (slide content)
- specs/components/carousel.md
