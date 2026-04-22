---
name: Typography
category: foundation
status: active
read_when:
  - text_style_decision
  - choosing_heading
  - choosing_body_copy
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Typography

## Overview

DLS-Lead uses `Inter` with a fixed weight scale and semantic text categories. Agents should pick from semantic text tokens instead of inventing type styles.

## Font Family And Weights

- Font family: `Inter`
- Weights:
  - `400` normal
  - `500` medium
  - `600` semibold
  - `800` bold
  - `900` black

## Primitive Size Scale

| Scale | Size / Line Height |
|---|---|
| `xs` | `10 / 14` |
| `s` | `12 / 16` |
| `m` | `14 / 20` |
| `l` | `16 / 24` |
| `xl` | `18 / 26` |
| `2xl` | `24 / 32` |
| `3xl` | `32 / 40` |
| `hero` | `36 / 46` |

## Semantic Categories

### Headings

- `hero`: `36/46`, weight `800`
- `h1`: `32/40`, weight `600`
- `h2`: `24/32`, weight `600`
- `h3`: `18/26`, weight `600`
- `h4`: `16/24`, weight `600`
- `h5`: `14/20`, weight `600`
- `h6`: `12/16`, weight `800`

### Paragraph

Paragraph styles come in `xl | l | m | s | xs`, each with:

- `light`
- `medium`
- `heavy`

### Button

Button labels come in `l | m | s | xs`, all using weight `500`.

### Link

Link styles come in `l | m | s | xs` with `light | medium | heavy`.

### Upper

Uppercase labels come in `l | m | s | xs`, use weight `500`, and use uppercase with letter spacing.

### Avatar

Avatar initials have their own semantic scale from `2xl` down to `5xs`.

## Usage Rules

- Use heading tokens for headings, not “large paragraph” approximations.
- Use paragraph tokens for body copy and descriptions.
- Use button tokens for interactive labels.
- Use link tokens for inline or standalone links.
- Use uppercase tokens only for overlines, labels, and compact metadata.

## Common Defaults In Existing Components

- Input values: text `m`
- Labels and hints: text `s`
- Buttons: button `m` or `s`
- Compact metadata and placeholders: text `xs` or text `s`

## Never Do This

- Invent a new `15px / 22px` body style
- Use raw font weights in a component when a semantic text token exists
- Style heading-like content with arbitrary bold paragraph text if a heading token fits

## Cross-References

- [tokens/token-reference.md](../tokens/token-reference.md)
- [components/text.md](../components/text.md)
