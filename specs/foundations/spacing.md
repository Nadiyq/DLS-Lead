---
name: Spacing
category: foundation
status: active
read_when:
  - spacing_decision
  - layout_decision
  - component_padding
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Spacing

## Overview

DLS-Lead uses an 8pt-grid-aligned spacing scale with a few intermediary steps for tighter controls.

## Closed Spacing Scale

| Token | Value |
|---|---|
| `--dls-spacing-0` | `0px` |
| `--dls-spacing-0-5` | `2px` |
| `--dls-spacing-1` | `4px` |
| `--dls-spacing-1-5` | `6px` |
| `--dls-spacing-2` | `8px` |
| `--dls-spacing-2-5` | `10px` |
| `--dls-spacing-3` | `12px` |
| `--dls-spacing-4` | `16px` |
| `--dls-spacing-6` | `24px` |
| `--dls-spacing-8` | `32px` |
| `--dls-spacing-10` | `40px` |
| `--dls-spacing-11` | `44px` |
| `--dls-spacing-12` | `48px` |
| `--dls-spacing-14` | `56px` |
| `--dls-spacing-16` | `64px` |

## Preferred Usage Bands

- Micro alignment: `0.5`, `1`, `1.5`
- Inline icon/text gaps: `1.5`, `2`
- Control padding and compact groups: `2`, `2.5`, `3`
- Card and section padding: `4`, `6`
- Large section separation: `8`, `10`, `12`

## Practical Rules

- Prefer `8px`, `12px`, `16px`, `24px`, and `32px` bands for most layout decisions.
- Use the smaller half-steps for dense controls, not for page-scale layout rhythm.
- When a component already defines its own spacing, do not override it unless the system requires a real variant.
- Keep related content closer together than unrelated content.

## Examples From The System

- Button gaps use `--dls-spacing-2` or `--dls-spacing-1`
- Input and dropdown fields use `--dls-spacing-1-5`, `--dls-spacing-2`, and `--dls-spacing-3`
- Focused filter and menu compositions usually separate stacked regions with `--dls-spacing-1` to `--dls-spacing-4`

## Never Do This

- Invent `14px`, `18px`, or `22px` spacing when a token already exists nearby
- Mix raw `px` spacing with tokens in the same component
- Tighten one instance of a component with one-off padding overrides

## Cross-References

- [tokens/token-reference.md](../tokens/token-reference.md)
- [patterns/composition.md](../patterns/composition.md)
