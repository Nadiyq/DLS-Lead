import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical as MoreVerticalIcon } from 'lucide-react';
import './dropdown-options.css';
import { Button } from '../Button';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type DropdownOptionsAlign = 'start' | 'end';
export type DropdownOptionsSide = 'top' | 'bottom';

export interface DropdownOptionsProps {
  /** Menu content — typically List + ListItem components */
  children: React.ReactNode;
  /** Horizontal alignment of the panel relative to trigger */
  align?: DropdownOptionsAlign;
  /** Which side of the trigger to open on */
  side?: DropdownOptionsSide;
  /** Custom trigger icon (defaults to 3-dot kebab) */
  triggerIcon?: React.ReactNode;
  /** Accessible label for the trigger button */
  triggerLabel?: string;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownOptions = React.forwardRef<HTMLDivElement, DropdownOptionsProps>(
  (
    {
      children,
      align = 'end',
      side = 'bottom',
      triggerIcon,
      triggerLabel = 'Options',
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

    const updatePosition = useCallback(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const panelLeft = align === 'end' ? rect.right : rect.left;
      const panelTop = side === 'top' ? rect.top : rect.bottom + 4;
      setPanelPos({ top: panelTop, left: panelLeft });
    }, [align, side]);

    useEffect(() => {
      if (!isOpen) return;
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, updatePosition]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          wrapperRef.current && !wrapperRef.current.contains(target) &&
          panelRef.current && !panelRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    // Close on Escape
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const toggle = () => {
      if (!disabled) setIsOpen(v => !v);
    };

    const panelStyle: React.CSSProperties = panelPos ? {
      top: panelPos.top,
      ...(align === 'end' ? { right: window.innerWidth - panelPos.left } : { left: panelPos.left }),
    } : {};

    const portal = isOpen ? createPortal(
      <div
        ref={panelRef}
        className="dls-dropdown-options__panel dls-dropdown-options__panel--portal"
        data-align={align}
        data-side={side}
        role="menu"
        style={panelStyle}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>,
      document.body,
    ) : null;

    return (
      <>
        <div
          ref={(node) => {
            (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={['dls-dropdown-options', className].filter(Boolean).join(' ')}
          data-open={isOpen || undefined}
          onKeyDown={handleKeyDown}
        >
          <Button
            variant="soft"
            intent="neutral"
            size="m"
            icon={triggerIcon || <MoreVerticalIcon />}
            iconOnly
            aria-label={triggerLabel}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            disabled={disabled}
            onClick={toggle}
          />
        </div>
        {portal}
      </>
    );
  },
);

DropdownOptions.displayName = 'DropdownOptions';
