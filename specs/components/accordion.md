---
name: Accordion
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Accordion.tsx
  - apps/storybook/src/stories/accordion.css
  - tokens/tokens.json
---

# Accordion

## Metadata

- Category: layout / disclosure
- Variants: none
- Intents: none
- Sizes: none

## Overview

Use `AccordionItem` for collapsible content sections. Wrap multiple items in `Accordion` for a grouped layout.

Do not use it for navigation or tabbed interfaces.

## Anatomy

- Root (`Accordion`): groups items
- `AccordionItem` root
- Trigger button with title and chevron
- Collapsible content area

## Tokens Used

- `--dls-color-component-accordion-*`
- `--dls-radius-component-accordion`
- `--dls-spacing-*`

## Props / API

- `title` — header text
- `children` — collapsible content
- `defaultOpen` — start expanded
- `disabled` — disable interaction

## States

- closed (default)
- open
- disabled
- hover
- focus-visible

## Code Example

```tsx
<Accordion>
  <AccordionItem title="Section one" defaultOpen>
    Content here.
  </AccordionItem>
  <AccordionItem title="Section two">
    More content.
  </AccordionItem>
</Accordion>
```

## Cross-References

- [../patterns/composition.md](../patterns/composition.md)
