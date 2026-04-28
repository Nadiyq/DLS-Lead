---
name: Typography Tokens
category: tokens
status: active
read_when:
  - typography_decision
  - text_component
  - label_decision
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Typography Tokens

## Font Family

| Token | Value |
|---|---|
| `--dls-font-family` | `"Inter", sans-serif` |

## Font Weights

| Token | Value |
|---|---:|
| `--dls-font-weight-normal` | `400` |
| `--dls-font-weight-medium` | `500` |
| `--dls-font-weight-semibold` | `600` |
| `--dls-font-weight-bold` | `800` |
| `--dls-font-weight-black` | `900` |

## Primitive Text Scale

| Token pair | Size | Line height |
|---|---:|---:|
| `--dls-text-xs-*` | `10px` | `14px` |
| `--dls-text-s-*` | `12px` | `16px` |
| `--dls-text-m-*` | `14px` | `20px` |
| `--dls-text-l-*` | `16px` | `24px` |
| `--dls-text-xl-*` | `18px` | `26px` |
| `--dls-text-2xl-*` | `24px` | `32px` |
| `--dls-text-3xl-*` | `32px` | `40px` |
| `--dls-text-hero-*` | `36px` | `46px` |

## Semantic Families

| Family | Pattern | Use |
|---|---|---|
| Heading | `--dls-text-heading-{level}-*` | Page, section, and compact headings |
| Paragraph | `--dls-text-paragraph-{size}-{weight}-*` | Body and supporting content |
| Button | `--dls-text-button-{size}-*` | Button labels |
| Link | `--dls-text-link-{size}-{weight}-*` | Inline and standalone links |
| Upper | `--dls-text-upper-{size}-*` | Uppercase labels |
| Italic | `--dls-text-italic-{size}-*` | Italic body text |
| Avatar | `--dls-text-avatar-{size}-*` | Avatar initials |

## Usage Rules

- Prefer the `Text` component when it covers the need.
- Use semantic typography tokens rather than primitive size tokens in component CSS.
- Keep type size stable across viewport widths.
- Match type size to component density; do not use hero-scale type in compact panels.

## Never Do This

- Use viewport-based font sizes.
- Add negative letter spacing.
- Use raw font sizes in component CSS.
- Invent new font weights outside the published weight tokens.

## Cross-References

- [token-reference.md](token-reference.md)
- [../foundations/typography.md](../foundations/typography.md)
- [../components/text.md](../components/text.md)

