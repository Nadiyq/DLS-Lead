# CarouselItem

Category: content / slide container
React: <CarouselItem>
Spec: specs/components/carousel.md
TSX: apps/storybook/src/stories/carousel/CarouselItem.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-carouselitem--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6602-3066

--------------------------------------------
## State implementation contract

No interactive states. CarouselItem is a static content
container — a rounded box that holds slide content.
No hover, pressed, focus, disabled, transitions, or
animations.
--------------------------------------------

## Purpose
Rounded content container for individual carousel slides.
Holds images, text, cards, or any content. Images and
video fill the container with object-fit: cover.

## Use when
- Individual slides inside a Carousel.
- Image gallery items.
- Card carousel entries.

## Do NOT use for
- Standalone cards → use Card.
- Grid items outside carousel context → use direct layout.

## Figma → Code mapping

### Figma component: carousel-item (6602:3066)
Static Figma component (not a component set). Shows a
square with an image placeholder.

### Code-only props
| React prop       | Notes |
|------------------|-------|
| children         | ReactNode, required. Slide content. |
| width            | number | string, optional. Fixed width. |
| height           | number | string, optional. Fixed height. |
| className        | string, optional. |

## Anatomy
1. Root — <div class="dls-carousel-item">, rounded
   container with overflow hidden.
2. Children — any content. Images and video auto-fill
   with object-fit: cover and inherited radius.

## Props / API
- children         ReactNode, required.
- width            number | string, optional.
- height           number | string, optional.
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component token:
- --dls-radius-component-carousel-item (radius.l)

## States
No interactive states. Static display container.

## Accessibility contract
- Root is a plain <div> — no ARIA role needed.
- Content inside the item provides its own semantics.
- Images should have meaningful alt text.

## Composition rules
- CarouselItem is used as a child of Carousel.
- Can contain any content — images, text, cards.
- Width/height can be set via props or by parent layout.
- Images and video auto-fill with cover fit.

## Known deviations
None.

## Code example
<Carousel showArrows showDots>
  <CarouselItem width={300} height={200}>
    <img src="photo.jpg" alt="Description" />
  </CarouselItem>
  <CarouselItem width={300} height={200}>
    <div>Custom content</div>
  </CarouselItem>
</Carousel>

## Cross-references
- Carousel (parent component)
- CarouselArrow (navigation arrows)
- CarouselDots (pagination dots)
- specs/components/carousel.md
