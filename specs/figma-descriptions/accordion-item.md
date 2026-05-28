# Accordion / AccordionItem

Category: layout / disclosure
React: <Accordion> / <AccordionItem>
Spec: specs/components/accordion.md
TSX: apps/storybook/src/stories/Accordion.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-accordion--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6489-1187

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  → overlay tokens.

This component uses: OVERLAY TOKENS (transparent surface).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Collapsible disclosure for sectioning long-form content into
expand/collapse panels. Use AccordionItem alone, or wrap
multiple in Accordion for a grouped list.

## Use when
- Progressively revealing supporting content (FAQ, settings
  groups, item details).
- Reducing vertical density on read-heavy pages.
- Grouping related, independently-expandable sections.

## Do NOT use for
- Primary navigation → use Sidebar or Tabs.
- Mutually exclusive views → use Tabs.
- Required form steps → use Stepper or full-page flow.
- Always-visible content → render inline.
- Nesting inside another Accordion (max depth = 1).

## Figma → Code mapping
| Figma property | React prop    | Values                            |
|----------------|---------------|-----------------------------------|
| active=Off/On  | defaultOpen   | false / true                      |
| state          | (native CSS)  | :hover, :focus-visible, :active   |
| title          | title         | string                            |
| slot-content   | children      | ReactNode                         |
| (disabled)     | disabled      | boolean                           |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes — never a prop, never .is-* classes.
- Open state in code is internal (useState), with `defaultOpen`
  as the initial value. There is no controlled `open` prop today.
- DOM exposes `data-open` on the item root when expanded.

## Anatomy
1. Accordion (root group) — vertical stack of items.
2. AccordionItem — disclosure unit.
3. Trigger — native <button>, full width, title + chevron.
4. Chevron — lucide-react ChevronDown, 16x16, rotates 180deg
   when open.
5. Content — collapsible region with role="region" and
   aria-labelledby, rendered only when open.

## Props / API
AccordionItem:
- title        string, required. Header. Sentence case, <= 60 chars.
- children     ReactNode, optional. Collapsible content.
- defaultOpen  boolean, optional. Default: false.
- disabled     boolean, optional. Default: false.

Accordion:
- children     ReactNode, required. One or more <AccordionItem>.

## Tokens used (L4 — never reference L1 in CSS)
- --dls-color-component-accordion-item-border
- --dls-color-component-accordion-item-title-fg
- --dls-color-component-accordion-item-content-fg
- --dls-color-component-accordion-item-bg-hover    → state.overlay.hover.light
- --dls-color-component-accordion-item-bg-pressed  → state.overlay.pressed.light
- --dls-shadow-component-accordion-item-focus-ring  → 0 0 0 3px focus/ring
- --dls-state-component-accordion-item-disabled-opacity → state.disabled.opacity
- --dls-radius-component-accordion
- --dls-spacing-* (semantic spacing only)

Lookup order: L4 component → L2 semantic. Never L1.

## States

### Figma representation
Overlay on 2nd fill layer (state/hover-overlay,
state/pressed-overlay). This SIMULATES the code behavior.
Figma cannot render OKLCH or oklch(from ...) relative color,
so overlays are the tooling-compatible proxy.

### Code implementation
AccordionItem has no base fill — the trigger sits on the page
background. Therefore code uses overlay tokens too. The
Figma<>code mapping is 1:1 for THIS component. Do NOT
generalize this to filled components like Button.

### State tokens (Layer 3)
- --dls-state-l-delta-hover    = -0.05  (code: OKLCH only)
- --dls-state-l-delta-pressed  = -0.10  (code: OKLCH only)
- --dls-state-hover-overlay    = rgba(0,0,0,0.05)
                                 dark: rgba(255,255,255,0.08)
- --dls-state-pressed-overlay  = rgba(0,0,0,0.10)
                                 dark: rgba(255,255,255,0.15)
- --dls-state-disabled-opacity = 0.38
- --dls-state-focus-ring-color = color.info.300

### Per-state behavior
- normal        → no overlay.
- hover         → background: var(--dls-state-hover-overlay);
                  :hover:not(:disabled).
- focus-visible → box-shadow ring via focus-ring-color.
                  Never outline. Never plain :focus.
- pressed       → background: var(--dls-state-pressed-overlay);
                  :active:not(:disabled).
- disabled      → opacity: var(--dls-state-disabled-opacity);
                  aria-disabled handled by native [disabled].
- open          → DOM has data-open; chevron rotates 180deg.

### Forbidden in code
- Hardcoded rgba(0,0,0,0.05) — use the overlay token.
- OKLCH L-shift here — no base fill to shift.
- opacity on hover — opacity is reserved for disabled.
- Treating Figma's overlay layer as literal CSS for filled
  components elsewhere in the system.

## Accessibility contract
- Trigger MUST be a native <button>, never a <div>.
- aria-expanded on trigger reflects open state.
- aria-controls on trigger points to content panel id.
- Content panel has role="region" with aria-labelledby
  pointing back to the trigger.
- Chevron: lucide-react ChevronDown with aria-hidden="true".
- Keyboard: Space/Enter toggles. Tab moves between triggers.
- prefers-reduced-motion disables chevron rotation and
  background-color transitions.
- Disabled item: native [disabled] on button. AT skips it.

## Composition rules
- Header copy <= 60 chars, sentence case.
- Content uses <Text>, not raw <p>.
- No nested Accordions (max depth = 1).
- No interactive elements in the trigger besides the trigger
  itself (no buttons-within-buttons).
- Group with <Accordion> when 2+ items share a section.
- Transition: 150ms ease for background, 200ms ease for
  chevron transform.

## Known deviations from system rules
None. All previously tracked deviations have been resolved:
- Icon migrated from inline SVG to lucide-react ChevronDown.
- aria-controls and role="region" implemented.
- prefers-reduced-motion media query added.

## Code example
<Accordion>
  <AccordionItem title="What is a design system?" defaultOpen>
    A collection of reusable components, patterns, and guidelines.
  </AccordionItem>
  <AccordionItem title="How do I use tokens?">
    Reference CSS custom properties from the L4 component layer.
  </AccordionItem>
</Accordion>

## Cross-references
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/patterns/composition.md
- specs/patterns/component-selection.md
- specs/components/tabs.md (decision: disclosure vs tabs)
