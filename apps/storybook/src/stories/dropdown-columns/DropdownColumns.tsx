import React, { useState, useRef } from 'react';
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

/* ---------------------------------------------------------------------------
   Component
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
    // Drag source tracked via refs (not state) so the value is available
    // synchronously in the drop handler without waiting for React to flush.
    // dragOverIdx stays as state because it drives visual feedback (data-drag-over).
    const dragIdxRef = useRef<number | null>(null);
    const dragSectionRef = useRef<'shown' | 'hidden' | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const [dragSection, setDragSection] = useState<'shown' | 'hidden' | null>(null);

    const update = (nextShown: ColumnItem[], nextHidden: ColumnItem[]) => {
      setShown(nextShown);
      setHidden(nextHidden);
      onChange?.(nextShown, nextHidden);
    };

    const togglePin = (id: string) => {
      const next = shown.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c);
      update(next, hidden);
    };

    const showColumn = (id: string) => {
      const col = hidden.find(c => c.id === id);
      if (!col) return;
      update([...shown, col], hidden.filter(c => c.id !== id));
    };

    /* Drag & drop — reorder within a section and move items across sections.
       dataTransfer.setData is required for the drag to initiate in Firefox. */

    const handleDragStart = (e: React.DragEvent, idx: number, section: 'shown' | 'hidden') => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
      dragIdxRef.current = idx;
      dragSectionRef.current = section;
      setDragSection(section);
    };

    const handleDragOver = (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIdx(idx);
    };

    const handleDrop = (targetIdx: number, targetSection: 'shown' | 'hidden') => {
      const dragIdx = dragIdxRef.current;
      const sourceSection = dragSectionRef.current;
      if (dragIdx === null || sourceSection === null) return;

      if (sourceSection === targetSection) {
        // Reorder within section
        const list = targetSection === 'shown' ? [...shown] : [...hidden];
        const [moved] = list.splice(dragIdx, 1);
        list.splice(targetIdx, 0, moved);
        if (targetSection === 'shown') update(list, hidden);
        else update(shown, list);
      } else {
        // Move across sections
        const source = sourceSection === 'shown' ? [...shown] : [...hidden];
        const dest = targetSection === 'shown' ? [...shown] : [...hidden];
        const [moved] = source.splice(dragIdx, 1);
        dest.splice(targetIdx, 0, moved);
        if (sourceSection === 'shown') update(source, dest);
        else update(dest, source);
      }

      dragIdxRef.current = null;
      dragSectionRef.current = null;
      setDragOverIdx(null);
      setDragSection(null);
    };

    const handleDragEnd = () => {
      dragIdxRef.current = null;
      dragSectionRef.current = null;
      setDragOverIdx(null);
      setDragSection(null);
    };

    return (
      <div
        ref={ref}
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

        {/* Shown columns — draggable list items.
            interactive={false} so the row renders as <div>, not <button>.
            Rendering as <button> would (a) nest the Pin <button> inside
            another <button> (invalid HTML), and (b) break HTML5 drag
            events which browsers swallow on nested interactive elements. */}
        {shown.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            draggable
            data-drag-over={dragOverIdx === i && dragSection === 'shown' ? '' : undefined}
            onDragStart={(e: React.DragEvent) => handleDragStart(e, i, 'shown')}
            onDragOver={(e: React.DragEvent) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i, 'shown')}
            onDragEnd={handleDragEnd}
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

        {/* Hidden columns — draggable (drag to Shown to re-enable, or reorder within Hidden).
            interactive={false} so drag works; click-to-show is wired onto the row div. */}
        {hidden.map((col, i) => (
          <ListItem
            key={col.id}
            type="with-slots"
            interactive={false}
            draggable
            data-drag-over={dragOverIdx === i && dragSection === 'hidden' ? '' : undefined}
            onDragStart={(e: React.DragEvent) => handleDragStart(e, i, 'hidden')}
            onDragOver={(e: React.DragEvent) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i, 'hidden')}
            onDragEnd={handleDragEnd}
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
