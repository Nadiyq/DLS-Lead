# Carousel

Category: content / layout
React: <Carousel>
Spec: specs/components/carousel.md
TSX: apps/storybook/src/stories/carousel/Carousel.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-carousel--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6602-3071

--------------------------------------------
## State implementation contract

No direct interactive states on the Carousel root. States
are delegated to composed children:
- CarouselArrow handles hover/focus/disabled
- CarouselDots handles hover/focus on individual dots
- Track has a transform transition for slide changes

- Track transition: transform 300ms ease
- prefers-reduced-motion: track transition disabled
--------------------------------------------

## Purpose
Paginated content viewer for image galleries, card decks,
or feature highlights. Composes CarouselArrow (prev/next
navigation), CarouselDots (pagination indicators), and
CarouselItem (slide containers). Supports horizontal and
vertical orientations with configurable visible items.

## Use when
- Image galleries.
- Feature/product card decks.
- Onboarding or walkthrough slides.
- Content that exceeds viewport width in a controlled way.

## Do NOT use for
- Tab-based content switching → use Tabs.
- Scrollable lists → use native scroll or Scroll component.
- Single image display → use img directly.

## Figma → Code mapping

### Figma component set: carousel (6602:3071)
| Figma property    | React prop       | Values / Notes |
|-------------------|------------------|----------------|
| vertical          | orientation      | false → "horizontal" (default), true → "vertical". |
| paginationDots    | showDots         | boolean. Default true. |
| paginationText    | showLabel        | boolean. Default false. |
| text              | —                | Figma-only. In code, label auto-generates from current/total. |
| children (slot)   | children         | CarouselItem instances. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| children         | ReactNode, required. CarouselItem elements. |
| orientation      | "horizontal" | "vertical", default "horizontal". |
| visibleItems     | number, default 1. Items visible at once. |
| showLabel        | boolean, default false. "Slide X of Y" text. |
| showDots         | boolean, default true. Pagination dots. |
| showArrows       | boolean, default true. Prev/next arrows. |
| current          | number, optional. Controlled current index. |
| onSlideChange    | (index: number) => void, optional. |
| className        | string, optional. |

Notes:
- Figma uses `vertical` boolean; code uses `orientation` string.
- Arrows are always shown in Figma; code controls via showArrows.
- Dots come from the CarouselDots component (not recreated).
- Arrows come from the CarouselArrow component.
- Slide items come from CarouselItem.

## Anatomy
1. Root — <div class="dls-carousel"
   aria-roledescription="carousel" aria-label="Carousel">.
   data-orientation attribute.
2. Content row — <div class="dls-carousel__content">,
   flex row (or column for vertical) with arrows + viewport.
3. Prev arrow — <CarouselArrow direction="left|up">,
   disabled at index 0.
4. Viewport — <div class="dls-carousel__viewport">,
   overflow hidden, clips slides.
5. Track — <div class="dls-carousel__track">, flex row/column
   of slides. Translated via transform for slide changes.
6. Slides — <div class="dls-carousel__slide"
   role="group" aria-roledescription="slide">, wraps each
   CarouselItem child.
7. Next arrow — <CarouselArrow direction="right|down">,
   disabled at last index.
8. Pagination — <div class="dls-carousel__pagination">,
   contains label and/or dots.
9. Label — <span class="dls-carousel__slide-label">,
   "Slide X of Y". Optional.
10. Dots — <CarouselDots total={N} current={i} onDotClick={goTo}>.

## Props / API
See code-only props table above.
- Ref forwarded to root <div>.

## Tokens used
Spacing:
- --dls-spacing-2, --dls-spacing-3

Typography:
- --dls-font-family
- --dls-font-weight-medium
- --dls-text-s-font-size, --dls-text-s-line-height
- --dls-color-text-secondary (slide label)

Note: carousel root has no L4 color/radius tokens of its own.
CarouselArrow, CarouselDots, and CarouselItem each have their
own L4 radius tokens.

## States

### Figma representation (carousel 6602:3071)
- vertical: false / true
- paginationDots: true / false
- paginationText: true / false
- No interactive states on the composed view.

### Code implementation
- Track: transition transform 300ms ease for slide changes.
  @media (prefers-reduced-motion): transition disabled.
- Arrow disabled states: at index 0 (prev) and maxIndex (next).
- Dot current state: info-base highlight.
- Slide index: controlled or internal state.

## Accessibility contract
- Root has aria-roledescription="carousel" and aria-label.
- Each slide wrapper has role="group",
  aria-roledescription="slide", and
  aria-label="Slide N of total".
- Arrows are native buttons with aria-label="Go left/right/up/down".
- Dots use role="tablist" with role="tab" per dot.
- Keyboard: arrows navigate slides via button Tab/Enter,
  dots via Tab/Enter.
- Respects prefers-reduced-motion (track transition).

## Composition rules
- Children must be CarouselItem elements.
- Dots come from CarouselDots (not recreated).
- Arrows come from CarouselArrow.
- visibleItems controls how many slides show at once.
- Gap between slides is 12px (--dls-spacing-3).
- For image carousels, use CarouselItem with img children.

## Known deviations
- No L4 color tokens for the carousel root. Uses semantic
  tokens. Child components have their own L4 radius tokens.
  Severity: low.
- Track uses inline transform style for sliding — not
  token-controlled. Severity: low.

## Code example
<Carousel orientation="horizontal" showDots showArrows>
  <CarouselItem width={300} height={200}>
    <img src="photo1.jpg" alt="Beach" />
  </CarouselItem>
  <CarouselItem width={300} height={200}>
    <img src="photo2.jpg" alt="Mountains" />
  </CarouselItem>
</Carousel>

<!-- Vertical with label -->
<Carousel orientation="vertical" showLabel showDots>
  <CarouselItem>Slide A</CarouselItem>
  <CarouselItem>Slide B</CarouselItem>
</Carousel>

## Cross-references
- CarouselArrow (prev/next buttons)
- CarouselDots (pagination dots)
- CarouselItem (slide container)
- specs/components/carousel.md
