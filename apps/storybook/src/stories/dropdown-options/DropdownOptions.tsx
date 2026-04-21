import React, { useState, useRef, useEffect } from 'react';
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

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
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

    return (
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

        <div
          className="dls-dropdown-options__panel"
          data-align={align}
          data-side={side}
          role="menu"
        >
          {children}
        </div>
      </div>
    );
  },
);

DropdownOptions.displayName = 'DropdownOptions';
