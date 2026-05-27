# ChipInput

Category: form input / multi-select
React: <ChipInput>
Spec: specs/components/chip-input.md
TSX: apps/storybook/src/stories/chip-input/ChipInput.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-chipinput--docs

--------------------------------------------
## State implementation contract

ChipInput box hover changes border color only — no background
OKLCH shift or overlay on the main surface. Same input-family
token-swap pattern. Chips inside use their own ChipRegular
state treatment.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within / Open: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Multi-value input with removable ChipRegular tokens, optional
autocomplete listbox for selection, free-text entry via Enter,
and label/hint/error feedback. Combines input-field and
dropdown patterns for multi-select use cases.

## Use when
- Multi-value selection from a predefined list (tags,
  categories, assignees).
- Free-text token entry with removable chips.
- Multi-select autocomplete with type-to-filter.

## Do NOT use for
- Single-value selection -> use Dropdown or DropdownAutocomplete.
- Non-removable labels -> use Badge.
- Rich text input -> use a rich text editor.
- Single-line text -> use InputField.

## Figma -> Code mapping
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: CSS pseudo-classes and data attributes (data-error, data-disabled, data-open, data-has-chips). |
| empty            | (none)           | Figma boolean. In code, empty state derived from values.length === 0. |
| text             | (none)           | Figma shows typed text. In code, managed by internal search state. |
| placeholder      | placeholder      | Direct mapping. Default "Type..." in both. |
| error            | error            | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText        | error            | Figma error text -> React error string prop value. |
| tag1/tag2/tag3   | values           | Figma booleans toggle individual chips. In code, chips driven by dynamic values array. |
| (none)           | label            | Code-only. Optional label above the field. |
| (none)           | hint             | Code-only. Optional hint text below the field. |
| (none)           | options          | Code-only. Array of { value, label, icon?, avatarSrc?, avatarInitials? }. |
| (none)           | onValuesChange   | Code-only. Callback when values change. |
| (none)           | allowFreeText    | Code-only. Allow creating values not in options via Enter. |

Notes:
- Figma "chips" component covers the bordered box with chip
  tokens + error row. In code, ChipInput also renders label,
  optional listbox dropdown, and hint rows.
- Figma has fixed boolean toggles for up to 3 chips. In code,
  chips are driven by a dynamic values array with unlimited
  entries and wrapping.

## Anatomy
1. Root wrapper — <div class="dls-chip-input">, vertical
   stack: label -> field -> hint/error.
2. Label — <label class="dls-chip-input__label">, optional,
   associated via htmlFor.
3. Field wrapper — <div class="dls-chip-input__field">,
   position relative for listbox positioning.
4. Box — <div class="dls-chip-input__box">, bordered container
   holding chips + input. Grows vertically when chips wrap.
5. Content — <div class="dls-chip-input__content">, flex-wrap
   container for chips and input.
6. Chips — ChipRegular components (size="s", variant="outline",
   intent="neutral") with onRemove callbacks.
7. Input — <input class="dls-chip-input__input">, inline text
   input with combobox role when options provided.
8. Listbox — <div role="listbox">, positioned absolutely
   below field, uses dropdown L4 tokens.
   Has aria-multiselectable="true".
9. Options — ListItem components with role="option".
10. Hint/Error row — shows error with TriangleAlert icon
    or hint text.

## Props / API
- options        ChipInputOption[], optional. Available
                 choices for autocomplete multi-select.
- values         string[], optional, default []. Currently
                 selected values.
- onValuesChange (values: string[]) => void, optional.
                 Callback when selection changes.
- allowFreeText  boolean, optional. Allow creating values
                 not in options via Enter. Defaults to true
                 when no options provided.
- label          string, optional. Label text.
- hint           string, optional. Hint text.
- error          string, optional. Error message — puts field
                 in error state.
- placeholder    string, optional, default "Type...".
- disabled       boolean, optional, default false. Disables
                 input and all chips.
- className      string, optional. Layout composition only.
- id             string, optional. ID for input element.
                 Auto-generated if not provided.
- Ref forwarded to the <input> element.

## Tokens used
L4 component tokens (box — shared with InputField):
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

L4 component tokens (listbox — dropdown-specific):
- --dls-color-component-dropdown-bg
- --dls-color-component-dropdown-border
- --dls-radius-component-dropdown

L2/L3 semantic tokens also used:
- --dls-state-focus-ring-color (focus ring on box)
- --dls-state-hover-overlay (keyboard highlight on list items)
- --dls-shadow-overlay (listbox shadow)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint)
- --dls-color-text-disabled (disabled label)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. empty boolean toggles between placeholder and chips.

### Code implementation
- :hover:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to hover token.
- :focus-within / [data-open] — border shifts to focus,
  ring via box-shadow. Listbox becomes visible.
- [data-error] — danger intent bg + border. Input gets
  aria-invalid="true".
- [data-disabled] — disabled bg + border, cursor not-allowed.
  Input and chips use disabled styling.
- [data-has-chips] — box switches to compact padding,
  auto height with min-height: 32px for wrapping.
- Transitions: border-color, box-shadow, background-color
  150ms ease. Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Input uses role="combobox" when options are provided, with
  aria-autocomplete="list".
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the input.
- Listbox has role="listbox" with aria-label and
  aria-multiselectable="true".
- Each option has role="option" with aria-selected.
- ChipRegular remove buttons have aria-label="Remove {label}".
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: ArrowDown/ArrowUp to navigate, Enter to select
  or add free-text, Backspace to remove last chip, Escape
  to close.
- Focus-visible on box uses box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- ChipInput renders ChipRegular components internally for
  each value. Do not manually compose chips inside.
- When options are provided, a listbox renders with ListItem
  rows for autocomplete.
- For form grouping, wrap in FormField or standard form
  patterns.
- Do not nest ChipInput inside another ChipInput or dropdown.

## Known deviations
- Figma "chips" component does not include label, hint, or
  listbox rows. In code, ChipInput renders all sections as
  a single component. Severity: low.
- Figma uses boolean toggles (tag1, tag2, tag3) for up to
  3 chips. In code, chips are driven by a dynamic values
  array with unlimited entries and wrapping. Severity: low.

## Code example
<ChipInput
  label="Tags"
  hint="Type to search and select tags."
  placeholder="Search tags..."
  options={[
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
  ]}
  values={tags}
  onValuesChange={setTags}
/>

## Cross-references
- ChipRegular (chip tokens inside the field)
- Dropdown (single-select alternative)
- DropdownAutocomplete (single-select with search)
- InputField (shares input tokens)
- ListItem (option rows)
- FormField (form grouping)
- specs/components/chip-input.md
