# SearchField

Category: form input
React: <SearchField>
Spec: specs/components/search-field.md
TSX: apps/storybook/src/stories/search-field/SearchField.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-searchfield--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=59-10798

--------------------------------------------
## State implementation contract

SearchField hover changes border color only — no background
OKLCH shift or overlay. Same token-swap pattern as InputField.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Search input with a built-in leading search icon and optional
clear button. Purpose-built for search — simpler than
InputField with no hint, error, or icon customization.

## Use when
- Search or filter inputs where the search icon is always
  visible.
- Quick-filter fields in toolbars, tables, or sidebars.
- Simple search with no hint, error, or icon customization.

## Do NOT use for
- General text entry -> use InputField.
- Autocomplete search -> use DropdownAutocomplete.
- Multi-line search or chat -> use Textarea or MessageComposer.

## Figma -> Code mapping
| Figma property | React prop  | Values / Notes |
|----------------|-------------|----------------|
| state          | (none)      | Visual-only. In code: CSS :hover, :focus-within, data-disabled. |
| text           | value       | Figma text -> HTML input value attribute. |
| placeholder    | placeholder | Default "Search" in both Figma and code. |
| (none)         | label       | Code-only. Optional label above the field. |
| (none)         | onClear     | Code-only. Callback for clear button. |

Notes:
- Figma "search" component covers only the bordered box
  (icon + input + clear). In code, SearchField also renders
  an optional label row.
- No error state in Figma or code. For search with error
  feedback, use InputField with iconStart={<SearchIcon />}.
- Figma shows clear button only in focused state. In code,
  clear shows whenever the input has value and is not disabled.

## Anatomy
1. Root wrapper — <div class="dls-search-field">, vertical
   stack: label -> box.
2. Label — <label class="dls-search-field__label">, optional,
   associated via htmlFor.
3. Box — <div class="dls-search-field__box">, bordered
   container with icon + input + clear.
4. Search icon — built-in SearchIcon from lucide-react,
   aria-hidden, not configurable.
5. Input — <input type="search" class="dls-search-field__input">,
   native search input with forwarded ref.
6. Clear button — shows when value is present and not disabled.

## Props / API
- label       string, optional. Label text above the search
              field.
- onClear     () => void, optional. Callback when clear
              button is clicked.
- className   string, optional. Pass-through for layout
              composition only.
- placeholder string, optional, default "Search". HTML
              attribute.
- Extends Omit<React.InputHTMLAttributes, 'size' | 'type'> —
  standard HTML input attributes passed through (type is
  fixed to "search").

## Tokens used
L4 component tokens (shared with InputField, all in tokens.json):
- --dls-color-component-input-bg-base
- --dls-color-component-input-bg-disabled
- --dls-color-component-input-fg-base
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-fg-disabled
- --dls-color-component-input-border-base
- --dls-color-component-input-border-hover
- --dls-color-component-input-border-focus
- --dls-color-component-input-border-disabled
- --dls-radius-component-input

L2/L3 semantic tokens also used:
- --dls-state-focus-ring-color (focus ring)
- --dls-color-text-secondary (search icon, clear icon)
- --dls-color-text-primary (clear hover)
- --dls-color-text-disabled (disabled icon, text)

## States

### Figma representation
state property with values: normal, filled, focused,
disabled. No hover or error states in Figma.

### Code implementation
- :hover:not(:disabled):not([data-disabled])
  — border color shifts to hover token.
- :focus-within:not([data-disabled])
  — border shifts to focus token, focus ring via box-shadow.
- [data-disabled] — disabled bg + border, cursor not-allowed.
- Transitions: border-color, box-shadow, background-color
  150ms ease. Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Input uses native <input type="search"> for semantic
  search behavior.
- Label is associated via htmlFor / id when provided.
- Search icon marked aria-hidden="true" (decorative).
- Clear button has aria-label="Clear search".
- Focus-visible on clear button uses box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- SearchField is a leaf component with no children.
- Use inside toolbars, table top bars, or sidebars for
  filtering.
- For search with autocomplete results, compose with
  DropdownAutocomplete rather than adding dropdown logic
  to SearchField.

## Known deviations
- Figma component does not include a label row. In code,
  SearchField renders an optional label above the field.
  Severity: low.
- Figma shows clear button only in focused state. In code,
  clear appears whenever input has value and is not disabled.
  Severity: low.

## Code example
<SearchField
  placeholder="Search users..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>

## Cross-references
- InputField (general text input with more features)
- DropdownAutocomplete (search with autocomplete)
- specs/components/search-field.md
