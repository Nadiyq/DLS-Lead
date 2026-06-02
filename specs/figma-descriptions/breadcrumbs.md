# Breadcrumbs

Category: navigation
React: <Breadcrumbs>
Spec: specs/components/breadcrumbs.md
TSX: apps/storybook/src/stories/breadcrumbs/Breadcrumbs.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-breadcrumbs--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6564-7317

--------------------------------------------
## State implementation contract

Links change text color on hover/focus using L2 semantic
tokens. No filled surface or overlay — color transitions
only.

- Link hover: color → `--dls-color-text-secondary`,
  weight → `--dls-font-weight-medium`
- Link focus-visible: ring → `--dls-state-focus-ring-color`,
  bg → `--dls-color-surface-base`,
  color → `--dls-color-text-primary`
- Current page: color → `--dls-color-text-primary`,
  weight → `--dls-font-weight-medium`
- More button: same hover/focus as links
--------------------------------------------

## Purpose
Hierarchical page navigation trail showing the user's
current location within a site structure. Supports regular
links, dropdown triggers, collapsed ellipsis, and a
current page indicator.

## Use when
- Hierarchical page navigation (Home > Section > Page).
- Multi-level site structure where user needs orientation.
- Deep navigation paths that benefit from collapsed items.

## Do NOT use for
- Flat navigation — use Tabs.
- Step-by-step wizard — use Stepper or Tabs.
- Single-level navigation — use Sidebar or TopBar.

## Figma → Code mapping

### Figma component set: breadcrumb-item (6564:7317)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | —                | Figma-only (normal/focus/hover). CSS pseudo-classes in code. |
| text             | label            | Editable text in Figma. label prop on BreadcrumbItem in code. |
| type             | type             | Direct mapping: regular, dropdown, more, current. |

### Figma component set: breadcrumbs (6564:7381)
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| change           | separator        | Instance swap for separator icon. ReactNode in code. |
| item1–item5      | —                | Boolean toggles in Figma. In code, items array length. |

### Code-only props
| React prop       | Notes |
|------------------|-------|
| items            | BreadcrumbItem[]. Each item has type, label, href, onClick. |
| separator        | Custom separator ReactNode. Defaults to ChevronRight icon. |
| className        | Layout composition only. |

Notes:
- In Figma, item count is controlled by boolean toggles
  (item1–item5). In code, the items array is dynamic.
- Figma has a state property on breadcrumb-item for visual
  states (normal/focus/hover). In code, CSS pseudo-classes
  handle these automatically.
- Separator is an instance swap in Figma (change prop). In
  code, separator prop accepts any ReactNode. Default is
  ChevronRight from lucide-react.

## Anatomy
1. Root — <nav aria-label="Breadcrumb">, landmark element
   for assistive technology.
2. Ordered list — <ol class="dls-breadcrumbs">, flex row
   with gap spacing.
3. Breadcrumb items — <li class="dls-breadcrumbs__item">,
   each rendered by BreadcrumbItemRenderer.
4. Separator items — <li aria-hidden="true"> with
   <span class="dls-breadcrumbs__separator">, inserted
   between breadcrumb items.

### Item types
- Regular — <a> or <button class="dls-breadcrumbs__link">,
  clickable navigation link.
- Dropdown — same as regular but with a ChevronDown icon
  appended in __dropdown-icon span.
- More — <button class="dls-breadcrumbs__more">, ellipsis
  icon for collapsed items.
- Current — <span class="dls-breadcrumbs__current"
  aria-current="page">, non-interactive current page.

## Props / API
- items            BreadcrumbItem[], required.
  Each item: { type?, label, href?, onClick? }.
  Types: 'regular' (default), 'dropdown', 'more', 'current'.
- separator        ReactNode, optional. Default ChevronRight.
- className        string, optional.
- Ref forwarded to <nav>.

### BreadcrumbItem union
- BreadcrumbItemRegular: { type?: 'regular', label, href?, onClick? }
- BreadcrumbItemDropdown: { type: 'dropdown', label, href?, onClick? }
- BreadcrumbItemMore: { type: 'more', onClick? }
- BreadcrumbItemCurrent: { type: 'current', label }

## Tokens used
L4 component token:
- --dls-radius-component-breadcrumb

L2/L3 semantic tokens:
- --dls-color-text-placeholder (link default color)
- --dls-color-text-secondary (link hover, separator)
- --dls-color-text-primary (current page, focus color)
- --dls-color-surface-base (focus background)
- --dls-state-focus-ring-color (focus ring)
- --dls-spacing-1 (link internal gap)
- --dls-spacing-2 (item gap)
- --dls-font-family
- --dls-text-m-font-size
- --dls-text-m-line-height
- --dls-font-weight-normal (link default)
- --dls-font-weight-medium (link hover, current)

## States

### Figma representation (breadcrumb-item)
State property on the component set:
- normal — default text color
- hover — darker text color, medium weight
- focus — focus ring + surface background

### Code implementation
- Link :hover:not(:disabled) — text-secondary + medium weight.
- Link :focus-visible — box-shadow focus ring (0 0 0 3px),
  surface-base bg, text-primary color.
- More :hover:not(:disabled) — text-secondary.
- More :focus-visible — same as link focus.
- Current — text-primary, medium weight. Non-interactive.
- Transition: color 150ms ease, background-color 150ms ease
  on __link and __more. Guarded by
  @media (prefers-reduced-motion).

## Accessibility contract
- Root is <nav aria-label="Breadcrumb"> landmark.
- Items in <ol> for semantic ordered list.
- Separators have aria-hidden="true".
- Current page has aria-current="page".
- More button has aria-label="Show more breadcrumbs".
- Links are <a> (with href) or <button type="button">.
- Keyboard: Tab moves between links/buttons in DOM order.
  Enter/Space activates focused link/button.
- Focus-visible uses external box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- Breadcrumbs is self-contained. Items are defined via
  the items prop array, not children.
- Separator can be customized via separator prop.
- For slash separator, use imported Slash component:
  <Breadcrumbs separator={<Slash />} items={...} />
- Typically placed at top of page content area.
- Do not nest Breadcrumbs inside other navigation components.

## Known deviations
- No L4 color tokens in tokens.json. Uses L2 semantic
  text/surface tokens directly. Only
  --dls-radius-component-breadcrumb exists as an L4 token.
  Severity: low.
- Focus ring uses external box-shadow (0 0 0 3px) instead
  of inset ring. Appropriate for inline breadcrumb links
  without a filled container. Severity: low.

## Code example
<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { type: "dropdown", label: "Products", href: "/products" },
  { type: "more", onClick: handleShowMore },
  { label: "Category", href: "/products/category" },
  { type: "current", label: "Design System" },
]} />

<Breadcrumbs
  separator={<Slash />}
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { type: "current", label: "Profile" },
  ]}
/>

## Cross-references
- Tabs (flat navigation alternative)
- Sidebar (hierarchical navigation alternative)
- TopBar (top-level navigation)
- Pagination (sequential navigation)
- specs/components/breadcrumbs.md
