# Kbd

Category: typography / display
React: <Kbd>, <KbdGroup>
Spec: specs/components/kbd.md
TSX: apps/storybook/src/stories/kbd/Kbd.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-kbd--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6441-656

--------------------------------------------
## State implementation contract

No interactive states. Purely static display component.
No transitions, no animations, no hover/focus changes.
--------------------------------------------

## Purpose
Keyboard key indicator for shortcut hints. Kbd renders a
single key; KbdGroup combines multiple keys in regular
(adjacent) or separated (+ joined) layout.

## Use when
- Display keyboard shortcut hints (Ctrl+S, ⌘+C).
- Inline shortcut references in documentation or tooltips.
- Tables of keyboard commands.
- Onboarding flows showing key combinations.

## Do NOT use for
- Interactive buttons — use Button.
- Status badges — use Badge or Chip.
- Code snippets — use inline code or a code block.

## Figma → Code mapping

### Figma component set: kbd (6441:656)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| text             | children         | Editable text in Figma. children prop in code. |
| iconLeft         | iconStart        | Boolean toggle in Figma. Presence of iconStart controls visibility in code. |
| iconRight        | iconEnd          | Boolean toggle in Figma. Presence of iconEnd controls visibility in code. |
| changeLeft       | iconStart        | Instance swap slot for left icon. ReactNode in code. |
| changeRight      | iconEnd          | Instance swap slot for right icon. ReactNode in code. |

### Figma component set: kbd-group (6443:1696)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| type             | type             | "regular" maps directly. "+ separated" → "separated" in code. |
| kbd1–kbd4        | —                | Boolean toggles in Figma. In code, children count. |

### Code-only props (Kbd)
| React prop       | Notes |
|------------------|-------|
| children         | Key label. ReactNode. |
| iconStart        | Leading icon slot. ReactNode. |
| iconEnd          | Trailing icon slot. ReactNode. |
| className        | Layout composition only. |

### Code-only props (KbdGroup)
| React prop       | Notes |
|------------------|-------|
| type             | "regular" | "separated". Default "regular". |
| children         | Kbd elements. Dynamic count (not limited to 4). |
| className        | Layout composition only. |

Notes:
- In Figma, key count is controlled by boolean toggles
  (kbd1–kbd4, max 4). In code, the children array is
  dynamic with no upper limit.
- Figma type value "+ separated" maps to "separated" in code.
- Icon slots use instance swap in Figma (changeLeft/Right).
  In code, iconStart/iconEnd accept any ReactNode.

## Anatomy

### Kbd (single key)
1. Root — <kbd class="dls-kbd">, semantic keyboard element.
   Inline-flex, centered, with surface-muted background
   and component radius.
2. Icon start — <span class="dls-kbd__icon">, optional
   leading icon slot. 12×12px.
3. Label — text content (children), medium weight, small size.
4. Icon end — <span class="dls-kbd__icon">, optional
   trailing icon slot. 12×12px.

### KbdGroup
1. Root — <div class="dls-kbd-group" data-type="regular|separated">,
   inline-flex row with gap spacing.
2. Children — Kbd elements placed adjacently.
3. Separator (separated only) —
   <span class="dls-kbd-group__separator">, "+" text
   inserted between each Kbd.

## Props / API

### Kbd
- children        ReactNode, required. Key label text.
- iconStart       ReactNode, optional. Leading icon.
- iconEnd         ReactNode, optional. Trailing icon.
- className       string, optional.
- Ref forwarded to <kbd>.

### KbdGroup
- type            "regular" | "separated", default "regular".
- children        ReactNode, required. Kbd elements.
- className       string, optional.
- Ref forwarded to <div>.

## Tokens used
L4 component token:
- --dls-radius-component-kbd

L2 semantic tokens:
- --dls-color-surface-muted (key background)
- --dls-color-text-secondary (key text, icon, separator)
- --dls-spacing-0-5 (key vertical padding)
- --dls-spacing-1 (key horizontal padding, icon/group gap)
- --dls-font-family
- --dls-text-s-font-size
- --dls-text-s-line-height
- --dls-font-weight-medium

## States

### Figma representation
No state property. Kbd is a static display component.

### Code implementation
No interactive states. No transitions or animations.
The component is purely presentational.

## Accessibility contract
- Uses semantic <kbd> element for each key.
- Non-interactive — not focusable, no ARIA attributes needed.
- Screen readers announce the text content naturally.
- No keyboard interaction — display only.
- No transitions to guard (no reduced-motion needed).

## Composition rules
- Kbd is always used for a single key label.
- Multiple keys are combined using KbdGroup.
- Kbd can be used inline within text paragraphs.
- Icon slots accept lucide-react icons at 12×12px.

### When to use type="regular" (grouped/connected)
Keys are pressed simultaneously. The shortcut represents
a single combined action. The user mentally reads it as
one chord.

Best for:
- System shortcuts (⌘+C, ⌘+Shift+P)
- Editor shortcuts
- Power-user interactions
- Dense documentation and tables of keyboard commands

Rule: "Pressed together" → regular.

### When to use type="separated" (+ between keys)
Keys represent sequential actions or each key has
standalone meaning. Stronger visual scanning.

Best for:
- Tutorial flows ("Press Enter, then Tab")
- Gaming controls (W A S D)
- Step-by-step onboarding
- Cheat sheets grouped by category
- Hardware-style visualizations

Rule: "Seen individually" → separated.

### Recommendation
Use regular (grouped) as the default system component.
Use separated as a special variant for educational UI,
onboarding, gaming/hardware metaphors, and highly
visual interfaces.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  tokens (surface-muted, text-secondary) directly. Only
  --dls-radius-component-kbd exists as L4.
  Severity: low.

## Code example
<!-- Single key -->
<Kbd>Ctrl</Kbd>
<Kbd>⌘</Kbd>

<!-- Regular group (adjacent keys) -->
<KbdGroup type="regular">
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>

<!-- Separated group (with + between) -->
<KbdGroup type="separated">
  <Kbd>Ctrl</Kbd>
  <Kbd>Alt</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>

<!-- Inline usage -->
<p>
  Press <KbdGroup type="separated">
    <Kbd>Ctrl</Kbd><Kbd>S</Kbd>
  </KbdGroup> to save.
</p>

## Cross-references
- Tooltip (shortcut hints inside tooltips)
- Badge (visual indicator alternative — not for keys)
- specs/components/kbd.md
