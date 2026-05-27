# Accordion (group)

Category: layout / disclosure
React: <Accordion>
Spec: specs/components/accordion.md
TSX: apps/storybook/src/stories/Accordion.tsx
Companion: AccordionItem (the disclosure unit)

--------------------------------------------
## Relationship to AccordionItem

Accordion is a LAYOUT WRAPPER. It owns:
- Vertical stacking of items
- Spacing between items
- Grouped visual treatment

It does NOT own:
- Open/closed state (each AccordionItem manages its own)
- Trigger behavior
- Content rendering

For per-item states, props, tokens, accessibility, and
Figma->code mapping -> see the AccordionItem component
description.
--------------------------------------------

## Purpose
Wrap 2+ AccordionItems into a grouped, consistently-spaced
disclosure list. Use solo <AccordionItem> when there is only
one disclosure on the screen.

## Use when
- Two or more related disclosures appear together (FAQ,
  settings groups, filter sections).
- A consistent visual rhythm between items is required.
- The items share a parent heading or section context.

## Do NOT use for
- A single disclosure -> render <AccordionItem> directly.
- Mutually exclusive views -> use Tabs.
- Required form steps -> use Stepper.
- Nested grouping -> max depth = 1. No Accordion inside
  Accordion, no Accordion inside AccordionItem content.

## Figma -> Code mapping
| Figma property | React prop | Values    |
|----------------|------------|-----------|
| Slot (1 item)  | children   | ReactNode |

Notes:
- Figma "Slot" accepts a list of nested AccordionItem
  instances. In code, this is `children` — one or more
  <AccordionItem> elements.
- No variants, intents, sizes, or states on Accordion itself.
  All visual variation lives on AccordionItem.

## Anatomy
1. Accordion root — a <div class="dls-accordion"> that
   stacks children vertically.
2. AccordionItem children — at minimum 2, no maximum but
   recommend <= 7 for scannability.

## Props / API
- children   ReactNode, required. One or more <AccordionItem>.
- className  string, optional. Pass-through for layout
             composition only — do NOT use it to add custom styling.

## Tokens used
Accordion itself reads layout tokens only:
- --dls-font-family (global)
- --dls-radius-component-accordion (if grouped treatment
  applies a shared radius)

All color, border, hover, focus, and state tokens belong to
AccordionItem. Do not reference AccordionItem tokens from
the group's CSS.

## States
None. Accordion has no interactive states. Hover, focus,
pressed, and disabled all live on AccordionItem.

## Composition rules
- Minimum children: 2 AccordionItems. For 1 item, render
  AccordionItem solo without the Accordion wrapper.
- Recommended: 2-7 items. Beyond 7, consider Tabs, a
  searchable List, or splitting into sections.
- Children type: <AccordionItem> only. No other components,
  no raw HTML, no Text/Card/etc.
- Max depth = 1. No nesting.
- The wrapping Accordion does not add headers, dividers,
  or chrome between items — that's the item's own border.

## Accessibility contract
- Accordion is a presentational wrapper. It does NOT add
  role, aria-label, or any landmark.
- If the group needs an accessible name, wrap it in a
  <section aria-labelledby="..."> with a preceding heading,
  in the consumer layout. Do not bake that into Accordion.
- Each AccordionItem manages its own aria-expanded,
  keyboard handling, and focus. Accordion does not
  coordinate them.

## Multi-open vs single-open behavior
Current implementation: MULTI-OPEN. Each AccordionItem owns
independent state. Opening one does not close others.

If a consumer needs single-open (only one item expanded at
a time), that is a separate component pattern — do not try
to hack it via refs or context on the existing Accordion.
File a request; do not invent.

## Forbidden in code
- Adding state, props, or context to coordinate items.
- Wrapping non-AccordionItem children.
- Styling the group with borders/backgrounds/shadows —
  the item is the visual unit, not the group.
- Using Accordion for a single item.

## Known deviations from system rules
None.

## Code example
<Accordion>
  <AccordionItem title="Account settings">
    Manage your profile, email, and password.
  </AccordionItem>
  <AccordionItem title="Notifications" defaultOpen>
    Choose how and when you hear from us.
  </AccordionItem>
  <AccordionItem title="Billing">
    View invoices and payment methods.
  </AccordionItem>
</Accordion>

## Cross-references
- AccordionItem (the disclosure unit — primary contract)
- specs/components/accordion.md
- specs/patterns/composition.md
- specs/components/tabs.md (decision: disclosure vs tabs)
- specs/components/list-item.md (decision: when 7+ items)
