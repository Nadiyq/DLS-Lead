# Typography

DLS-Lead typography system. All values are token-driven.

## Font Stack

Family: `Inter`. Weights: 400 (normal), 500 (medium), 600 (semibold), 800 (bold), 900 (black).

## Primitive Scale

| Token | Size / Line-height |
|-------|--------------------|
| `text.xs` | 10/14 |
| `text.s` | 12/16 |
| `text.m` | 14/20 |
| `text.l` | 16/24 |
| `text.xl` | 18/26 |
| `text.2xl` | 24/32 |
| `text.3xl` | 32/40 |
| `text.hero` | 36/46 |

## Semantic Categories (7)

**Headings** — hero(36/800), h1(32/600), h2(24/600), h3(18/600), h4(16/600), h5(14/600), h6(12/800)

**Paragraph** — 5 sizes (xl→xs) × 3 weights (light=400, medium=500, heavy=600). `xs` adds `letter-spacing: 0.2px`. `xs.heavy` uses weight 500.

**Button** — 4 sizes (l→xs), all weight 500. `xs` adds `letter-spacing: 0.5px`.

**Link** — 4 sizes (l→xs) × 3 weights. `xs` adds `letter-spacing: 0.5px`.

**Upper** — 4 sizes, weight 500, `text-transform: uppercase`, `letter-spacing: 0.01em`.

**Italic** — 4 sizes, weight 400, `font-style: italic`.

**Avatar** — 10 sizes (2xl→5xs), weight 600, line-height = font-size.

## CSS Usage

```css
/* Heading */
font-size: var(--dls-text-heading-h2-font-size);
line-height: var(--dls-text-heading-h2-line-height);
font-weight: var(--dls-text-heading-h2-font-weight);

/* Paragraph with weight variant */
font-size: var(--dls-text-paragraph-m-font-size);
font-weight: var(--dls-text-paragraph-m-heavy-font-weight);

/* Button text */
font-size: var(--dls-text-button-m-font-size);
font-weight: var(--dls-text-button-m-font-weight);
```
