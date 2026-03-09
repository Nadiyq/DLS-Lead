import React from 'react';
import './chip-filter.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ChipFilterSize = 's' | 'm';

export interface ChipFilterSegment {
  /** Segment label text */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
}

export interface ChipFilterProps {
  /** Filter segments (label sections) */
  segments: ChipFilterSegment[];
  /** Whether the filter is active */
  active?: boolean;
  /** Size */
  size?: ChipFilterSize;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ChipFilter = React.forwardRef<HTMLDivElement, ChipFilterProps>(
  (
    {
      segments,
      active = false,
      size = 'm',
      onClick,
      disabled = false,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-chip-filter', className].filter(Boolean).join(' ')}
        role="button"
        tabIndex={!disabled ? 0 : undefined}
        data-active={active || undefined}
        data-size={size}
        data-disabled={disabled || undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={
          !disabled
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as unknown as React.MouseEvent); } }
            : undefined
        }
      >
        {segments.map((seg, i) => (
          <span key={i} className="dls-chip-filter__segment">
            {seg.icon && <span className="dls-chip-filter__icon">{seg.icon}</span>}
            <span className="dls-chip-filter__label">{seg.label}</span>
          </span>
        ))}

        <span className="dls-chip-filter__chevron">
          <ChevronDown />
        </span>
      </div>
    );
  },
);

ChipFilter.displayName = 'ChipFilter';
