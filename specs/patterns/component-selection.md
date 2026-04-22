---
name: Component Selection
category: pattern
status: active
read_when:
  - choosing_component
  - building_screen
related:
  - composition.md
  - ../components/
---

# Component Selection

Use this file when multiple DLS components seem plausible.

## Action And Status

| Need | Use | Do Not Substitute With |
|---|---|---|
| Primary or secondary action | `Button` | `Badge`, `Chip`, raw link styling |
| Small status or metadata pill | `Badge` | `Button`, `FilterChip` |
| Compact label or multi-part inline metadata | `Chip` / `ChipRegular` | `Badge` when you need rich internal parts |
| Filter visibility + filter editor trigger | `FilterChip` | `Badge`, `Button`, custom segmented chip |

## Content And Structure

| Need | Use | Do Not Substitute With |
|---|---|---|
| Surface container with title/content/footer | `Card` | raw bordered `div` |
| Zero state or no-data block | `EmptyState` | `Alert`, `Card` with ad hoc copy |
| Paired title + description row | `Text` | separate unstructured spans when this pattern exists |

## Inputs And Choice

| Need | Use | Notes |
|---|---|---|
| Freeform single-line text | `InputField` | supports label, hint, error, clear, icons |
| Select from options | `Dropdown` | supports autocomplete and clearable |
| Tabbed local view switching | `Tabs` | not for global navigation |

## Lists And Menus

| Need | Use | Notes |
|---|---|---|
| Bordered list container | `List` | children should usually be `ListItem` |
| Single menu/list row | `ListItem` | choose type instead of building custom row markup |
| Menu, flyout, dropdown body | `List` + `ListItem` | mandatory pattern in DLS-Lead |

## Data Display

| Need | Use | Notes |
|---|---|---|
| Dense structured tabular data | `Table` | compose with `TableColumn` children |
| A single typed table column | `TableColumn` | choose the documented column type |

## Fast Heuristics

- If it opens a list of options, start from `Dropdown` or `List` + `ListItem`.
- If it communicates state, start from `Badge`.
- If it triggers an action, start from `Button`.
- If it groups content into a surface, start from `Card`.
- If it represents “nothing here yet,” start from `EmptyState`.

## Cross-References

- [composition.md](composition.md)
- [../components/button.md](../components/button.md)
- [../components/dropdown.md](../components/dropdown.md)
- [../components/list-item.md](../components/list-item.md)
