# Scroll

Category: display / indicator
React: <Scroll>
Spec: specs/components/scroll.md
TSX: apps/storybook/src/stories/scroll/Scroll.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-scroll--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6464-7266

--------------------------------------------
## State implementation contract

Minimal interaction. Scroll is a display-only scrollbar
indicator. Thumb has an opacity transition on hover.
No pressed, focus, or disabled states.

- Hover: thumb opacity changes to 0.8
- Transition: opacity 150ms ease on thumb
- prefers-reduced-motion: transition disabled
--------------------------------------------

## Purpose
Custom scrollbar indicator that renders a thumb at a given
position and size within a track. Display-only — does not
handle scroll events itself. The consuming component must
sync thumbPosition with the actual scroll position.

## Use when
- Custom scrollbar appearance alongside hidden native
  scrollbars.
- Scroll position visualization in panels, lists, or
  content areas.
- When native scrollbar styling is insufficient.

## Do NOT use for
- Actual scroll behavior → use native overflow: auto.
- Progress indication → use ProgressBar.
- Navigation → use Tabs, Sidebar, or Pagination.

## Figma → Code mapping

### Figma component set: scroll (6464:7266)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| type           | orientation      | "vertical" → "vertical" (default), "horizontal" → "horizontal". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| orientation      | ScrollOrientation, default "vertical". |
| thumbSize        | number (0–100), default 50. Percentage of track. |
| thumbPosition    | number (0–100), default 0. Percentage along track. |
| className        | string, optional. |

Notes:
- Figma uses `type` as the property name. Code uses
  `orientation` for consistency with Separator.
- Figma shows static thumb at fixed position. Code accepts
  dynamic thumbSize and thumbPosition for runtime updates.
- Figma refers to the thumb as "track" in the node name.

## Anatomy
1. Root — <div class="dls-scroll" role="scrollbar">,
   the track container. 8px wide/tall with padding.
   data-orientation controls direction.
2. Thumb — <div class="dls-scroll__thumb">, 4px wide/tall
   pill-shaped indicator. Positioned via inline margin
   styles (marginTop for vertical, marginLeft for horizontal).

## Props / API
- orientation      ScrollOrientation, default "vertical".
                   "vertical" | "horizontal".
- thumbSize        number, default 50. Clamped to 5–100.
- thumbPosition    number, default 0. Clamped to 0–(100-thumbSize).
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-scroll (track radius, radius.l)
- --dls-radius-component-scroll-thumb (thumb radius, radius.full)

Intent tokens:
- --dls-color-intent-neutral-base (thumb color)

Spacing:
- --dls-spacing-0-5 (track padding)

## States

### Figma representation (scroll 6464:7266)
- type: vertical / horizontal
- No state variations — static display.

### Code implementation
- :hover:not(:disabled) — thumb opacity 0.8.
- Transition: opacity 150ms ease on thumb.
- @media (prefers-reduced-motion: reduce): transition
  disabled.
- No focus, pressed, or disabled states.

## Accessibility contract
- Root has role="scrollbar" with aria-orientation.
- aria-valuenow, aria-valuemin, aria-valuemax reflect
  thumb position.
- Not keyboard focusable (display-only indicator).
- Consuming component must handle actual scroll behavior
  and sync values.
- Respects prefers-reduced-motion.

## Composition rules
- Scroll is display-only. Consuming code must:
  1. Hide native scrollbars (scrollbar-width: none).
  2. Listen to scroll events on the content container.
  3. Calculate thumbSize from (clientHeight/scrollHeight).
  4. Calculate thumbPosition from scrollTop percentage.
  5. Pass computed values as props.
- Place adjacent to the scrollable content, not inside it.
- Use orientation="vertical" for vertical content.
- Use orientation="horizontal" for horizontal content.

## Known deviations
- No L4 color tokens in tokens.json. Uses
  --dls-color-intent-neutral-base directly for thumb.
  Severity: low.
- Hover uses hardcoded opacity value (0.8) instead of
  a token. Severity: low.

## Code example
<!-- Display-only -->
<Scroll orientation="vertical" thumbSize={30} thumbPosition={50} />

<!-- Synced with scrollable content -->
<div style={{ display: 'flex', gap: 4 }}>
  <div ref={contentRef} onScroll={handleScroll}
    style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
    {content}
  </div>
  <Scroll
    orientation="vertical"
    thumbSize={viewRatio}
    thumbPosition={scrollPct}
  />
</div>

## Cross-references
- Separator (visual divider)
- Resizable (drag-handle divider)
- specs/components/scroll.md
