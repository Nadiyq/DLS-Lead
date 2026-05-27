# Component Manifest Rollout Plan

End-to-end plan for closing the gaps identified in the DLS gap analysis,
applied to every component in the system — both Figma and code side.

## Current status

| Item | Status | Notes |
|------|--------|-------|
| JSON Schema (`component.v1.json`) | DONE | `specs/schemas/component.v1.json` |
| Slash command (`/build-manifest`) | DONE | `.claude/commands/build-manifest.md` |
| First manifest (Accordion) | DONE | `specs/components/manifests/accordion.json` |
| Second manifest (Button) | DONE | `specs/components/manifests/button.json` |
| Third manifest (InputField) | DONE | `specs/components/manifests/input-field.json` |
| Fourth manifest (Textarea) | DONE | `specs/components/manifests/textarea.json` |
| Fifth manifest (SearchField) | DONE | `specs/components/manifests/search-field.json` |
| Sixth manifest (PhoneInput) | DONE | `specs/components/manifests/phone-input.json` |
| Seventh manifest (Dropdown) | DONE | `specs/components/manifests/dropdown.json` |
| Eighth manifest (DropdownAutocomplete) | DONE | `specs/components/manifests/dropdown-autocomplete.json` |
| Ninth manifest (ChipInput) | DONE | `specs/components/manifests/chip-input.json` |
| Figma description template | DONE | Accordion as reference: `specs/figma-descriptions/accordion-item.md` |
| `llms.txt` | TODO | Gap item #4 |
| Build script + CI hook | TODO | Gap item #3 |
| Deprecation schema fields | TODO | Gap item #7 — design now, use later |
| Component usage tracker | TODO | Gap item #8 |
| `figma-sync-audit` component extension | TODO | Gap item #9 |

## Per-component checklist

Every component goes through this sequence. Each step has a
Figma-side and code-side action.

### Phase 1 — Figma description (you, in Figma)

- [ ] Open the component set in Figma
- [ ] Add/update **Component configuration → Description** field
      using the template structure (see Accordion reference)
- [ ] Set **Documentation link** to Storybook docs URL:
      `https://storybook.dlslead.com/?path=/docs/components-{kebab-name}--docs`
- [ ] Verify Figma property names: rename to match React props
      where possible (e.g. `active` → `defaultOpen`)
- [ ] Verify Figma variable bindings match CSS token names 1:1
      (e.g. `color/component/accordion-item/bg-hover`
      → `--dls-color-component-accordion-item-bg-hover`)
- [ ] Add annotations on key slots and properties

### Phase 2 — Code fixes (Claude, via `/build-manifest`)

- [ ] Run `/build-manifest ComponentName <figma-url>`
- [ ] Fix any **inline SVG** → lucide-react migration
- [ ] Fix any **missing aria-controls / role="region"** or other
      accessibility gaps surfaced by cross-validation
- [ ] Fix any **missing `prefers-reduced-motion`** in CSS
- [ ] Fix any **token naming mismatches** between tokens.css and
      the Figma description (align to Figma-side naming with
      correct CSS namespace prefixes)
- [ ] Verify **L4 tokens exist** in tokens.json — if missing,
      add them (accordion color tokens were only in tokens.ts)
- [ ] Run lint, TypeScript check, Storybook tests
- [ ] Write validated manifest to `specs/components/manifests/`

### Phase 3 — Figma description update (you, paste-back)

- [ ] Copy corrected description from
      `specs/figma-descriptions/{component}.md` back into Figma
- [ ] Clear **"Known deviations"** and **"Known accessibility gaps"**
      sections for anything fixed in Phase 2

## Component inventory — priority order

Grouped by surface area and dependency depth.
Within each tier, ordered by number of known issues.

### Tier 1 — Foundation components (do first)

These are composed into everything else. Fixing them first
prevents cascading issues.

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 1 | **Accordion** | accordion.md | FIXED | FIXED | No (tokens.ts only) |
| 2 | **Button** | button.md | No | FIXED | Yes |
| 3 | **InputField** | input-field.md | No | FIXED | Yes (as `input`) |
| 4 | **List** | list.md | No | No | No |
| 5 | **ListItem** | list-item.md | No | No | No |
| 6 | **Text** | text.md | No | No | No |
| 7 | **Badge** | badge.md | No | No | Yes |
| 8 | **Avatar** | avatar.md | No | No | Yes |
| 9 | **Separator** | separator.md | No | No | No |
| 10 | **Spinner** | spinner.md | YES | YES | No |

### Tier 2 — Interactive primitives

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 11 | **Checkbox** | checkbox.md | YES | YES | No |
| 12 | **CheckboxBox** | checkbox-box.md | No | YES | No |
| 13 | **Radiobutton** | radiobutton.md | No | No | No |
| 14 | **RadiobuttonBox** | radiobutton-box.md | No | No | No |
| 15 | **Switcher** | switcher.md | No | YES | No |
| 16 | **SwitcherBox** | switcher-box.md | No | No | No |
| 17 | **Slider** | slider.md | No | No | No |
| 18 | **Checkmark** | checkmark.md | YES | No | No |

### Tier 3 — Form components

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 19 | **FormField** | form-field.md | No | YES | No |
| 20 | **SearchField** | search-field.md | No | FIXED | No |
| 21 | **Textarea** | textarea.md | No | FIXED | No |
| 22 | **SlotInput** | slot-input.md | No | YES | No |
| 23 | **OtpInput** | otp-input.md | No | YES | No |
| 24 | **PhoneInput** | phone-input.md | No | FIXED | No |
| 25 | **DateInput** | date-input.md | No | No | No |
| 26 | **DateRangeInput** | date-range-input.md | No | No | No |
| 27 | **ChipInput** | chip-input.md | No | FIXED | No |

### Tier 4 — Navigation and layout

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 28 | **Tabs** | tabs.md | No | No | Yes (as `tab`) |
| 29 | **Sidebar** | sidebar.md | No | No | Yes |
| 30 | **SidebarItem** | sidebar-item.md | No | YES | No |
| 31 | **Breadcrumbs** | breadcrumbs.md | YES | YES | No |
| 32 | **Pagination** | pagination.md | No | YES | Yes |
| 33 | **TopBar** | top-bar.md | No | YES | No |
| 34 | **Toolbar** | toolbar.md | No | No | No |

### Tier 5 — Overlays and dropdowns

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 35 | **Dropdown** | dropdown.md | No | FIXED | Yes |
| 36 | **DropdownOptions** | dropdown-options.md | No | No | No |
| 37 | **DropdownAutocomplete** | dropdown-autocomplete.md | No | FIXED | No |
| 38 | **DropdownFilters** | dropdown-filters.md | No | No | No |
| 39 | **DropdownSorting** | dropdown-sorting.md | No | No | No |
| 40 | **DropdownColumns** | dropdown-columns.md | No | No | No |
| 41 | **DropdownColumnActions** | dropdown-column-actions.md | No | No | No |
| 42 | **DropdownExport** | dropdown-export.md | No | No | No |
| 43 | **DropdownAccount** | dropdown-account.md | No | No | No |
| 44 | **ContextMenu** | context-menu.md | No | No | No |
| 45 | **Submenu** | submenu.md | No | No | No |
| 46 | **Dialog** | dialog.md | YES | No | Yes |
| 47 | **AlertDialog** | alert-dialog.md | No | No | No |
| 48 | **Tooltip** | tooltip.md | YES | No | No |

### Tier 6 — Data display

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 49 | **Table** | table.md | No | YES | Yes |
| 50 | **TableHeaderCell** | table-header-cell.md | No | YES | No |
| 51 | **TableCell** | table-cell.md | No | No | No |
| 52 | **TableColumn** | table-column.md | No | No | No |
| 53 | **TableTopBar** | table-top-bar.md | No | No | No |
| 54 | **Card** | card.md | No | No | No |
| 55 | **Item** | item.md | No | No | No |
| 56 | **EmptyState** | empty-state.md | No | No | No |
| 57 | **Skeleton** | skeleton.md | No | YES | No |
| 58 | **ProgressBar** | progress-bar.md | YES | YES | No |

### Tier 7 — Feedback and status

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 59 | **Alert** | alert.md | No | No | Yes |
| 60 | **Chip** | chip.md | No | No | Yes (as `chip`) |
| 61 | **ChipRegular** | chip-regular.md | No | No | No |
| 62 | **FilterChip** | filter-chip.md | No | No | No |
| 63 | **Kbd** | kbd.md | No | No | No |
| 64 | **AvatarStack** | avatar-stack.md | No | YES | No |
| 65 | **IconShape** | icon-shape.md | No | No | No |

### Tier 8 — Compound / specialized

| # | Component | Spec | Inline SVG | Missing reduced-motion | L4 color tokens in JSON |
|---|-----------|------|------------|------------------------|-------------------------|
| 66 | **Calendar** | calendar.md | YES | No | No |
| 67 | **CalendarPeriods** | calendar-periods.md | No | No | No |
| 68 | **CalendarRange** | calendar-range.md | YES | No | No |
| 69 | **Carousel** | carousel.md | YES | YES | No |
| 70 | **ButtonGroup** | button-group.md | No | No | No |
| 71 | **ButtonInputGroup** | button-input-group.md | No | YES | No |
| 72 | **Filters** | filters.md | No | YES | No |
| 73 | **MessageComposer** | message-composer.md | No | No | No |
| 74 | **Resizable** | resizable.md | No | YES | No |
| 75 | **Scroll** | scroll.md | No | YES | No |

## Cross-cutting fixes (do once, apply to all)

### 1. `llms.txt` at repo root (gap item #4)

Create `llms.txt` indexing: `README.md`, `specs/session-start.md`,
`specs/tokens/token-reference.md`, `specs/components/` index,
`specs/schemas/component.v1.json`, `prompts/` index.
One file, immediate benefit for all AI inference.

### 2. L4 color tokens in `tokens.json` (gap item #1 dependency)

Currently only 12 components have L4 color tokens in `tokens.json`.
All others (including Accordion) define them only in `tokens.ts`.
As each component gets its manifest, verify and backfill tokens.json
entries for completeness — tokens.json is the declared source of truth.

Components already in tokens.json color.component:
alert, avatar, badge, button, chip, dialog, dropdown, input,
pagination, sidebar, tab, table.

### 3. Inline SVG migration (11 components)

Components with hand-drawn `<svg>` that need lucide-react migration:
Breadcrumbs, Calendar, CalendarRange, Carousel, CarouselArrow,
Checkbox, Checkmark, Dialog, ProgressBar, Spinner, Tooltip.

Fix during each component's Phase 2.

### 4. `prefers-reduced-motion` (39 CSS files)

Every CSS file with `transition` or `animation` needs a
`@media (prefers-reduced-motion: reduce)` block.
Fix during each component's Phase 2.

### 5. Build script + CI hook (gap item #3)

After 5-10 manifests exist, create:
- `scripts/build-manifest.mjs` — reads TSX + stories + CSS +
  spec + tokens.json → emits validated JSON
- CI step that runs on PRs touching component files
- Fails if schema validation breaks or props drift

### 6. Figma description template

The corrected Accordion description (`specs/figma-descriptions/accordion-item.md`)
is the canonical template. Key sections every component must have:

```
# [Component Name]
  Category / React / Spec / TSX paths
  State implementation contract block
  Purpose
  Use when / Do NOT use for
  Figma → Code mapping table
  Anatomy
  Props / API
  Tokens used (with correct CSS namespace prefixes)
  States (Figma representation + Code implementation)
  Accessibility contract
  Composition rules
  Known deviations (empty if none)
  Code example
  Cross-references
```

### 7. Figma property renaming (gap Figma item #3)

Where feasible, rename Figma properties to match React prop names:
- `active` → `defaultOpen` (Accordion) — values stay Off/On
- Similar renames per component discovered during Phase 1

Keep `state` as Figma-only (explicitly mark as `reactProp: null`).

## Execution cadence

Recommended: 3-5 components per session.

1. **You** do Phase 1 (Figma description) for a batch of 3-5 components
2. Run `/build-manifest ComponentName <figma-url>` for each
3. I fix code-side issues, write manifest, generate corrected description
4. **You** paste corrected description back to Figma (Phase 3)
5. Move to next batch

Start with Tier 1 (foundations), move through tiers in order.
Button is next after Accordion.

## Definition of done (per component)

- [ ] Figma description written and pasted
- [ ] Figma documentation link set
- [ ] Figma property names reviewed (renamed where feasible)
- [ ] Figma variable bindings match CSS token names 1:1
- [ ] Manifest written to `specs/components/manifests/{name}.json`
- [ ] Schema validation passes
- [ ] All inline SVGs migrated to lucide-react
- [ ] aria-controls / role attributes complete
- [ ] prefers-reduced-motion added (if transitions exist)
- [ ] Token names aligned between Figma description and code
- [ ] CSS lint passes
- [ ] TypeScript passes
- [ ] Corrected description saved to `specs/figma-descriptions/{name}.md`
- [ ] Corrected description pasted back to Figma

## Definition of done (system-wide)

- [ ] All 75 component manifests written
- [ ] `llms.txt` created
- [ ] Build script + CI hook operational
- [ ] Deprecation fields designed in schema (even if unused)
- [ ] `figma-sync-audit` extended for component coverage
- [ ] Zero inline SVGs remaining
- [ ] Zero CSS files missing reduced-motion (where applicable)
- [ ] All L4 tokens in tokens.json (not just tokens.ts)
