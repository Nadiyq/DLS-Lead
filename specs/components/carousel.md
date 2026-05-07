---
name: Carousel
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/carousel/Carousel.tsx
  - apps/storybook/src/stories/carousel/carousel.css
  - tokens/tokens.json
---

# Carousel

## Metadata

- Category: content / layout
- Orientations: `horizontal | vertical`

## Overview

Use `Carousel` for paginated content — image galleries, card decks, or feature highlights. Includes optional arrows, dots, and slide labels.

## Anatomy

- Root
- Viewport with sliding track
- CarouselArrow (prev/next, optional)
- CarouselDots (pagination, optional)
- Slide label (optional)
- CarouselItem (individual slide)

## Tokens Used

- `--dls-color-component-carousel-*`
- `--dls-radius-component-carousel`
- `--dls-spacing-*`

## Props / API

- `orientation`
- `visibleItems` — items visible at once
- `showLabel`, `showDots`, `showArrows`
- `current` — controlled slide index
- `onSlideChange`
- `children` — CarouselItem elements

## States

- default
- arrow disabled at boundaries
- active dot
- slide transitions

## Code Example

```tsx
<Carousel orientation="horizontal" showDots showArrows>
  <CarouselItem>Slide 1</CarouselItem>
  <CarouselItem>Slide 2</CarouselItem>
</Carousel>
```

## Cross-References

- [../patterns/composition.md](../patterns/composition.md)
