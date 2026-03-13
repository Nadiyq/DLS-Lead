import React, { useState } from 'react';
import './dropdown-columns.css';

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
      <div
        ref={ref}
        className={['dls-dropdown-columns', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-label="Configure columns"
      >
        {/* Title */}
        <div className="dls-dropdown-columns__section">
          <span className="dls-dropdown-columns__section-label" style={{ fontWeight: 'var(--dls-font-weight-medium)', color: 'var(--dls-color-text-primary)' }}>
            Show columns
          </span>
        </div>

        <div className="dls-dropdown-columns__divider" />

        {/* Shown section header */}
        <div className="dls-dropdown-columns__section">
          <span className="dls-dropdown-columns__section-label">Shown</span>
          <span className="dls-dropdown-columns__count">{shown.length}</span>
        </div>

        {/* Shown columns */}
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
            <button
              type="button"
              className="dls-dropdown-columns__action"
              aria-label={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label}`}
              onClick={() => togglePin(col.id)}
            >
              {col.pinned ? <PinIcon /> : <PinOffIcon />}
            </button>
          </div>
        ))}

        <div className="dls-dropdown-columns__divider" />

        {/* Hidden section header */}
        <div className="dls-dropdown-columns__section">
          <span className="dls-dropdown-columns__section-label">Hidden</span>
          <span className="dls-dropdown-columns__section-icon"><EyeIcon /></span>
        </div>

        {/* Hidden columns */}
        {hidden.map((col) => (
          <div
            key={col.id}
            className="dls-dropdown-columns__row"
            onClick={() => showColumn(col.id)}
            style={{ cursor: 'pointer' }}
          >
            <span className="dls-dropdown-columns__grip"><GripIcon /></span>
            <span className="dls-dropdown-columns__row-text">{col.label}</span>
          </div>
        ))}

        <div className="dls-dropdown-columns__divider" />

        {/* Footer */}
        <div className="dls-dropdown-columns__footer">
          <button
            type="button"
            className="dls-dropdown-columns__btn"
            data-variant="outline"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="dls-dropdown-columns__btn"
            data-variant="filled"
            onClick={() => onApply?.(shown, hidden)}
          >
            Apply
          </button>
        </div>
      </div>
    );
  },
);

DropdownColumns.displayName = 'DropdownColumns';
