# DESIGN.md

AI-facing design contract for DLS-Lead. Paste this into AI tools before asking them to generate interfaces, screens, components, or CSS.

## Brand

Name: DLS-Lead

Purpose: A design system for calm, dense, work-focused product interfaces. DLS-Lead should feel precise, useful, and composed, not promotional.

Voice:

- Use simple, precise language.
- Speak to teams building and operating workflows.
- Be warm and direct, like a mentor, not a marketer.
- Prefer concrete nouns and action verbs.
- Keep labels short, but do not make them cryptic.

Avoid:

- Marketing-page energy in product UI.
- Decorative gradients, glassmorphism, neon, bokeh/orbs, and generic SaaS decoration.
- One-off drop shadows, raw colors, raw spacing, raw radii, and arbitrary font sizes.
- Nested cards used as layout scaffolding.
- Invented component props, variants, states, or token names.

## AI Operating Contract

If the repo or package is available, read these before generating UI:

1. `docs/ai-agent-token-consumption.md`
2. `tokens/tokens.json`
3. `specs/session-start.md`
4. `specs/tokens/README.md`
5. `specs/tokens/token-reference.md`
6. Relevant files in `specs/foundations/`, `specs/patterns/`, and `specs/components/`
7. Storybook documentation for any component you plan to use

Storybook MCP workflow when available:

- Start Storybook with `npm run storybook`.
- Use the MCP endpoint at `http://127.0.0.1:6006/mcp`.
- Run `list-all-documentation` first to discover components and docs pages.
- Run `get-documentation` before using a component.
- Run `get-documentation-for-story` when component docs are not enough for a specific state or usage pattern.
- Run `get-storybook-story-instructions` before creating or editing stories.
- Run `run-story-tests` after UI changes when Storybook test tools are available.

Hard rules:

- Use only named DLS tokens in code.
- Prefer Layer 4 component tokens inside component CSS.
- Use Layer 2 semantic tokens when no component token exists.
- Use Layer 3 state tokens for hover, pressed, focus-visible, and disabled behavior.
- Do not use Layer 1 primitive tokens directly in component CSS.
- Do not hardcode hex, rgb, hsl, rgba, px spacing, radii, shadows, or ad hoc font styles in UI code.
- Use `data-variant`, `data-intent`, `data-size`, and native states rather than class-based state names like `.is-active` or `.has-error`.
- Use `:focus-visible` plus the focus ring token. Do not use plain `:focus` as the visual focus treatment.
- Use `lucide-react` icons only. Do not hand-roll SVG icons for normal product UI.
- If a needed component, token, prop, or variant is not documented, stop and ask instead of guessing.

## Token Model

DLS-Lead uses a 4-layer token architecture:

| Layer | Use |
|---|---|
| Layer 1 primitives | Raw values. Read only; do not use directly in component CSS. |
| Layer 2 semantics | UI meaning: surface, text, border, intent, overlay. |
| Layer 3 state | Hover, pressed, focus, disabled behavior. |
| Layer 4 component | Component-specific styling. Prefer these inside component CSS. |

State model:

- Code uses hex/rgba primitives plus OKLCH relative color shifts for hover and pressed states.
- Figma-compatible state equivalents may use overlays.
- Filled and soft variants usually use OKLCH lightness shifts.
- Outline, dotted, ghost, link, and transparent variants usually use state overlay tokens.

## Color

Use semantic or component tokens, not raw color literals. Raw values below are references for visual understanding only.

### Light Theme

| Role | Token | Reference value |
|---|---|---|
| Primary surface | `--dls-color-surface-base` | `#FFFFFF` |
| Secondary surface | `--dls-color-surface-subtle` | `#FAFAFA` |
| Muted surface | `--dls-color-surface-muted` | `#F5F5F5` |
| Strong surface | `--dls-color-surface-strong` | `#D5D7DA` |
| Primary text | `--dls-color-text-primary` | `#181D27` |
| Secondary text | `--dls-color-text-secondary` | `#414651` |
| Placeholder text | `--dls-color-text-placeholder` | `#535862` |
| Base border | `--dls-color-border-base` | `#D5D7DA` |
| Subtle border | `--dls-color-border-subtle` | `#E9EAEB` |
| Strong border | `--dls-color-border-strong` | `#717680` |
| Focus border | `--dls-color-border-focus` | `#414651` |

### Intent Families

Use the closed intent pattern:

`--dls-color-intent-{intent}-{slot}`

Supported intents:

- `neutral`
- `primary`
- `info`
- `success`
- `warning`
- `danger`

Supported slots:

- `base`
- `on-base`
- `subtle`
- `strong`
- `text`
- `border`

Rules:

- Filled UI uses `intent.*.base` with `intent.*.on-base`.
- Soft UI uses `intent.*.subtle` with `intent.*.text`.
- Error states use the `danger` intent family.
- Disabled states use disabled semantic tokens, not opacity-modified active colors.
- Primary is a functional accent, not decoration. Use it for selected, focused, or primary-action meaning.
- Avoid purple gradient decoration even though the primary palette is purple.

## Dark Mode

Dark mode is applied by remapping semantic tokens under `[data-theme="dark"]` or `.theme-dark`.

Do:

- Let components inherit semantic token remaps.
- Keep component CSS token-driven.
- Use dark-mode semantic tokens for surfaces, text, borders, intent, overlays, and focus.

Do not:

- Hardcode per-component dark-mode overrides.
- swap primitive scales directly in component CSS.
- introduce separate dark variants unless the component API documents them.

## Typography

Font family: `Inter`

Weights:

- `400` normal
- `500` medium
- `600` semibold
- `800` bold
- `900` black

Primitive size scale:

| Scale | Size / line-height |
|---|---|
| `xs` | `10px / 14px` |
| `s` | `12px / 16px` |
| `m` | `14px / 20px` |
| `l` | `16px / 24px` |
| `xl` | `18px / 26px` |
| `2xl` | `24px / 32px` |
| `3xl` | `32px / 40px` |
| `hero` | `36px / 46px` |

Semantic type families:

- Headings: `--dls-text-heading-{hero|h1|h2|h3|h4|h5|h6}-*`
- Paragraph: `--dls-text-paragraph-{xl|l|m|s|xs}-{light|medium|heavy}-*`
- Button: `--dls-text-button-{l|m|s|xs}-*`
- Link: `--dls-text-link-{l|m|s|xs}-{light|medium|heavy}-*`
- Uppercase labels: `--dls-text-upper-{l|m|s|xs}-*`
- Avatar initials: `--dls-text-avatar-*`

Rules:

- Use heading tokens for headings.
- Use paragraph tokens for body text and descriptions.
- Use button tokens for interactive labels.
- Use link tokens for links.
- Use uppercase tokens only for overlines, compact labels, and metadata.
- Do not invent type sizes such as `15px / 22px`.
- Do not use viewport-scaled font sizes.
- Keep dense product surfaces typographically quiet.

## Spacing And Layout

DLS-Lead uses an 8pt-grid-aligned spacing scale with smaller steps for dense controls.

Closed spacing scale:

`0`, `2`, `4`, `6`, `8`, `10`, `12`, `16`, `24`, `32`, `40`, `44`, `48`, `56`, `64`

Token names:

- `--dls-spacing-0`
- `--dls-spacing-0-5`
- `--dls-spacing-1`
- `--dls-spacing-1-5`
- `--dls-spacing-2`
- `--dls-spacing-2-5`
- `--dls-spacing-3`
- `--dls-spacing-4`
- `--dls-spacing-6`
- `--dls-spacing-8`
- `--dls-spacing-10`
- `--dls-spacing-11`
- `--dls-spacing-12`
- `--dls-spacing-14`
- `--dls-spacing-16`

Usage:

- Inline icon/text gaps: `--dls-spacing-1-5` to `--dls-spacing-2`
- Dense controls: `--dls-spacing-2` to `--dls-spacing-3`
- Field groups: `--dls-spacing-3` to `--dls-spacing-4`
- Card and panel padding: `--dls-spacing-4` to `--dls-spacing-6`
- Page-level separation: `--dls-spacing-8` and above

Layout rules:

- Use DLS components before raw containers.
- Use full-width bands or unframed layouts for page sections.
- Use cards for repeatable items, panels, and framed tools, not for every section.
- Do not nest cards inside cards.
- Use CSS grid only for real rows, columns, repeated tracks, tables, or fixed-format controls.
- Use `min-width: 0` in flex/grid children containing text.
- Prefer fluid layouts before adding component-local media queries.
- Do not create global breakpoint names unless the token system adds them.

## Radius

Use component radius tokens in component CSS.

Common component radii:

| Component family | Token | Reference value |
|---|---|---|
| Button | `--dls-radius-component-button` | `6px` |
| Input / dropdown / tab | `--dls-radius-component-input`, `--dls-radius-component-dropdown`, `--dls-radius-component-tab` | `6px` |
| Card / table / list / modal / empty state | component radius token | `12px` |
| Chip | `--dls-radius-component-chip` | `6px` |
| Badge / progress / round controls | component radius token | `9999px` |
| Checkbox / list item / breadcrumb | component radius token | `4px` |

Do not introduce one-off values like `10px`.

## Elevation

Use semantic shadow tokens:

- `--dls-shadow-surface-sm`
- `--dls-shadow-surface-md`
- `--dls-shadow-surface-lg`
- `--dls-shadow-overlay`
- `--dls-shadow-focus-ring`

Rules:

- Cards are not shadowed by default unless the documented component style says otherwise.
- Dropdowns, popovers, floating overlays, dialogs, and menus may use overlay or surface shadows.
- Focus uses the focus ring shadow token.
- Do not compose ad hoc `box-shadow` values.

## Motion And Interaction States

State tokens:

- `--dls-state-l-delta-hover`
- `--dls-state-l-delta-pressed`
- `--dls-state-hover-overlay`
- `--dls-state-pressed-overlay`
- `--dls-state-disabled-opacity`
- `--dls-state-focus-ring-color`

Default interaction timing: `150ms ease` for color, border, shadow, and transform until a dedicated motion token exists.

Every interactive component must define or inherit:

- default
- hover
- pressed / active
- focus-visible
- disabled
- error, if applicable
- selected, if applicable

## Iconography

Icon source: `lucide-react`

Rules:

- Import with an `Icon` suffix alias, for example `Settings as SettingsIcon`.
- Icons inherit `currentColor` unless a component slot documents otherwise.
- Dense controls usually use 16px icons.
- Small metadata may use 12px icons when documented.
- Larger empty states may use 24px icons.
- Icon-only buttons require an `aria-label`.
- Decorative icons are hidden from assistive technology.
- Status icons must not be the only status signal.

Stroke tokens:

- `--dls-icon-stroke-12`
- `--dls-icon-stroke-16`
- `--dls-icon-stroke-24`

## Components

Use documented DLS components first. Verify exact props, variants, states, and examples in Storybook before coding.

Common component choices:

| Need | Use |
|---|---|
| Primary, secondary, toolbar, modal, or row action | `Button` |
| Compact status, count, or categorical label | `Badge` |
| Filter visibility and filter editor trigger | `FilterChip` |
| Surface container with title/content/footer | `Card` |
| Zero-data, no-results, or onboarding gap | `EmptyState` |
| Compact paired title and description | `Text` |
| Single-line freeform text | `InputField` |
| Predefined option selection | `Dropdown` |
| List, menu, popover, command, or dropdown rows | `List` and `ListItem` |
| Dense structured tabular data | `Table` with `TableColumn` |
| Local sibling view switching | `Tabs` |

Button:

- Variants: `filled`, `outline`, `soft`, `dotted`, `ghost`, `link`
- Intents: `neutral`, `primary`, `info`, `success`, `warning`, `danger`
- Sizes: `m`, `s`
- Use native button attributes.
- Use `iconOnly` only with an `aria-label`.

Card:

- Types: `regular`, `outline`, `muted`
- Supports title, description, header icon, header content, content, and footer slots.
- Use for intentional grouping, not for page-section decoration.

InputField:

- Use for single-line text entry.
- Supports label, hint, error, clearable behavior, and leading/trailing icons.
- Inputs need visible labels or explicit accessible names.
- Placeholder text is not a label.

Dropdown:

- Use for choosing from predefined options.
- Supports label, hint, error, placeholder, leading icon, disabled state, and documented option data.
- Dropdown and menu rows must be composed with `List` and `ListItem`.

List and ListItem:

- Use `List` as the container for menus, listboxes, command lists, popovers, and grouped selection rows.
- Use `ListItem` for every visible row inside those surfaces.
- Do not build custom dropdown row markup.

Table:

- Use `Table` for dense, structured, multi-row data.
- Compose with `TableColumn`.
- Do not build tabular data from arbitrary div grids.

Tabs:

- Use for switching sibling views in the same context.
- Do not use as global navigation.

## Accessibility

Requirements:

- Use native interactive elements first.
- Every interactive element has a visible `:focus-visible` treatment.
- Icon-only buttons have accessible names.
- Inputs have visible labels or explicit accessible names.
- Hint and error text is connected to fields with `aria-describedby` when supported.
- Disabled controls use native `disabled` when possible.
- Non-native disabled controls use `aria-disabled` and block pointer and keyboard activation.
- Selected states expose `aria-selected`, `aria-current`, or checked semantics as appropriate.
- Error states use danger tokens plus explanatory text.
- Color is never the only signal. Pair color with icon, text, shape, or state semantics.
- Hover-only affordances are also reachable by keyboard focus.
- Body text and controls must meet WCAG 2.1 AA minimum contrast.
- Touch targets should be at least `44px` on mobile.

Never:

- Hide focus rings.
- Use placeholder text as the only field label.
- Use a `div` or `span` as a button when a native `button` works.
- Indicate errors, success, selection, or warning with color alone.

## Screen Composition

For DLS-generated screens:

- Build the actual product surface first, not a marketing landing page.
- Prioritize scanability, comparison, repeated action, and low-friction editing.
- Use restrained hierarchy: one clear page title, compact section headings, and dense controls.
- Use tables for structured data, cards for grouped surfaces, lists for menu/popover rows, and empty states for no-data moments.
- Place the primary action where the team needs it, not as a decorative CTA.
- Use one primary emphasis area per screen when possible.
- Keep page chrome quiet and let data, forms, and workflow controls carry the interface.

## Example CSS Pattern

```css
.dls-example {
  box-sizing: border-box;
  background: var(--dls-color-surface-base);
  color: var(--dls-color-text-primary);
  border: 1px solid var(--dls-color-border-subtle);
  border-radius: var(--dls-radius-component-card);
  padding: var(--dls-spacing-6);
}

.dls-example:focus-visible {
  box-shadow: var(--dls-shadow-focus-ring);
}
```

## Stop Before Generating

Stop and ask when:

- The needed component is missing.
- The needed variant, prop, size, state, or token is not documented.
- A layout requires a new shared breakpoint.
- The generated UI would require raw values or invented tokens.
- Two DLS components seem equally plausible and the local specs do not decide between them.
