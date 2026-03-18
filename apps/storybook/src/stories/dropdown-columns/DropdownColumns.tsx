import React, { useState } from 'react';
import './dropdown-columns.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Button } from '../Button';
import { Badge } from '../Badge';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const GripIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="4" r="1" fill="currentColor" />
    <circle cx="10" cy="4" r="1" fill="currentColor" />
    <circle cx="6" cy="8" r="1" fill="currentColor" />
    <circle cx="10" cy="8" r="1" fill="currentColor" />
    <circle cx="6" cy="12" r="1" fill="currentColor" />
    <circle cx="10" cy="12" r="1" fill="currentColor" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2.5L13.5 6.5L10.5 7.5L8 10L7 13L3 9L6 8L8.5 5.5L9.5 2.5Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinOffIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2.5L13.5 6.5L10.5 7.5L8 10L7 13L3 9L6 8L8.5 5.5L9.5 2.5Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    <path d="M2 14L14 2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

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
    const [dragIdx, setDragIdx] = useState<number | null>(null);
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

    /* Drag & drop for shown columns reorder */

    const handleDragStart = (idx: number, section: 'shown' | 'hidden') => {
      setDragIdx(idx);
      setDragSection(section);
    };

    const handleDragOver = (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      setDragOverIdx(idx);
    };

    const handleDrop = (targetIdx: number) => {
      if (dragIdx === null || dragSection !== 'shown') return;
      const next = [...shown];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, moved);
      update(next, hidden);
      setDragIdx(null);
      setDragOverIdx(null);
      setDragSection(null);
    };

    const handleDragEnd = () => {
      setDragIdx(null);
      setDragOverIdx(null);
      setDragSection(null);
    };

    return (
      <List
        ref={ref}
        className={['dls-dropdown-columns', className].filter(Boolean).join(' ')}
      >
        {/* Title */}
        <ListItem type="label" text="Show columns" />

        <ListItem type="divider" />

        {/* Shown section header */}
        <ListItem
          type="with-slots"
          text="Shown"
          slotRight={
            <Badge variant="soft" intent="info" size="s">{String(shown.length)}</Badge>
          }
        />

        {/* Shown columns — draggable rows need custom markup */}
        {shown.map((col, i) => (
          <div
            key={col.id}
            className="dls-dropdown-columns__row"
            draggable
            data-drag-over={dragOverIdx === i && dragSection === 'shown' ? '' : undefined}
            onDragStart={() => handleDragStart(i, 'shown')}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
          >
            <span className="dls-dropdown-columns__grip"><GripIcon /></span>
            <span className="dls-dropdown-columns__row-text">{col.label}</span>
            <Button
              variant="ghost"
              intent="neutral"
              size="s"
              icon={col.pinned ? <PinIcon /> : <PinOffIcon />}
              iconOnly
              aria-label={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label}`}
              onClick={() => togglePin(col.id)}
            />
          </div>
        ))}

        <ListItem type="divider" />

        {/* Hidden section header */}
        <ListItem
          type="with-slots"
          text="Hidden"
          iconEnd={<EyeIcon />}
        />

        {/* Hidden columns */}
        {hidden.map((col) => (
          <ListItem
            key={col.id}
            type="with-slots"
            iconStart={<GripIcon />}
            text={col.label}
            onClick={() => showColumn(col.id)}
          />
        ))}

        <ListItem type="divider" />

        {/* Footer */}
        <ListItem type="buttons">
          <Button variant="outline" intent="neutral" size="s" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="filled" intent="neutral" size="s" onClick={() => onApply?.(shown, hidden)}>
            Apply
          </Button>
        </ListItem>
      </List>
    );
  },
);

DropdownColumns.displayName = 'DropdownColumns';
