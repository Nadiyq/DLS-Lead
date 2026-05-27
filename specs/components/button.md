---
name: Button
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Button.tsx
  - apps/storybook/src/stories/button.css
  - tokens/tokens.json
---

# Button

## Metadata

- Category: action
- Variants: `filled | outline | soft | dotted | ghost | link`
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s`

## Overview

Use `Button` for direct actions. Prefer it for CTAs, row actions, toolbar actions, modal actions, and small inline actions.

Do not use it for passive status, tags, or filter summaries.

## Action Hierarchy

- Use `variant="filled"` for the primary action in a row.
- Use `variant="outline"` for the secondary action in a row.
- Use `variant="soft"` for tonal supporting actions that should
  remain visible without becoming the primary or secondary row
  treatment.
- Use `variant="dotted"` for dashed optional, additive, or
  placeholder-like actions that should be visible but lower emphasis
  than filled, outline, or soft treatments.
- Use `variant="ghost"` for borderless tertiary or contextual actions
  that should stay available without adding a visible container at rest.
- Use `variant="link"` for inline text-style actions that should read
  like links while still triggering a button action. Link buttons must
  keep a visible text label; there is no Figma icon-only link set.
- Filled and outline buttons may sit together as a primary/secondary
  pair, such as `Do something` + `Cancel`.
- Do not use two filled buttons or two outline buttons for a
  primary/secondary pair in the same row. The mixed variants create
  the visual hierarchy.
- Do not use soft as a substitute for filled or outline when a row
  needs explicit primary/secondary hierarchy.
- Do not use dotted as a substitute for filled or outline when a row
  needs explicit primary/secondary hierarchy.
- Do not use ghost as a substitute for filled or outline when a row
  needs explicit primary/secondary hierarchy.
- Do not use link as a substitute for filled or outline when a row
  needs explicit primary/secondary hierarchy.
- Do not use link for navigation to another URL or route. Use a
  semantic anchor or link component for navigation.
- Intent is separate from hierarchy. A filled button can use any
  intent when that action is primary; an outline button can use any
  intent when that action is secondary; a soft button can use any
  intent when that action is tonal/supporting; a dotted button can
  use any intent when that action is optional/supporting; a ghost
  button can use any intent when that action is tertiary/contextual;
  a link button can use any intent when that action is inline and
  text-style.

## Anatomy

- Root button
- Leading icon slot
- Label content
- Trailing icon slot

## Tokens Used

- `--dls-radius-component-button`
- `--dls-color-intent-*`
- `--dls-state-l-delta-*`
- `--dls-state-hover-overlay`
- `--dls-state-pressed-overlay`
- `--dls-state-focus-ring-color`
- `--dls-spacing-*`

## Props / API

- `variant`
- `intent`
- `size`
- `icon`
- `iconEnd`
- `iconOnly`
- standard button HTML attributes

## States

- default
- hover
- active / pressed
- focus-visible
- disabled

Filled and soft buttons use OKLCH shifts. Outline, dotted, ghost, and link buttons use overlay tokens.

## Code Example

```tsx
<div role="group" aria-label="Form actions">
  <Button variant="filled" intent="primary" size="m">
    Save
  </Button>
  <Button variant="outline" intent="neutral" size="m">
    Cancel
  </Button>
</div>

<Button
  variant="ghost"
  intent="neutral"
  size="s"
  icon={<SettingsIcon />}
  iconOnly
  aria-label="Settings"
/>
```

## Cross-References

- [badge.md](badge.md)
- [filter-chip.md](filter-chip.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)
