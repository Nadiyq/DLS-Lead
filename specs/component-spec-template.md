---
name: Component Spec Template
category: system
status: active
read_when:
  - creating_component_spec
  - updating_component_spec
---

# Component Spec Template

Use this template when adding a spec for a Storybook component. Only document components that exist in the repo or are being intentionally added.

````md
---
name: Component Name
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/path/Component.tsx
  - apps/storybook/src/stories/path/component.css
  - tokens/tokens.json
---

# Component Name

## Metadata

- Category:
- Variants:
- Intents:
- Sizes:

## Overview

Use this component when...

Do not use it when...

## Anatomy

- Root
- Slot or subpart

## Tokens Used

- `--dls-token-name`

## Props / API

- `propName`

## States

- default
- hover
- pressed / active
- focus-visible
- disabled
- error, if applicable

## Code Example

```tsx
<ComponentName />
```

## Cross-References

- [related-component.md](components/related-component.md)
- [../patterns/component-selection.md](patterns/component-selection.md)
````
