import React from 'react';
import './resizable.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ResizableProps {
  /** Disabled state */
  disabled?: boolean;
  /** Called while dragging with the horizontal delta in pixels */
  onResize?: (deltaX: number) => void;
  /** Called when drag starts */
  onResizeStart?: () => void;
  /** Called when drag ends */
  onResizeEnd?: () => void;
  /** Current value for screen readers */
  valueNow?: number;
  /** Minimum value for screen readers */
  valueMin?: number;
  /** Maximum value for screen readers */
  valueMax?: number;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Grip icon — 6-dot vertical grip
   --------------------------------------------------------------------------- */

const GripIcon = () => (
  <svg viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1" cy="1" r="0.75" fill="currentColor" />
    <circle cx="3" cy="1" r="0.75" fill="currentColor" />
    <circle cx="1" cy="4" r="0.75" fill="currentColor" />
    <circle cx="3" cy="4" r="0.75" fill="currentColor" />
    <circle cx="1" cy="7" r="0.75" fill="currentColor" />
    <circle cx="3" cy="7" r="0.75" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>(
  (
    {
      disabled = false,
      onResize,
      onResizeStart,
      onResizeEnd,
      valueNow = 0,
      valueMin = 0,
      valueMax = 100,
      'aria-label': ariaLabel = 'Resize',
      className,
    },
    ref,
  ) => {
    const [active, setActive] = React.useState(false);
    const startXRef = React.useRef(0);

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        startXRef.current = e.clientX;
        setActive(true);
        onResizeStart?.();
      },
      [disabled, onResizeStart],
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!active) return;
        const deltaX = e.clientX - startXRef.current;
        onResize?.(deltaX);
      },
      [active, onResize],
    );

    const handlePointerUp = React.useCallback(() => {
      if (!active) return;
      setActive(false);
      onResizeEnd?.();
    }, [active, onResizeEnd]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = e.shiftKey ? 10 : 1;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onResize?.(-step);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          onResize?.(step);
        }
      },
      [disabled, onResize],
    );

    return (
      <div
        ref={ref}
        className={['dls-resizable', className].filter(Boolean).join(' ')}
        data-disabled={disabled ? '' : undefined}
        data-active={active ? '' : undefined}
        role="separator"
        aria-orientation="vertical"
        aria-label={ariaLabel}
        aria-valuemin={valueMin}
        aria-valuemax={valueMax}
        aria-valuenow={valueNow}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <span className="dls-resizable__line" />
        <span className="dls-resizable__handle">
          <span className="dls-resizable__icon">
            <GripIcon />
          </span>
        </span>
        <span className="dls-resizable__line" />
      </div>
    );
  },
);

Resizable.displayName = 'Resizable';
