# BadgeIndicator / indicator

Category: status / notification
Figma component set: indicator
React: <BadgeIndicator>
Spec: specs/components/badge-indicator.md
TSX: apps/storybook/src/stories/badge/indicator/BadgeIndicator.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-badge-indicator--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6478-4120

--------------------------------------------
## State implementation contract

BadgeIndicator is informational and does not define interactive hover,
pressed, focus, selected, or disabled states.

In code:
- Visual variation is controlled by `data-intent` and `data-size`.
- Count overflow is computed from `value` and `max`.
- The root stays a passive `<span>`.
--------------------------------------------

## Purpose

High-attention notification indicator for unread/new states. Place it on
top-right corners of notification icons, icon buttons, avatars, or other
compact controls when the UI needs a strong attention signal.

## Use when

- Marking a notification icon or button as needing attention.
- Showing a compact unread count over an icon.
- Showing dot-only attention state with `size="xs"`.
- The notification signal is more urgent than an ordinary count.

## Do NOT use for

- Ordinary item totals or tab counts -> use BadgeNumber.
- Passive status labels -> use Badge.
- Editable filters or selectable values -> use ChipRegular or FilterChip.
- Long text or helper copy -> use Text.

## Figma -> Code mapping

| Figma property | React prop | Values |
|---|---|---|
| size | size | XS -> xs, S -> s, M -> m, L -> l |
| text | value | numeric value |
| component set | React component | fixed: BadgeIndicator |

Notes:
- Figma node 6478:4120 is fixed to danger intent. React defaults to
  `intent="danger"` and also supports additional Storybook-documented
  intents for code reuse.
- Figma `XS` is dot-only. In React, `value` is ignored visually at
  `size="xs"`.
- React `max` has no Figma property. It controls overflow display, for
  example `value={100}` with `max={99}` renders `99+`.

## Anatomy

1. Root filled circular indicator: `<span class="dls-badge-indicator">`.
2. Optional numeric text derived from `value` and `max`.

## Props / API

- value number, optional. Numeric value to display. Ignored visually at
  `size="xs"`.
- max number, optional. Default: 99. Values above max render as `{max}+`.
- intent BadgeIndicatorIntent, optional. Default: danger.
  Values: neutral, primary, info, success, warning, danger.
- size BadgeIndicatorSize, optional. Default: m.
  Values: xs, s, m, l.
- className string, optional. Additional root class.
- Standard span attributes are allowed for metadata and announcements,
  such as `title` and `aria-live`. Put the accessible notification label
  on the parent control rather than on the passive indicator span.

## Tokens used

- --dls-color-intent-neutral-base
- --dls-color-intent-neutral-on-base
- --dls-color-intent-primary-base
- --dls-color-intent-primary-on-base
- --dls-color-intent-info-base
- --dls-color-intent-info-on-base
- --dls-color-intent-success-base
- --dls-color-intent-success-on-base
- --dls-color-intent-warning-base
- --dls-color-intent-warning-on-base
- --dls-color-intent-danger-base
- --dls-color-intent-danger-on-base
- --dls-font-family
- --dls-font-weight-semibold
- --dls-radius-component-badge
- --dls-spacing-1
- --dls-spacing-1-5
- --dls-spacing-2
- --dls-spacing-4
- --dls-spacing-6
- --dls-spacing-8
- --dls-text-avatar-2xs-font-size
- --dls-text-avatar-2xs-line-height
- --dls-text-avatar-3xs-font-size
- --dls-text-avatar-3xs-line-height

Lookup order: L4 component -> L2 semantic/intent -> primitive aliases
through token definitions. Do not reference raw hex values in component
CSS.

## States

### Figma representation

Figma shows the `indicator` component set as four size symbols:
`XS`, `S`, `M`, and `L`. The canonical set is node 6478:4120.

### Code implementation

BadgeIndicator exposes:
- `data-intent="neutral | primary | info | success | warning | danger"`
- `data-size="xs | s | m | l"`

No hover, active, disabled, selected, or focus states are defined because
BadgeIndicator is not interactive.

### Per-size behavior

- xs -> 8px dot, no visible text.
- s -> 16px circle, 10px semibold numeric text.
- m -> 24px circle, 12px semibold numeric text.
- l -> 32px circle, 12px semibold numeric text.

## Accessibility contract

- Root is a `<span>` and is not keyboard focusable.
- The visible number is exposed as plain text by default.
- Dot-only indicators should get accessible meaning from the consuming
  control, for example a notification button label.
- Put the accessible notification label on the parent control when the
  count needs context, for example `aria-label="2 unread notifications"`
  on the notification button.
- Dynamic count updates should be announced by the consuming surface
  with `aria-live="polite"` when needed.
- Do not place interactive controls inside BadgeIndicator.

## Composition rules

- Place on the top-right corner of icon buttons, notification buttons,
  avatars, or compact notification targets.
- Prefer `size="xs"` for dot-only urgency.
- Prefer `BadgeNumber` for less urgent counters, menu totals, or tab
  totals.
- Do not use BadgeIndicator as a standalone status label.

## Known deviations from system rules

- Code-supported extension: React supports additional intents
  (`neutral`, `primary`, `info`, `success`, `warning`) beyond the
  danger-only Figma node 6478:4120. Severity: low.

## Known accessibility gaps

None.

## Code example

```tsx
<BadgeIndicator size="xs" intent="danger" />
```

```tsx
<BadgeIndicator
  value={2}
  size="m"
  intent="danger"
/>
```

```tsx
<BadgeIndicator value={128} max={99} size="l" intent="danger" />
```

## Cross-references

- specs/components/badge-indicator.md
- specs/components/badge-number.md
- specs/components/badge.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md
