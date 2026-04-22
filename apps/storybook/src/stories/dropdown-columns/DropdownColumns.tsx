import React, { useState, useRef, useEffect } from 'react';
import {
  GripVertical as GripVerticalIcon,
  Pin as PinIcon,
  PinOff as PinOffIcon,
  EyeOff as EyeOffIcon,
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
      const next = shown.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c));
      update(next, hidden);
    };

    const showColumn = (id: string) => {
      const col = hidden.find((c) => c.id === id);
      if (!col) return;
      update([...shown, col], hidden.filter((c) => c.id !== id));
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
        const rows = root.querySelectorAll<HTMLElement>('[data-drag-row]');
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
          '[data-drag-row][data-drag-section="shown"]',
        );
        const hiddenRows = root.querySelectorAll<HTMLElement>(
          '[data-drag-row][data-drag-section="hidden"]',
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

    const rowDragProps = (idx: number, section: Section, id: string) => ({
      'data-drag-row': '',
      'data-drag-idx': String(idx),
      'data-drag-section': section,
      'data-dragging': drag?.section === section && drag?.idx === idx ? '' : undefined,
      'data-drag-over':
        over?.section === section && over?.idx === idx && !(drag?.section === section && drag?.idx === idx)
          ? ''
          : undefined,
      onPointerDown: (e: React.PointerEvent) => handlePointerDown(e, idx, section, id),
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

        {/* Shown columns — pointer-draggable rows */}
        {shown.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            {...rowDragProps(i, 'shown', col.id)}
            iconStart={<GripVerticalIcon />}
            text={col.label}
            slotRight={
              <Button
                variant="ghost"
                intent="neutral"
                size="s"
                icon={col.pinned ? <PinIcon /> : <PinOffIcon />}
                iconOnly
                aria-label={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label}`}
                onClick={() => togglePin(col.id)}
              />
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

        {/* Hidden columns — pointer-draggable; click-to-show fires on pointer up without drag movement */}
        {hidden.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            {...rowDragProps(i, 'hidden', col.id)}
            iconStart={<GripVerticalIcon />}
            text={col.label}
            onClick={() => showColumn(col.id)}
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
