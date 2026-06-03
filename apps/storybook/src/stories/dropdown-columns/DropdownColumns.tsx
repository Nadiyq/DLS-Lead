import React, { useState, useRef, useEffect } from 'react';
import {
  GripVertical as GripVerticalIcon,
  Pin as PinIcon,
  PinOff as PinOffIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
} from 'lucide-react';
import './dropdown-columns.css';
import { ListItem } from '../list-item/ListItem';
import { Button } from '../Button';
import { Badge } from '../Badge';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ColumnItem {
  /** Unique column key */
  id: string;
  /** Column display name */
  label: string;
  /** Whether column is pinned */
  pinned?: boolean;
  /** Whether the column is locked. Locked columns:
   *  - cannot be reordered (no drag source, no drop target),
   *  - cannot be hidden (excluded from move-to-Hidden),
   *  - cannot have their pin state toggled (Pin button hidden),
   *  - render a Lock icon in place of the GripVertical handle.
   *  Used for primary-identifier / business-critical columns. */
  locked?: boolean;
}

export interface DropdownColumnsProps {
  /** Columns currently shown */
  shown: ColumnItem[];
  /** Columns currently hidden */
  hidden: ColumnItem[];
  /** Called when column configuration changes */
  onChange?: (shown: ColumnItem[], hidden: ColumnItem[]) => void;
  /** Called when user clicks Apply */
  onApply?: (shown: ColumnItem[], hidden: ColumnItem[]) => void;
  /** Called when user clicks Cancel */
  onCancel?: () => void;
  className?: string;
}

type Section = 'shown' | 'hidden';

interface DragState {
  section: Section;
  idx: number;
  id: string;
}

/* ---------------------------------------------------------------------------
   Component

   Uses pointer events rather than HTML5 native drag-and-drop. Pointer events
   work reliably across browsers, in sandboxed iframes (Storybook), and don't
   compete with text selection or nested interactive elements. The pattern is
   the same one used by Linear / Notion / Asana for row reordering.
   --------------------------------------------------------------------------- */

export const DropdownColumns = React.forwardRef<HTMLDivElement, DropdownColumnsProps>(
  (
    {
      shown: shownProp,
      hidden: hiddenProp,
      onChange,
      onApply,
      onCancel,
      className,
    },
    ref,
  ) => {
    const [shown, setShown] = useState(shownProp);
    const [hidden, setHidden] = useState(hiddenProp);
    const [drag, setDrag] = useState<DragState | null>(null);
    const [over, setOver] = useState<{ section: Section; idx: number } | null>(null);

    // Keep latest lists available to the pointermove/up handlers without
    // re-binding listeners on every state change.
    const shownRef = useRef(shown);
    const hiddenRef = useRef(hidden);
    useEffect(() => { shownRef.current = shown; }, [shown]);
    useEffect(() => { hiddenRef.current = hidden; }, [hidden]);

    const rootRef = useRef<HTMLDivElement | null>(null);

    const update = (nextShown: ColumnItem[], nextHidden: ColumnItem[]) => {
      setShown(nextShown);
      setHidden(nextHidden);
      onChange?.(nextShown, nextHidden);
    };

    const togglePin = (id: string) => {
      const col = shown.find((c) => c.id === id);
      if (!col || col.locked) return; // locked columns cannot toggle pin
      const next = shown.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c));
      update(next, hidden);
    };

    const showColumn = (id: string) => {
      const col = hidden.find((c) => c.id === id);
      if (!col || col.locked) return; // locked columns cannot be re-shown via click (they shouldn't appear in hidden anyway)
      update([...shown, col], hidden.filter((c) => c.id !== id));
    };

    const hideColumn = (id: string) => {
      const col = shown.find((c) => c.id === id);
      if (!col || col.locked) return; // locked columns cannot be hidden
      update(shown.filter((c) => c.id !== id), [...hidden, col]);
    };

    /* --- Keyboard reordering ---
       Alt+ArrowUp / Alt+ArrowDown moves the focused row within its
       section. Locked rows in the destination path are skipped so
       they keep their fixed position. Focus follows the row to its
       new index so consecutive presses keep working. */

    const moveInSection = (section: Section, fromIdx: number, delta: 1 | -1) => {
      const list = section === 'shown' ? [...shown] : [...hidden];
      if (list[fromIdx]?.locked) return; // source is locked — should be unreachable
      // Find next non-locked destination index in the requested direction.
      let toIdx = fromIdx + delta;
      while (toIdx >= 0 && toIdx < list.length && list[toIdx]?.locked) {
        toIdx += delta;
      }
      if (toIdx < 0 || toIdx >= list.length) return; // no valid destination
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      if (section === 'shown') update(list, hidden);
      else update(shown, list);
      // Move focus to the row's new index after React re-renders.
      requestAnimationFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const next = root.querySelector<HTMLElement>(
          `[data-drag-row][data-drag-section="${section}"][data-drag-idx="${toIdx}"]`,
        );
        next?.focus();
      });
    };

    const handleKeyDown = (
      e: React.KeyboardEvent,
      idx: number,
      section: Section,
      col: ColumnItem,
    ) => {
      if (col.locked) return;
      // Don't intercept keys that originate from a nested control
      // (e.g. the Pin Button) — let those bubble naturally.
      if ((e.target as HTMLElement).closest('.dls-list-item') !== e.currentTarget) return;
      if (e.altKey && e.key === 'ArrowUp') {
        e.preventDefault();
        moveInSection(section, idx, -1);
      } else if (e.altKey && e.key === 'ArrowDown') {
        e.preventDefault();
        moveInSection(section, idx, 1);
      } else if (section === 'hidden' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        showColumn(col.id);
      } else if (section === 'shown' && e.key === 'Delete') {
        e.preventDefault();
        hideColumn(col.id);
      }
    };

    /* --- Pointer-based drag --- */

    const handlePointerDown = (
      e: React.PointerEvent,
      idx: number,
      section: Section,
      id: string,
    ) => {
      // Ignore non-primary buttons and clicks on interactive children
      // (e.g. the Pin toggle) so they still function normally.
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest('button') && target.closest('.dls-list-item') !== target) {
        // Click originated on the nested Pin <button>, let it handle the click.
        return;
      }
      // Locked columns cannot initiate a drag.
      const list = section === 'shown' ? shown : hidden;
      const col = list[idx];
      if (col?.locked) return;
      e.preventDefault();
      setDrag({ section, idx, id });
    };

    useEffect(() => {
      if (!drag) return;

      const findRowAtPoint = (x: number, y: number):
        | { section: Section; idx: number }
        | null => {
        const root = rootRef.current;
        if (!root) return null;
        // Locked rows are excluded as drop targets so they keep their
        // fixed position. (They also opt out as sources via the
        // pointer-down guard.)
        const rows = root.querySelectorAll<HTMLElement>('[data-drag-row]:not([data-locked])');
        for (const row of Array.from(rows)) {
          const rect = row.getBoundingClientRect();
          if (y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right) {
            return {
              section: row.dataset.dragSection as Section,
              idx: Number(row.dataset.dragIdx),
            };
          }
        }
        // Fallback: figure out which section the point is over (hit above/below rows).
        const shownRows = root.querySelectorAll<HTMLElement>(
          '[data-drag-row][data-drag-section="shown"]:not([data-locked])',
        );
        const hiddenRows = root.querySelectorAll<HTMLElement>(
          '[data-drag-row][data-drag-section="hidden"]:not([data-locked])',
        );
        const midOfFirst = (nodes: NodeListOf<HTMLElement>) => {
          if (!nodes.length) return null;
          const r = nodes[0].getBoundingClientRect();
          return r.top + r.height / 2;
        };
        const shownMid = midOfFirst(shownRows);
        const hiddenMid = midOfFirst(hiddenRows);
        if (shownMid !== null && hiddenMid !== null) {
          const section = Math.abs(y - shownMid) < Math.abs(y - hiddenMid) ? 'shown' : 'hidden';
          const nodes = section === 'shown' ? shownRows : hiddenRows;
          // Pick the nearest row by y-center
          let best = 0;
          let bestDist = Infinity;
          nodes.forEach((n, i) => {
            const r = n.getBoundingClientRect();
            const dist = Math.abs(y - (r.top + r.height / 2));
            if (dist < bestDist) { bestDist = dist; best = i; }
          });
          return { section, idx: best };
        }
        return null;
      };

      const onMove = (e: PointerEvent) => {
        const hit = findRowAtPoint(e.clientX, e.clientY);
        if (hit) setOver(hit); else setOver(null);
      };

      const onUp = (e: PointerEvent) => {
        const hit = findRowAtPoint(e.clientX, e.clientY);
        if (hit) {
          const sourceList = drag.section === 'shown' ? [...shownRef.current] : [...hiddenRef.current];
          const destList = hit.section === drag.section
            ? sourceList
            : hit.section === 'shown' ? [...shownRef.current] : [...hiddenRef.current];

          if (drag.section === hit.section) {
            const [moved] = sourceList.splice(drag.idx, 1);
            sourceList.splice(hit.idx, 0, moved);
            if (drag.section === 'shown') update(sourceList, hiddenRef.current);
            else update(shownRef.current, sourceList);
          } else {
            const [moved] = sourceList.splice(drag.idx, 1);
            destList.splice(hit.idx, 0, moved);
            if (drag.section === 'shown') update(sourceList, destList);
            else update(destList, sourceList);
          }
        }
        setDrag(null);
        setOver(null);
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      return () => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drag]);

    const rowDragProps = (
      idx: number,
      section: Section,
      col: ColumnItem,
    ) => ({
      'data-drag-row': '',
      'data-drag-idx': String(idx),
      'data-drag-section': section,
      'data-locked': col.locked ? '' : undefined,
      'data-dragging': drag?.section === section && drag?.idx === idx ? '' : undefined,
      'data-drag-over':
        over?.section === section && over?.idx === idx && !(drag?.section === section && drag?.idx === idx)
          ? ''
          : undefined,
      // Locked rows skip the pointer-down handler entirely so they
      // don't even fire preventDefault — text selection / clicks work
      // as on any non-interactive row.
      onPointerDown: col.locked
        ? undefined
        : (e: React.PointerEvent) => handlePointerDown(e, idx, section, col.id),
      // Non-locked rows are keyboard-focusable. Alt+Up/Down reorder,
      // Enter/Space (Hidden) shows, Delete (Shown) hides.
      tabIndex: col.locked ? undefined : 0,
      onKeyDown: col.locked
        ? undefined
        : (e: React.KeyboardEvent) => handleKeyDown(e, idx, section, col),
    });

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-dropdown-columns', className].filter(Boolean).join(' ')}
        role="listbox"
      >
        {/* Title */}
        <ListItem type="label" text="Show columns" />

        <ListItem type="divider" />

        {/* Shown section header */}
        <ListItem
          type="with-slots"
          className="dls-dropdown-columns__section-header"
          text="Shown"
          slotRight={
            <Badge variant="soft" intent="info" size="s">{String(shown.length)}</Badge>
          }
        />

        {/* Shown columns — pointer-draggable rows (locked rows are static) */}
        {shown.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            {...rowDragProps(i, 'shown', col)}
            iconStart={col.locked ? <LockIcon aria-hidden="true" /> : <GripVerticalIcon aria-hidden="true" />}
            text={col.label}
            aria-label={col.locked ? `${col.label} (locked)` : undefined}
            slotRight={
              col.locked ? undefined : (
                <Button
                  variant="ghost"
                  intent="neutral"
                  size="s"
                  icon={col.pinned ? <PinIcon /> : <PinOffIcon />}
                  iconOnly
                  aria-label={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label}`}
                  onClick={() => togglePin(col.id)}
                />
              )
            }
          />
        ))}

        <ListItem type="divider" />

        {/* Hidden section header */}
        <ListItem
          type="with-slots"
          className="dls-dropdown-columns__section-header"
          text="Hidden"
          iconEnd={<EyeOffIcon />}
        />

        {/* Hidden columns — pointer-draggable; click-to-show fires on pointer up without drag movement.
            Locked columns should not appear here in practice, but if they do, they are non-interactive. */}
        {hidden.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            {...rowDragProps(i, 'hidden', col)}
            iconStart={col.locked ? <LockIcon aria-hidden="true" /> : <GripVerticalIcon aria-hidden="true" />}
            text={col.label}
            aria-label={col.locked ? `${col.label} (locked)` : undefined}
            onClick={col.locked ? undefined : () => showColumn(col.id)}
          />
        ))}

        <ListItem type="divider" />

        {/* Footer */}
        <ListItem type="buttons">
          <Button variant="outline" intent="neutral" size="m" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="filled" intent="neutral" size="m" onClick={() => onApply?.(shown, hidden)}>
            Apply
          </Button>
        </ListItem>
      </div>
    );
  },
);

DropdownColumns.displayName = 'DropdownColumns';
