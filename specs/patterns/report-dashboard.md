---
name: Report & Dashboard Pattern
category: pattern
status: active
read_when:
  - building_dashboard
  - building_report_page
  - composing_analytics_screen
  - composing_kpi_cards
  - chart_layout
  - summary_cards
  - data_visualization
related:
  - composition.md
  - component-selection.md
  - data-table.md
  - ../components/card.md
  - ../components/summary-item.md
  - ../components/badge.md
  - ../components/tabs.md
  - ../components/table.md
  - ../components/table-cell.md
---

# Report & Dashboard Pattern

Best-practice composition rules for report pages, analytics dashboards, and KPI screens in SaaS products. Every rule here maps to an existing DLS component — do not improvise custom markup.

---

## Purpose

Report and dashboard pages help users understand performance, identify trends, detect problems, and make decisions quickly.

The page should answer:

1. **What happened?**
2. **Is it good or bad?**
3. **Why did it happen?**
4. **What should I do next?**

If a component does not help answer one of these questions, reconsider whether it belongs on the page.

---

## Core Principles

### 1. Prioritize Signal Over Decoration

Visual design should support understanding, not compete with the data.

**Do:**
- Use whitespace to separate content sections
- Use typography to create hierarchy
- Highlight important metrics with `SummaryItem`
- Use color only when it communicates status or meaning

**Avoid:**
- Decorative gradients
- Rainbow dashboards
- Excessive shadows
- Glassmorphism
- Decorative illustrations inside reports
- Trendy visual effects that do not improve comprehension

### 2. Summary First

Place the most important information at the top. Users should understand page performance within a few seconds.

**Preferred vertical order:**

```
[Page title]             ← heading, date range selector
[Summary cards]          ← SummaryItem row, 3-5 cards max
[Key trend chart]        ← TrendChart or BarChart
[Secondary charts]       ← PieChart, DonutChart, side-by-side comparisons
[Detailed table]         ← Table with full data
[Supporting info]        ← Footnotes, methodology, export
```

Follow patterns established by products such as Google Analytics and Google Search Console.

### 3. Reduce Cognitive Load

Users should scan before they read.

**Do:**
- Use clear section titles
- Group related information
- Use consistent layouts across pages
- Follow predictable patterns

**Avoid:**
- Large walls of text
- Too many charts on one screen (maximum 4-6 per view)
- Excessive metrics competing for attention
- Multiple competing visual focal points

---

## Assembly Order

A full report/dashboard screen stacks in this order:

```
[TopBar]                 ← page title, date range, export actions
[Summary cards]          ← SummaryItem row (3-5 cards)
[Tabs]                   ← optional, Tabs type="pill" for view switching
[Primary chart section]  ← Card wrapping TrendChart or BarChart
[Secondary charts]       ← Card grid (2-3 columns) with smaller charts
[Data table]             ← full data-table pattern (see data-table.md)
[Pagination]             ← if table is present
```

---

## Summary Cards

### Component

Use `SummaryItem` for each metric card. Summary cards contain:

- Primary metric value (`value` prop)
- Supporting label (`label` prop)
- Trend indicator with direction (`type`: `positive`, `negative`, `no-changes`)
- Trend percentage (`trendValue` prop)

### Layout rules

- Display 3-5 summary cards in a horizontal row.
- Use CSS grid with equal columns: `grid-template-columns: repeat(auto-fit, minmax(0, 1fr))`.
- Gap between cards: `var(--dls-spacing-4)`.
- All cards in a row must have the same height.
- **Maximum 5 cards per row.** Beyond that, secondary metrics belong in a table or detail section.

### Content rules

- One primary metric per card.
- One trend indicator per card.
- Optional comparison period text (e.g., "vs last month").
- Never put charts inside summary cards.
- Never use more than two colors per card (metric + trend indicator).

---

## Charts

### Purpose

Charts should reveal patterns. They should not be decorative.

### Chart type selection

| Data question | Chart type | DLS component |
|---|---|---|
| How did a metric change over time? | Line chart | `TrendChart` |
| How do categories compare? | Horizontal bar chart | `BarChart type="default"` |
| What is the distribution? | Pie or donut chart | `PieChart` or `DonutChart` |
| What is the part-to-whole? | Stacked bar | `BarChart type="stacked"` |
| Are there positive and negative values? | Diverging bar | `BarChart type="negative"` |

### Chart layout

- Wrap each chart in a `Card` component.
- Include a clear title above the chart using section heading typography.
- Include an optional subtitle or description below the title.
- Use `Grid` for chart grid lines and axes.
- Use `LegendGroup` for chart legends.

### Chart color rules

**Do:**
- Use one primary series color and one comparison series color.
- Use semantic color for highlights (green = positive, red = negative).
- Use DLS chart segment tokens (`--dls-color-component-pie-segment-*`, `--dls-color-component-trend-chart-series-*`).

**Avoid:**
- Six or more unrelated colors in one chart.
- Rainbow legends.
- Highly saturated palettes that compete with each other.
- More than 4-5 series on one chart.

### Chart anti-patterns

- No 3D charts.
- No decorative chart styles.
- No excessive gridlines.
- No charts without axis labels.
- No pie charts for more than 5-6 categories.

---

## Typography

### Font size hierarchy

| Usage | Token | Approximate size |
|---|---|---|
| Page title | `--dls-text-heading-h1-*` | 24-32px |
| Section title | `--dls-text-heading-h3-*` | 16-18px |
| Card title / label | `--dls-text-paragraph-m-*` | 14px |
| Body text | `--dls-text-paragraph-m-*` | 14px |
| Secondary text | `--dls-text-paragraph-s-*` | 12px |
| Chart axis labels | `--dls-text-paragraph-s-*` | 12px |
| Dense chart annotations | `--dls-text-paragraph-xs-*` | 10px (restricted) |

### 10px text — restricted usage

Only allowed for:
- Chart axis labels
- Dense chart annotations
- Small trend indicators inside `SummaryItem`

Never use for body text, card titles, section headers, or labels.

### Text style rules

**Do:**
- Use sentence case for all text.
- Use normal capitalization.
- Maintain consistent hierarchy across all pages.

**Avoid:**
- ALL CAPS headings.
- ALL CAPS body text.
- Decorative typography (gradient text, outlined text).
- Excessive font weight variation within one section.

---

## Color Usage

### Color communicates status

| Meaning | Intent | DLS token pattern |
|---|---|---|
| Positive / growth | `success` | `--dls-color-intent-success-*` |
| Negative / decline | `danger` | `--dls-color-intent-danger-*` |
| Warning / attention | `warning` | `--dls-color-intent-warning-*` |
| Informational | `info` | `--dls-color-intent-info-*` |
| Neutral / unchanged | `neutral` | `--dls-color-text-secondary` |

### Color ratio

- **80-90% neutral UI** — surfaces, text, borders, structure.
- **10-20% semantic color** — trend indicators, status badges, chart highlights.

### Avoid decorative color

- Never give every card a different accent color.
- Never use random colors for aesthetic purposes.
- Never use color as the only differentiator — pair with icons, labels, or trend arrows.

---

## Cards

### Card appearance

Use the `Card` component. Cards should have:

- White surface (`--dls-color-surface-base`).
- Subtle border (`--dls-color-border-subtle`).
- Comfortable padding (`--dls-spacing-6` or `--dls-spacing-8`).
- Clear internal hierarchy.

### Border guidelines

Use subtle, light borders:

**Good:** tokens mapping to `#E5E5E5`, `#ECECEC`, `#F0F0F0` range.

**Avoid:** dark borders mapping to `#000000`, `#1A1A1A`, `#333333`. White cards should not be outlined with dark, heavy borders.

---

## Content Hierarchy

Every section on a report page should follow this structure:

```
[Section title]          ← heading token
[Section description]    ← optional, secondary text
[Visualization]          ← chart, summary cards, or table
[Insights]               ← optional, key takeaways as a list
[Action]                 ← optional, recommended next step
```

Example:

```
Traffic Sources
Where visitors originated this period.

[BarChart type="default" horizontal]

Insights:
- Organic traffic increased 14%
- Referral traffic declined 8%

Recommended: Investigate referral partner performance.
```

---

## Information Density

### Good density

- One primary message per section.
- Clear visual grouping with whitespace.
- Breathing room between cards and charts.
- Gap between sections: `var(--dls-spacing-8)` to `var(--dls-spacing-12)`.

### Bad density

- Dashboard packed edge-to-edge with no whitespace.
- Every available metric shown at once.
- Excessive widgets competing for attention.
- Charts stacked directly on top of each other without section breaks.

A report page should feel calm, not crowded.

---

## Tables in Dashboards

When a dashboard includes a data table, follow the full [data-table.md](data-table.md) pattern. Additional dashboard-specific rules:

- Tables appear below charts, never above.
- Limit to 5-7 visible columns by default — users can add more via `DropdownColumns`.
- Use `soft` or `ghost` badge variants to keep the table calm alongside charts.
- Provide `SearchField` and basic filtering even for dashboard tables.

---

## Accessibility

### Contrast

Always verify:
- Text contrast against surface colors.
- Icon contrast for trend arrows.
- Chart readability for color-blind users.

### Never rely on color alone

Pair color with:
- Icons (`TrendingUp`, `TrendingDown`, `Minus` from `lucide-react`)
- Text labels
- Trend arrows
- Numeric values with sign ("+12.4%", "-8.2%")

### Chart accessibility

- Every chart uses `role="img"` or `role="group"` with `aria-label`.
- SVG chart content is `aria-hidden="true"`.
- Legends are semantic lists with `aria-label`.
- Data is also available in a table for screen reader users.

---

## Anti-Patterns

These patterns are commonly associated with low-quality AI-generated dashboards. Avoid them.

### Visual anti-patterns

| Do not | Instead |
|---|---|
| Rainbow KPI cards (each card a different bright color) | White `Card` with neutral text and one semantic trend color |
| Gradient headings or gradient card backgrounds | Flat `--dls-color-surface-base` surfaces |
| Oversized drop shadows on cards | Subtle `--dls-shadow-surface-sm` or border only |
| Floating glass / frosted-glass cards | Solid white `Card` with subtle border |
| Excessive corner radii (pill-shaped cards) | `--dls-radius-component-card` (standard) |
| Decorative icons on every card | Icons only for trend direction or meaningful status |
| Colorful emoji in headings or labels | No emoji unless the user explicitly requests it |
| Generic stock illustrations inside reports | Remove — data is the illustration |
| Artificially cheerful color palettes | Neutral base with purposeful semantic color |

### Layout anti-patterns

| Do not | Instead |
|---|---|
| Dense metric walls (20+ KPIs on screen) | 3-5 summary cards + drill-down sections |
| Every metric shown at the same visual weight | Clear hierarchy: primary metric large, supporting metrics smaller |
| Charts without titles or axis labels | Always include chart title and axis labels |
| Multiple chart types for the same data | Pick one chart type per metric |
| Sidebar of mini-charts | Full-width sections with one chart each |
| Dashboard with no whitespace | `--dls-spacing-8` minimum between sections |
| Tabs with 10+ options | Maximum 5-6 tabs; move the rest to a dropdown |

### Structural anti-patterns

| Do not | Instead |
|---|---|
| Random grid of cards with no grouping | Logical sections with headings |
| Mixing summary cards and charts in the same row | Summary cards row first, then chart sections below |
| Stacking charts directly without section breaks | Wrap each chart in `Card` with heading |
| Putting raw data above visual summaries | Summary first, raw data last |
| Building custom chart wrappers | Use DLS chart components (`TrendChart`, `BarChart`, `PieChart`, `DonutChart`) |
| Hand-coded SVG charts | Use DLS chart primitives with proper tokens |

### The "AI slop" checklist

Before shipping a dashboard, verify it does NOT contain:

- [ ] Cards with colored left borders or colored top accents
- [ ] Gradient backgrounds anywhere
- [ ] More than 2 different shadow depths on one page
- [ ] Badge/pill elements used for non-status data
- [ ] Custom CSS classes (all must be `dls-*`)
- [ ] Hardcoded colors (all must use tokens)
- [ ] Inline styles for visual properties
- [ ] Charts with more than 5 series
- [ ] Summary section with more than 5 cards
- [ ] Any element that exists purely for decoration

---

## DLS Report Dashboard Golden Rule

> If a user can understand what changed, whether it is good or bad, and what requires attention within 5 seconds of opening the page, the dashboard is successful. If they must visually decode the interface first, the design is failing.

---

## Cross-References

- [composition.md](composition.md)
- [component-selection.md](component-selection.md)
- [data-table.md](data-table.md)
- [../components/card.md](../components/card.md)
- [../components/summary-item.md](../components/summary-item.md)
- [../components/badge.md](../components/badge.md)
- [../components/tabs.md](../components/tabs.md)
- [../components/table.md](../components/table.md)
- [../figma-descriptions/trend-chart.md](../figma-descriptions/trend-chart.md)
- [../figma-descriptions/bar-chart.md](../figma-descriptions/bar-chart.md)
- [../figma-descriptions/pie-chart.md](../figma-descriptions/pie-chart.md)
- [../figma-descriptions/donut-chart.md](../figma-descriptions/donut-chart.md)
- [../figma-descriptions/summary-item.md](../figma-descriptions/summary-item.md)
- [../figma-descriptions/legend-group.md](../figma-descriptions/legend-group.md)
- [../figma-descriptions/grid.md](../figma-descriptions/grid.md)
