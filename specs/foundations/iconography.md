---
name: Iconography
category: foundation
status: active
read_when:
  - icon_decision
  - action_component
  - navigation_component
source_of_truth:
  - CLAUDE.md
  - tokens/tokens.json
  - tokens/tokens.css
  - apps/storybook/src/stories/
---

# Iconography

## Overview

DLS-Lead product UI uses `lucide-react` icons. Icons inherit size and color from the component slot whenever possible.

## Icon Source

- Use `lucide-react`.
- Import icons with an `Icon` suffix alias, for example `Settings as SettingsIcon`.
- Do not introduce a second icon library.
- Do not hand-roll SVG icons for ordinary product UI.

## Stroke Tokens

| Token | Value | Use |
|---|---:|---|
| `--dls-icon-stroke-12` | `1` | 12px icons |
| `--dls-icon-stroke-16` | `1.33` | 16px icons |
| `--dls-icon-stroke-24` | `2` | 24px icons |

## Size Rules

- Dense controls usually use 16px icons.
- Small metadata or compact inline UI may use 12px icons when already documented by the component.
- Larger empty states or illustrations may use 24px icons.
- Do not pass one-off inline `size` or `color` props when the component slot controls those values.

## Color Rules

- Icons used as text companions inherit `currentColor`.
- Icons on filled controls use the same foreground token as the label.
- Status icons use the matching intent text token.
- Disabled icons use `--dls-color-text-disabled`.

## Accessibility Rules

- Decorative icons are hidden from assistive tech.
- Icon-only buttons must provide `aria-label`.
- Status icons must not be the only signifier of status.

## Never Do This

- Add custom SVG path constants for product UI.
- Mix icon stroke widths within one control.
- Color icons with raw hex values.
- Use an icon where a text label is required for comprehension.

## Cross-References

- [accessibility.md](accessibility.md)
- [color.md](color.md)
- [../components/button.md](../components/button.md)

