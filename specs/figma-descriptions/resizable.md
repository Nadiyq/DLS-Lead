# Resizable

Category: layout / interaction
React: <Resizable>
Spec: specs/components/resizable.md
TSX: apps/storybook/src/stories/resizable/Resizable.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-resizable--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6605-11566

--------------------------------------------
## State implementation contract

Overlay state model. Resizable is a transparent surface
(vertical strip between panels). Hover/focus use overlay
and intent colors.

- Hover: bg → --dls-state-hover-overlay, lines + handle
  shift to --dls-color-intent-info-border, icon inverts
- Focus-visible: same as hover + box-shadow ring
- Active (dragging): lines + handle stay info-border
- Disabled: border-disabled, surface-disabled, text-disabled
- prefers-reduced-motion: all transitions disabled
--------------------------------------------

## Purpose
Drag handle between resizable panels. Renders as a vertical
strip with top/bottom lines and a centered 6-dot grip icon.
Supports pointer drag and keyboard arrow keys (Shift for
10px steps). Display-only in Figma — interaction is
code-only.

## Use when
- Resizable sidebar/panel layouts.
- Split-pane views where users adjust column widths.
- Multi-column layouts with adjustable proportions.

## Do NOT use for
- Static visual dividers → use Separator.
- Scroll position → use Scroll.
- Form slider input → use Slider.

## Figma → Code mapping

### Figma component set: resizable (6605:11566)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| state          | —                | "normal" / "focus". Figma-only visual state. In code: CSS :hover, :focus-visible, [data-active], [data-disabled]. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| disabled         | boolean, default false. |
| onResize         | (deltaX: number) => void, optional. |
| onResizeStart    | () => void, optional. |
| onResizeEnd      | () => void, optional. |
| valueNow         | number, default 0. ARIA value. |
| valueMin         | number, default 0. ARIA min. |
| valueMax         | number, default 100. ARIA max. |
| aria-label       | string, default "Resize". |
| className        | string, optional. |

Notes:
- Figma only shows normal and focus states. Code also
  supports hover, active (dragging), and disabled.
- Figma uses Icon / GripVertical. Code uses lucide-react
  GripVertical with aria-hidden="true".

## Anatomy
1. Root — <div class="dls-resizable" role="separator">,
   16px wide vertical strip. data-disabled, data-active.
   tabIndex=0 when enabled.
2. Top line — <span class="dls-resizable__line">, 1px
   wide, stretches to fill above handle.
3. Handle — <span class="dls-resizable__handle">, 12×16px
   centered grip area with xs radius.
4. Icon — <span class="dls-resizable__icon"> containing
   <GripVertical> from lucide-react. aria-hidden.
5. Bottom line — <span class="dls-resizable__line">, 1px
   wide, stretches to fill below handle.

## Props / API
- disabled         boolean, default false.
- onResize         (deltaX: number) => void, optional.
- onResizeStart    () => void, optional.
- onResizeEnd      () => void, optional.
- valueNow         number, default 0.
- valueMin         number, default 0.
- valueMax         number, default 100.
- aria-label       string, default "Resize".
- className        string, optional.
- Ref forwarded to root <div>.

## Tokens used
L4 component tokens:
- --dls-radius-component-resizable (hover/focus container radius)
- --dls-radius-component-resizable-handle (handle radius)

L2 semantic tokens:
- --dls-color-border-base (default line color)
- --dls-color-surface-strong (default handle bg)
- --dls-color-intent-neutral-text (default icon color)
- --dls-color-intent-info-border (hover/focus line + handle)
- --dls-color-text-inverse (hover/focus icon color)
- --dls-color-border-disabled (disabled lines)
- --dls-color-surface-disabled (disabled handle)
- --dls-color-text-disabled (disabled icon)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-focus-ring-color (focus ring)

Spacing:
- --dls-spacing-0-5 (container + handle padding)

## States

### Figma representation (resizable 6605:11566)
- state: normal / focus
- No hover, active, or disabled in Figma.

### Code implementation
- :hover:not(:disabled):not([data-disabled]) — overlay bg,
  info-border lines + handle, inverse icon.
- :focus-visible — same as hover + focus ring.
- [data-active] — info-border lines + handle, inverse icon
  (dragging state via React useState).
- [data-disabled] — disabled tokens, not-allowed cursor,
  pointer-events: none.
- Transitions: background, color 150ms ease on all elements.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Root has role="separator" with aria-orientation="vertical".
- aria-valuenow, aria-valuemin, aria-valuemax for screen
  readers.
- aria-label defaults to "Resize".
- tabIndex=0 when enabled, -1 when disabled.
- Keyboard: ArrowLeft/ArrowRight resize by 1px, Shift+Arrow
  by 10px.
- Pointer: drag via pointerDown/Move/Up with pointer capture.
- Focus-visible ring.
- Disabled uses data-disabled + aria-disabled pattern.
- Respects prefers-reduced-motion.

## Composition rules
- Resizable is self-contained. No children.
- Place between flex siblings (sidebar + content).
- Consuming code must handle the delta and update widths.
- Do not nest inside scroll containers.
- For vertical resizing (row heights), a separate component
  would be needed — this only supports horizontal resize.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  and intent tokens directly. L4 radius tokens added
  during this rollout.
  Severity: low.

## Code example
<div style={{ display: 'flex' }}>
  <aside style={{ width: leftWidth }}>Sidebar</aside>
  <Resizable
    onResize={(dx) => setLeftWidth(w => w + dx)}
    aria-label="Resize sidebar"
  />
  <main>Content</main>
</div>

## Cross-references
- Separator (static visual divider)
- Scroll (scroll position indicator)
- Slider (form value input)
- specs/components/resizable.md
