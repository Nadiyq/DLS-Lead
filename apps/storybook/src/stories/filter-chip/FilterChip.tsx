import React, { useState, useRef, useEffect } from 'react';
import { Chip, type ChipSize } from '../chip/Chip';
import './filter-chip.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8C2.5 5 5 3 8 3C11 3 13.5 5 14.5 8C13.5 11 11 13 8 13C5 13 2.5 11 1.5 8Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    <path d="M6.5 6.8C6.2 7.1 6 7.5 6 8C6 9.1 6.9 10 8 10C8.5 10 8.9 9.8 9.2 9.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    <path d="M3.5 5.5C2.5 6.5 1.8 7.5 1.5 8C2.5 11 5 13 8 13C9 13 9.9 12.7 10.7 12.3" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 10C13 9 14.2 7.5 14.5 8C14.5 8 14.5 7.8 14.5 8C13.5 5 11 3 8 3C7.5 3 7 3.1 6.5 3.2" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type FilterChipSize = ChipSize;

export interface FilterChipProps {
  /** Filter category label (e.g. "Users", "Date", "Status") */
  label: string;
  /** Leading icon for the label part (defaults to eye toggle) */
  labelIcon?: React.ReactNode;
  /** Whether the filter is applied to the table */
  isVisible?: boolean;
  /** Called when the label part is clicked (toggles visibility) */
  onVisibilityChange?: (visible: boolean) => void;
  /** Summary content rendered in the value part */
  valueSummary?: React.ReactNode;
  /** Dropdown panel content — rendered when value chevron is clicked */
  children?: React.ReactNode;
  /** Size */
  size?: FilterChipSize;
  /** Disabled */
  disabled?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Called when dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component — Figma structure:
   Container (outline styled bar)
   ├── Label part (clickable): Chip building block (icon + text)
   └── Value part: content + action button (chevron)
   --------------------------------------------------------------------------- */

export const FilterChip = React.forwardRef<HTMLDivElement, FilterChipProps>(
  (
    {
      label,
      labelIcon,
      isVisible = true,
      onVisibilityChange,
      valueSummary,
      children,
      size = 'm',
      disabled = false,
      open: controlledOpen,
      onOpenChange,
      className,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const setOpen = (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    };

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [isOpen]);

    const handleLabelClick = () => {
      if (!disabled) onVisibilityChange?.(!isVisible);
    };

    const handleValueChevronClick = () => {
      if (!disabled) setOpen(!isOpen);
    };

    const eyeIcon = labelIcon ?? (isVisible ? <EyeIcon /> : <EyeOffIcon />);

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-filter-chip', className].filter(Boolean).join(' ')}
        data-size={size}
        data-disabled={disabled || undefined}
        data-open={isOpen || undefined}
      >
        {/* Bar — outline styled container with 2 parts */}
        <div className="dls-filter-chip__bar">
          {/* Part 1 — Label: clickable, Chip building block (icon + text) */}
          <button
            type="button"
            className="dls-filter-chip__label"
            disabled={disabled}
            onClick={handleLabelClick}
            aria-label={isVisible ? `Hide ${label} filter` : `Show ${label} filter`}
            aria-pressed={isVisible}
          >
            <Chip leadingIcon={eyeIcon} label={label} size={size} />
          </button>

          {/* Part 2 — Value: content + chevron action */}
          {valueSummary && (
            <div className="dls-filter-chip__value">
              <div className="dls-filter-chip__value-content">
                {valueSummary}
              </div>
              {children && (
                <button
                  type="button"
                  className="dls-filter-chip__action"
                  disabled={disabled}
                  onClick={handleValueChevronClick}
                  aria-label={isOpen ? `Close ${label} filter editor` : `Open ${label} filter editor`}
                  aria-expanded={isOpen}
                  aria-haspopup="dialog"
                >
                  <span className="dls-filter-chip__chevron-icon" data-open={isOpen || undefined}>
                    <ChevronDown />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dropdown panel */}
        {isOpen && children && (
          <div className="dls-filter-chip__dropdown">
            {children}
          </div>
        )}
      </div>
    );
  },
);

FilterChip.displayName = 'FilterChip';
