# Spinner

Category: loading / feedback
React: <Spinner>
Spec: specs/components/spinner.md
TSX: apps/storybook/src/stories/spinner/Spinner.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-spinner--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6443-2276

--------------------------------------------
## State implementation contract

No interactive color states. Spinner has a single continuous
rotation animation. No hover, pressed, focus, or disabled
visual changes.

- Animation: 0.75s linear infinite rotation
- Color: --dls-color-intent-neutral-base via currentColor
- prefers-reduced-motion: animation paused
--------------------------------------------

## Purpose
Indeterminate loading indicator. Shows an animated rotating
arc to indicate ongoing processing. Uses lucide-react
LoaderCircle icon with CSS rotation animation. Five sizes
with stroke width scaling to match.

## Use when
- Indeterminate loading states (data fetching, processing).
- Inline loading alongside text ("Saving...").
- Button loading states (inside a disabled button).
- Centered in a container as a page/section loader.

## Do NOT use for
- Determinate progress → use ProgressBar.
- Skeleton content placeholders → use Skeleton.
- Long page loads with layout hints → use Skeleton.

## Figma → Code mapping

### Figma component set: Spinner (6443:2276)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| size           | size             | "12" / "16" / "20" / "24" / "32". Default "24". |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| size             | SpinnerSize, default "24". |
| aria-label       | string, default "Loading". |
| className        | string, optional. |

Notes:
- Figma uses Icon / LoaderCircle instances at each size.
  Code uses lucide-react LoaderCircle with matching
  strokeWidth per size.
- Stroke widths per size: 12→1, 16→1.33, 20→1.67,
  24→2, 32→2.

## Anatomy
1. Root — <div class="dls-spinner" role="status"
   aria-label="Loading">, rotating container.
   data-size attribute controls dimensions.
2. Icon — <LoaderCircle> from lucide-react, aria-hidden.
   Stroke width varies by size. Fills 100% of container.

## Props / API
- size            SpinnerSize, default "24".
                  "12" | "16" | "20" | "24" | "32".
- aria-label      string, default "Loading".
- className       string, optional.
- Ref forwarded to root <div>.

## Tokens used
Intent tokens:
- --dls-color-intent-neutral-base (spinner color via
  currentColor)

No L4 component tokens exist in tokens.json for spinner.

## States

### Figma representation (Spinner 6443:2276)
- size: 12 / 16 / 20 / 24 / 32
- No state variations — always animating.

### Code implementation
- Always rotating: animation dls-spinner-rotate 0.75s
  linear infinite.
- @media (prefers-reduced-motion: reduce): animation
  paused (static display).
- No hover, focus, pressed, or disabled states.

## Accessibility contract
- Root has role="status" for live region announcement.
- aria-label defaults to "Loading" — override for
  context-specific labels.
- Icon has aria-hidden="true" (decorative).
- Respects prefers-reduced-motion (animation stops).
- Not keyboard focusable (passive indicator).

## Composition rules
- Spinner is self-contained. No children.
- Use inline with text for contextual loading messages.
- Use centered in a container for page/section loading.
- Inside a Button: use size="16" with button disabled.
- For skeleton layouts, prefer Skeleton over Spinner.

## Known deviations
- No L4 color tokens in tokens.json. Uses
  --dls-color-intent-neutral-base directly.
  Severity: low.

## Code example
<Spinner size="24" />

<!-- Inline with text -->
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Spinner size="16" />
  Saving changes...
</div>

<!-- Custom label -->
<Spinner size="32" aria-label="Loading dashboard data" />

## Cross-references
- Skeleton (content placeholders)
- ProgressBar (determinate progress)
- Button (loading state composition)
- specs/components/spinner.md
