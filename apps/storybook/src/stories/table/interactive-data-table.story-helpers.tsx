import React from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
  ChevronRight as ChevronRightIcon,
  Columns3 as Columns3Icon,
  Filter as FilterIcon,
  MoreHorizontal as MoreIcon,
  Plus as PlusIcon,
  Trash2 as TrashIcon,
} from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../checkbox/Checkbox';
import { DropdownColumnActions } from '../dropdown-column-actions/DropdownColumnActions';
import type { SortState } from '../dropdown-column-actions/DropdownColumnActions';
import { DropdownColumns } from '../dropdown-columns/DropdownColumns';
import type { ColumnItem } from '../dropdown-columns/DropdownColumns';
import { DropdownFilters } from '../dropdown-filters/DropdownFilters';
import { DropdownOptions } from '../dropdown-options/DropdownOptions';
import { DropdownSorting } from '../dropdown-sorting/DropdownSorting';
import { FilterChip } from '../filter-chip/FilterChip';
import { Filters } from '../filters/Filters';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Resizable } from '../resizable/Resizable';
import { SearchField } from '../search-field/SearchField';
import { Table } from './Table';
import { TableCell } from '../table-cell/TableCell';
import { TableHeaderCell } from '../table-header-cell/TableHeaderCell';
import { TableTopBar } from '../table-top-bar/TableTopBar';
import type { SortDirection } from '../table-header-cell/TableHeaderCell';

type FilterValue = string;

export interface DataTablePinnedProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface DataTableColumn<Row> {
  id: string;
  label: string;
  width: number;
  minWidth?: number;
  visible?: boolean;
  pinned?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  hideable?: boolean;
  getValue: (row: Row) => React.ReactNode;
  getSortValue?: (row: Row) => string | number;
  getFilterValue?: (row: Row) => FilterValue;
  getSearchValue?: (row: Row) => string;
  renderCell?: (row: Row, context: DataTableRenderContext, pinned: DataTablePinnedProps) => React.ReactNode;
  renderMobileValue?: (row: Row) => React.ReactNode;
}

export interface DataTableRenderContext {
  selected: boolean;
  toggleSelected: () => void;
  rowIndex: number;
  rowId: string;
}

export interface DataTableMobileConfig {
  primaryColumnId: string;
  secondaryColumnId: string;
  supportingColumnIds?: string[];
  actionsColumnId?: string;
}

interface ActiveFilter {
  id: string;
  values: Set<FilterValue>;
  isVisible: boolean;
}

interface InteractiveDataTableProps<Row> {
  rows: Row[];
  columns: DataTableColumn<Row>[];
  getRowId: (row: Row) => string;
  mobile: DataTableMobileConfig;
  primaryActionLabel: string;
  createRow?: (rows: Row[]) => Row;
  initialSearch?: string;
  initialShowFilters?: boolean;
  initialFilters?: Array<{ id: string; values: FilterValue[]; isVisible?: boolean }>;
  showPagination?: boolean;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  rowPredicate?: (row: Row) => boolean;
  emptyState?: React.ReactNode;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

function formatFilterSummary(values: Set<FilterValue>) {
  if (values.size === 0) return 'All';
  if (values.size === 1) return [...values][0];
  return `${values.size} selected`;
}

function normalizeValue(value: React.ReactNode): string {
  if (value === null || value === undefined || typeof value === 'boolean') return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return '';
}

function compareValues(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

const asPinnedStyle = (left: number): React.CSSProperties => ({
  '--dls-table-pinned-left': `${left}px`,
} as React.CSSProperties);

export function InteractiveDataTable<Row>({
  rows: initialRows,
  columns: initialColumns,
  getRowId,
  mobile,
  primaryActionLabel,
  createRow,
  initialSearch = '',
  initialShowFilters = false,
  initialFilters = [],
  showPagination = true,
  initialPageSize = 5,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  rowPredicate,
  emptyState,
}: InteractiveDataTableProps<Row>) {
  const [rows, setRows] = React.useState(initialRows);
  const [columns, setColumns] = React.useState(() => initialColumns.map((column) => ({
    ...column,
    visible: column.visible ?? true,
    resizable: column.resizable ?? true,
    hideable: column.hideable ?? true,
  })));
  const [search, setSearch] = React.useState(initialSearch);
  const [showFilters, setShowFilters] = React.useState(initialShowFilters);
  const [sort, setSort] = React.useState<{ id: string; direction: SortDirection }>(() => {
    const firstSortable = initialColumns.find((column) => column.sortable);
    return { id: firstSortable?.id ?? initialColumns[0]?.id ?? '', direction: 'none' };
  });
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>(() => (
    initialFilters.map((filter) => ({
      id: filter.id,
      values: new Set(filter.values),
      isVisible: filter.isVisible ?? true,
    }))
  ));
  const [openFilterId, setOpenFilterId] = React.useState<string | null>(null);
  const [openSubmenuFilterId, setOpenSubmenuFilterId] = React.useState<string | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize);
  const [optionsMenu, setOptionsMenu] = React.useState<'root' | 'columns' | 'filters'>('root');
  const [openColumnMenuId, setOpenColumnMenuId] = React.useState<string | null>(null);
  const [columnMenuPosition, setColumnMenuPosition] = React.useState<{ top: number; left: number } | null>(null);
  const resizeStartRef = React.useRef<Record<string, number>>({});
  const headerRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const updateColumnMenuPosition = React.useCallback((columnId: string) => {
    const header = headerRefs.current[columnId];
    if (!header) return;
    const rect = header.getBoundingClientRect();
    setColumnMenuPosition({
      top: rect.bottom + 4,
      left: rect.left,
    });
  }, []);

  React.useEffect(() => {
    if (!openColumnMenuId) return undefined;

    const closeOnOutsidePointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        !target?.closest('.dls-table-header-cell') &&
        !target?.closest('.dls-table__column-menu-popover')
      ) {
        setOpenColumnMenuId(null);
        setColumnMenuPosition(null);
      }
    };

    document.addEventListener('mousedown', closeOnOutsidePointer);
    return () => document.removeEventListener('mousedown', closeOnOutsidePointer);
  }, [openColumnMenuId]);

  React.useEffect(() => {
    if (!openColumnMenuId) return undefined;

    const update = () => updateColumnMenuPosition(openColumnMenuId);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [openColumnMenuId, updateColumnMenuPosition]);

  const columnById = React.useMemo(
    () => new Map(columns.map((column) => [column.id, column])),
    [columns],
  );
  const visibleColumns = columns.filter((column) => column.visible);
  const filterableColumns = visibleColumns.filter((column) => column.filterable);
  const sortableColumns = visibleColumns.filter((column) => column.sortable);

  const resetPage = () => setPage(1);

  const getFilterOptions = React.useCallback((column: DataTableColumn<Row>) => {
    const values = rows
      .filter((row) => !rowPredicate || rowPredicate(row))
      .map((row) => column.getFilterValue?.(row) ?? normalizeValue(column.getValue(row)))
      .filter(Boolean);
    return [...new Set(values)];
  }, [rows, rowPredicate]);

  const addOrFocusFilter = (columnId: string) => {
    const column = columnById.get(columnId);
    if (!column?.filterable) return;
    setShowFilters(true);
    setOpenFilterId(columnId);
    setActiveFilters((previous) => {
      if (previous.some((filter) => filter.id === columnId)) return previous;
      return [
        ...previous,
        {
          id: columnId,
          values: new Set(),
          isVisible: true,
        },
      ];
    });
    resetPage();
  };

  const addNextFilter = () => {
    const used = new Set(activeFilters.map((filter) => filter.id));
    const nextColumn = filterableColumns.find((column) => !used.has(column.id));
    if (nextColumn) addOrFocusFilter(nextColumn.id);
  };

  const removeFilter = (columnId: string) => {
    setActiveFilters((previous) => previous.filter((filter) => filter.id !== columnId));
    if (openFilterId === columnId) setOpenFilterId(null);
    resetPage();
  };

  const toggleFilterValue = (columnId: string, value: FilterValue) => {
    setActiveFilters((previous) => previous.map((filter) => {
      if (filter.id !== columnId) return filter;
      const next = new Set(filter.values);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...filter, values: next };
    }));
    resetPage();
  };

  const setFilterVisibility = (columnId: string, isVisible: boolean) => {
    setActiveFilters((previous) => previous.map((filter) => (
      filter.id === columnId ? { ...filter, isVisible } : filter
    )));
    resetPage();
  };

  const setSortForColumn = (columnId: string, direction: SortDirection) => {
    const column = columnById.get(columnId);
    if (!column?.sortable) return;
    setSort({ id: columnId, direction });
    resetPage();
  };

  const togglePinnedColumn = (columnId: string) => {
    setColumns((previous) => previous.map((column) => (
      column.id === columnId ? { ...column, pinned: !column.pinned } : column
    )));
  };

  const moveColumn = (columnId: string, direction: -1 | 1) => {
    setColumns((previous) => {
      const next = [...previous];
      const visibleIds = next.filter((column) => column.visible).map((column) => column.id);
      const visibleIndex = visibleIds.indexOf(columnId);
      const targetVisibleId = visibleIds[visibleIndex + direction];
      if (!targetVisibleId) return previous;
      const sourceIndex = next.findIndex((column) => column.id === columnId);
      const targetIndex = next.findIndex((column) => column.id === targetVisibleId);
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const hideColumn = (columnId: string) => {
    if (visibleColumns.length <= 1) return;
    setColumns((previous) => previous.map((column) => (
      column.id === columnId ? { ...column, visible: false, pinned: false } : column
    )));
    removeFilter(columnId);
  };

  const applyColumnSettings = (shown: ColumnItem[], hidden: ColumnItem[]) => {
    if (shown.length === 0) return;
    const nextOrder = [...shown, ...hidden];
    setColumns((previous) => {
      const previousById = new Map(previous.map((column) => [column.id, column]));
      const shownIds = new Set(shown.map((column) => column.id));
      const itemById = new Map(nextOrder.map((column) => [column.id, column]));
      return nextOrder.map((item) => {
        const previousColumn = previousById.get(item.id);
        return previousColumn
          ? { ...previousColumn, visible: shownIds.has(item.id), pinned: itemById.get(item.id)?.pinned }
          : previousColumn!;
      }).filter(Boolean);
    });
    setActiveFilters((previous) => previous.filter((filter) => shown.some((column) => column.id === filter.id)));
    setOptionsMenu('root');
    resetPage();
  };

  const resizeColumn = (columnId: string, deltaX: number) => {
    setColumns((previous) => previous.map((column) => {
      if (column.id !== columnId) return column;
      const minWidth = column.minWidth ?? 80;
      const startWidth = resizeStartRef.current[columnId] ?? column.width;
      return { ...column, width: Math.max(minWidth, startWidth + deltaX) };
    }));
  };

  const toggleSelected = (rowId: string) => {
    setSelectedRows((previous) => {
      const next = new Set(previous);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const selectAllVisibleRows = (checked: boolean, visibleRowIds: string[]) => {
    setSelectedRows((previous) => {
      const next = new Set(previous);
      visibleRowIds.forEach((rowId) => {
        if (checked) next.add(rowId);
        else next.delete(rowId);
      });
      return next;
    });
  };

  const addRow = () => {
    if (!createRow) return;
    setRows((previous) => [...previous, createRow(previous)]);
    resetPage();
  };

  const searchedAndFilteredRows = rows
    .filter((row) => !rowPredicate || rowPredicate(row))
    .filter((row) => {
      const normalizedSearch = search.trim().toLowerCase();
      if (!normalizedSearch) return true;
      return visibleColumns.some((column) => {
        const value = column.getSearchValue?.(row)
          ?? column.getFilterValue?.(row)
          ?? normalizeValue(column.getValue(row));
        return value.toLowerCase().includes(normalizedSearch);
      });
    })
    .filter((row) => activeFilters.every((filter) => {
      if (!filter.isVisible) return true;
      if (filter.values.size === 0) return true;
      const column = columnById.get(filter.id);
      if (!column) return true;
      const value = column.getFilterValue?.(row) ?? normalizeValue(column.getValue(row));
      return filter.values.has(value);
    }));

  const sortedRows = [...searchedAndFilteredRows].sort((a, b) => {
    if (sort.direction === 'none') return 0;
    const column = columnById.get(sort.id);
    if (!column?.sortable) return 0;
    const aValue = column.getSortValue?.(a) ?? normalizeValue(column.getValue(a));
    const bValue = column.getSortValue?.(b) ?? normalizeValue(column.getValue(b));
    const result = compareValues(aValue, bValue);
    return sort.direction === 'asc' ? result : -result;
  });

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = showPagination
    ? sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedRows;
  const pagedRowIds = pagedRows.map(getRowId);
  const allPagedSelected = pagedRowIds.length > 0 && pagedRowIds.every((rowId) => selectedRows.has(rowId));
  const somePagedSelected = pagedRowIds.some((rowId) => selectedRows.has(rowId));

  const pinnedOffsets = new Map<string, number>();
  let pinnedLeft = 0;
  visibleColumns.forEach((column) => {
    if (column.pinned) {
      pinnedOffsets.set(column.id, pinnedLeft);
      pinnedLeft += column.width;
    }
  });

  const columnsTemplate = visibleColumns
    .map((column, i) =>
      i === 1
        ? `minmax(${column.width}px, 1fr)`
        : `${column.width}px`,
    )
    .join(' ');
  const shownColumnItems: ColumnItem[] = columns
    .filter((column) => column.visible)
    .map((column) => ({ id: column.id, label: column.label, pinned: column.pinned }));
  const hiddenColumnItems: ColumnItem[] = columns
    .filter((column) => !column.visible)
    .map((column) => ({ id: column.id, label: column.label, pinned: column.pinned }));
  const currentSortColumn = columnById.get(sort.id);

  const renderPinnedProps = (column: DataTableColumn<Row>): DataTablePinnedProps => (
    column.pinned
      ? {
          className: 'dls-table__pinned-cell',
          style: asPinnedStyle(pinnedOffsets.get(column.id) ?? 0),
        }
      : {}
  );

  const renderFilterChip = (filter: ActiveFilter, size: 'm' | 's', context: 'bar' | 'submenu' = 'bar') => {
    const column = columnById.get(filter.id);
    if (!column) return null;
    const options = getFilterOptions(column);
    const isBar = context === 'bar';
    const openId = isBar ? openFilterId : openSubmenuFilterId;
    const setOpenId = isBar ? setOpenFilterId : setOpenSubmenuFilterId;

    return (
      <FilterChip
        key={filter.id}
        label={column.label}
        isVisible={filter.isVisible}
        onVisibilityChange={(isVisible) => setFilterVisibility(filter.id, isVisible)}
        open={openId === filter.id}
        onOpenChange={(isOpen) => setOpenId(isOpen ? filter.id : null)}
        size={size}
        valueSummary={<span className="dls-filter-chip__value-text">{formatFilterSummary(filter.values)}</span>}
      >
        <List className="dls-filter-chip__enum-list">
          {options.map((option) => (
            <ListItem
              key={option}
              type="with-slots"
              text={option}
              interactive={false}
              slotLeft={
                <Checkbox
                  checked={filter.values.has(option)}
                  aria-label={`Filter ${column.label} by ${option}`}
                  onChange={() => toggleFilterValue(filter.id, option)}
                />
              }
              onClick={() => toggleFilterValue(filter.id, option)}
            />
          ))}
          <ListItem type="divider" />
          <ListItem
            type="with-slots"
            text="Remove filter"
            iconStart={<TrashIcon />}
            onClick={() => removeFilter(filter.id)}
          />
        </List>
      </FilterChip>
    );
  };

  const ensureAllFiltersActive = () => {
    setActiveFilters((previous) => {
      const existingIds = new Set(previous.map((f) => f.id));
      const missing = filterableColumns.filter((c) => !existingIds.has(c.id));
      if (missing.length === 0) return previous;
      return [
        ...previous,
        ...missing.map((c) => ({ id: c.id, values: new Set<FilterValue>(), isVisible: true })),
      ];
    });
  };

  const optionsRootMenu = (
    <List>
      <ListItem type="label" text="Customize" />
      <ListItem
        type="with-slots"
        text="Columns"
        iconStart={<Columns3Icon />}
        iconEnd={<ChevronRightIcon />}
        onClick={() => setOptionsMenu('columns')}
      />
      <ListItem
        type="with-slots"
        text="Filters"
        iconStart={<FilterIcon />}
        iconEnd={<ChevronRightIcon />}
        onClick={() => { ensureAllFiltersActive(); setOptionsMenu('filters'); }}
      />
    </List>
  );

  const optionsSubmenu = (() => {
    if (optionsMenu === 'columns') {
      return (
        <DropdownColumns
          shown={shownColumnItems}
          hidden={hiddenColumnItems}
          onApply={applyColumnSettings}
          onCancel={() => setOptionsMenu('root')}
        />
      );
    }
    if (optionsMenu === 'filters') {
      return (
        <DropdownFilters>
          {activeFilters.map((filter) => renderFilterChip(filter, 's', 'submenu'))}
        </DropdownFilters>
      );
    }
    return null;
  })();

  const topBar = (
    <TableTopBar
      slotLeft={
        <>
          <SearchField
            placeholder="Search..."
            value={search}
            onChange={(event) => { setSearch(event.target.value); resetPage(); }}
            onClear={() => { setSearch(''); resetPage(); }}
          />
          <Button
            variant="soft"
            intent="neutral"
            size="m"
            icon={<FilterIcon />}
            iconOnly
            aria-label="Toggle filters"
            onClick={() => setShowFilters((isShown) => !isShown)}
          />
        </>
      }
      slotRight={
        <>
          <Button
            variant="filled"
            intent="neutral"
            size="m"
            icon={<PlusIcon />}
            onClick={addRow}
            disabled={!createRow}
          >
            {primaryActionLabel}
          </Button>
          <DropdownOptions triggerIcon={<MoreIcon />} triggerLabel="Table options">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dls-spacing-2)' }}>
              {optionsRootMenu}
              {optionsSubmenu}
            </div>
          </DropdownOptions>
        </>
      }
      showFilters={showFilters || activeFilters.length > 0}
      filters={
        <Filters
          size="m"
          groups={[
            {
              id: 'sort',
              children: (
                <FilterChip
                  label="Sort"
                  labelIcon={sort.direction === 'desc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  isVisible
                  size="m"
                  valueSummary={
                    <span className="dls-filter-chip__value-text">
                      {currentSortColumn?.label ?? 'None'}
                    </span>
                  }
                >
                  <DropdownSorting
                    columns={sortableColumns.map((column) => ({ value: column.id, label: column.label }))}
                    column={sort.id}
                    direction={sort.direction === 'desc' ? 'descending' : 'ascending'}
                    onColumnChange={(columnId) => setSortForColumn(columnId, sort.direction === 'none' ? 'asc' : sort.direction)}
                    onDirectionChange={(direction) => setSortForColumn(sort.id, direction === 'descending' ? 'desc' : 'asc')}
                  />
                </FilterChip>
              ),
            },
            {
              id: 'filters',
              children: <>{activeFilters.map((filter) => renderFilterChip(filter, 'm'))}</>,
            },
          ]}
          showAdd={activeFilters.length < filterableColumns.length}
          onAdd={addNextFilter}
        />
      }
    />
  );

  const runColumnAction = (action?: () => void) => () => {
    action?.();
    setOpenColumnMenuId(null);
    setColumnMenuPosition(null);
  };

  const toggleColumnMenu = (columnId: string) => {
    setOpenColumnMenuId((openId) => {
      if (openId === columnId) {
        setColumnMenuPosition(null);
        return null;
      }
      window.requestAnimationFrame(() => updateColumnMenuPosition(columnId));
      return columnId;
    });
  };

  const renderHeaderMenu = (column: DataTableColumn<Row>, visibleIndex: number) => (
    <DropdownColumnActions
      sortState={sort.id === column.id ? (sort.direction as SortState) : 'none'}
      pinned={Boolean(column.pinned)}
      canMoveLeft={visibleIndex > 0}
      canMoveRight={visibleIndex < visibleColumns.length - 1}
      onSortAsc={column.sortable ? runColumnAction(() => setSortForColumn(column.id, 'asc')) : undefined}
      onSortDesc={column.sortable ? runColumnAction(() => setSortForColumn(column.id, 'desc')) : undefined}
      onFilter={column.filterable ? runColumnAction(() => addOrFocusFilter(column.id)) : undefined}
      onPin={runColumnAction(() => togglePinnedColumn(column.id))}
      onMoveLeft={visibleIndex > 0 ? runColumnAction(() => moveColumn(column.id, -1)) : undefined}
      onMoveRight={visibleIndex < visibleColumns.length - 1 ? runColumnAction(() => moveColumn(column.id, 1)) : undefined}
      onHide={column.hideable !== false && visibleColumns.length > 1 ? runColumnAction(() => hideColumn(column.id)) : undefined}
    />
  );

  const renderResizeHandle = (column: DataTableColumn<Row>, visibleIndex: number) => {
    if (column.resizable === false || visibleIndex === visibleColumns.length - 1) return null;
    return (
      <Resizable
        aria-label={`Resize ${column.label} column`}
        valueNow={column.width}
        valueMin={column.minWidth ?? 80}
        valueMax={640}
        onResizeStart={() => { resizeStartRef.current[column.id] = column.width; }}
        onResize={(deltaX) => resizeColumn(column.id, deltaX)}
        onResizeEnd={() => { delete resizeStartRef.current[column.id]; }}
      />
    );
  };

  const headerRow = (
    <div className="dls-table__row" role="row">
      {visibleColumns.map((column, visibleIndex) => {
        const pinned = renderPinnedProps(column);
        const sortDirection = sort.id === column.id ? sort.direction : 'none';
        if (column.id === 'select') {
          return (
            <TableHeaderCell
              ref={(node) => { headerRefs.current[column.id] = node; }}
              key={column.id}
              type="control"
              align="center"
              className={pinned.className}
              style={pinned.style}
              resizeHandle={renderResizeHandle(column, visibleIndex)}
            >
              <Checkbox
                checked={allPagedSelected}
                indeterminate={!allPagedSelected && somePagedSelected}
                aria-label="Select all visible rows"
                onChange={(checked) => selectAllVisibleRows(checked, pagedRowIds)}
              />
            </TableHeaderCell>
          );
        }

        return (
          <TableHeaderCell
            ref={(node) => { headerRefs.current[column.id] = node; }}
            key={column.id}
            text={column.label}
            align={column.align}
            sortable={column.sortable}
            sortDirection={sortDirection}
            onSort={() => {
              const current = sort.id === column.id ? sort.direction : 'none';
              const next: SortDirection = current === 'none' ? 'asc' : current === 'asc' ? 'desc' : 'none';
              setSortForColumn(column.id, next);
            }}
            onMenuClick={() => toggleColumnMenu(column.id)}
            className={pinned.className}
            style={pinned.style}
            resizeHandle={renderResizeHandle(column, visibleIndex)}
          />
        );
      })}
    </div>
  );

  const defaultEmptyState = (
    <div className="dls-table__empty-stack">
      <span className="dls-table__empty-title">No rows found</span>
      <span className="dls-table__empty-description">Adjust search, filters, or column visibility.</span>
    </div>
  );
  const emptyContent = emptyState ?? defaultEmptyState;

  const tableRows = pagedRows.map((row, rowIndex) => {
    const rowId = getRowId(row);
    return (
      <div key={rowId} className="dls-table__row" role="row">
        {visibleColumns.map((column) => {
          const pinned = renderPinnedProps(column);
          const context: DataTableRenderContext = {
            selected: selectedRows.has(rowId),
            toggleSelected: () => toggleSelected(rowId),
            rowIndex,
            rowId,
          };
          return column.renderCell
            ? <React.Fragment key={column.id}>{column.renderCell(row, context, pinned)}</React.Fragment>
            : (
                <TableCell
                  key={column.id}
                  type="text"
                  align={column.align}
                  text={normalizeValue(column.getValue(row))}
                  className={pinned.className}
                  style={pinned.style}
                />
              );
        })}
      </div>
    );
  });

  const emptyTableRow = pagedRows.length === 0 ? (
    <div className="dls-table__empty-row" role="row">
      <div className="dls-table__empty-content" role="cell" style={{ gridColumn: `span ${visibleColumns.length}` }}>
        {emptyContent}
      </div>
    </div>
  ) : null;

  const renderMobileValue = (column: DataTableColumn<Row> | undefined, row: Row) => {
    if (!column) return null;
    return column.renderMobileValue?.(row) ?? column.getValue(row);
  };

  const mobileRows = pagedRows.length === 0 ? (
    <div className="dls-table__mobile-row dls-table__mobile-row--empty" role="listitem">
      {emptyContent}
    </div>
  ) : pagedRows.map((row) => {
    const rowId = getRowId(row);
    const primaryColumn = columnById.get(mobile.primaryColumnId);
    const secondaryColumn = columnById.get(mobile.secondaryColumnId);
    const actionsColumn = mobile.actionsColumnId ? columnById.get(mobile.actionsColumnId) : undefined;
    const context: DataTableRenderContext = {
      selected: selectedRows.has(rowId),
      toggleSelected: () => toggleSelected(rowId),
      rowIndex: pagedRows.indexOf(row),
      rowId,
    };

    return (
      <div key={rowId} className="dls-table__mobile-row" role="listitem">
        <div className="dls-table__mobile-primary">
          <span className="dls-table__mobile-title">{renderMobileValue(primaryColumn, row)}</span>
          {mobile.supportingColumnIds?.slice(0, 2).map((columnId) => {
            const column = columnById.get(columnId);
            if (!column) return null;
            return (
              <span key={columnId} className="dls-table__mobile-meta">
                {renderMobileValue(column, row)}
              </span>
            );
          })}
        </div>
        <div className="dls-table__mobile-secondary">
          {secondaryColumn && <span className="dls-table__mobile-label">{secondaryColumn.label}</span>}
          <span className="dls-table__mobile-value">{renderMobileValue(secondaryColumn, row)}</span>
          {actionsColumn?.renderCell && (
            <span className="dls-table__mobile-actions">
              {actionsColumn.renderCell(row, context, {})}
            </span>
          )}
        </div>
      </div>
    );
  });

  const openColumnMenu = openColumnMenuId
    ? visibleColumns.find((column) => column.id === openColumnMenuId)
    : undefined;
  const openColumnMenuIndex = openColumnMenu
    ? visibleColumns.findIndex((column) => column.id === openColumnMenu.id)
    : -1;
  const columnMenuPortal = openColumnMenu && columnMenuPosition
    ? createPortal(
        <div
          className="dls-table__column-menu-popover"
          style={{
            top: columnMenuPosition.top,
            left: columnMenuPosition.left,
          }}
        >
          {renderHeaderMenu(openColumnMenu, openColumnMenuIndex)}
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="dls-interactive-data-table-shell">
      {columnMenuPortal}
      <Table
        topBar={topBar}
        columns={columnsTemplate}
        layout="rows"
        mobileRows={mobileRows}
        showPagination={showPagination}
        totalItems={sortedRows.length}
        itemsPerPage={pageSize}
        itemsPerPageOptions={pageSizeOptions}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        onItemsPerPageChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
      >
        {headerRow}
        {tableRows}
        {emptyTableRow}
      </Table>
    </div>
  );
}

export const renderStatusBadge = (
  label: string,
  intent: 'neutral' | 'info' | 'success' | 'warning' | 'danger',
) => (
  <Badge variant="soft" intent={intent} size="s">{label}</Badge>
);
