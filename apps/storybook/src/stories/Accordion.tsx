import React, { useState } from 'react';
import { component, font } from '@tokens/tokens';
import './accordion.css';

const tk = component.default.accordion.item;

type IState = 'normal' | 'hover' | 'focus' | 'pressed';

// ─── AccordionItem ────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  /** Header text */
  title: string;
  /** Content shown when expanded */
  children?: React.ReactNode;
  /** Start in the open state */
  defaultOpen?: boolean;
  /** Disable all interaction */
  disabled?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  disabled = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [iState, setIState] = useState<IState>('normal');

  const bg =
    !disabled && iState === 'pressed' ? tk.bg.pressed :
    !disabled && iState === 'hover'   ? tk.bg.hover   :
    'transparent';

  const ring = iState === 'focus' ? tk.focus.ring : 'none';

  return (
    <div
      className="accordion-item"
      style={{
        borderBottomColor: tk.border,
        opacity: disabled ? tk.disabled.opacity : 1,
        fontFamily: font.family,
      }}
    >
      <button
        className="accordion-item__trigger"
        onClick={() => { if (!disabled) setIsOpen(o => !o); }}
        onMouseEnter={() => { if (!disabled) setIState('hover'); }}
        onMouseLeave={() => setIState('normal')}
        onMouseDown={() => { if (!disabled) setIState('pressed'); }}
        onMouseUp={() => { if (!disabled) setIState('hover'); }}
        onFocus={() => setIState('focus')}
        onBlur={() => setIState('normal')}
        disabled={disabled}
        aria-expanded={isOpen}
        style={{ backgroundColor: bg, boxShadow: ring }}
      >
        <span className="accordion-item__title" style={{ color: tk.titleFg }}>
          {title}
        </span>
        <svg
          className={`accordion-item__icon${isOpen ? ' accordion-item__icon--open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke={tk.contentFg}
            strokeWidth="1.33"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && children !== undefined && (
        <div
          className="accordion-item__content"
          style={{ color: tk.contentFg }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Accordion (group) ────────────────────────────────────────────────────────

export interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return (
    <div className="accordion" style={{ fontFamily: font.family }}>
      {children}
    </div>
  );
}
