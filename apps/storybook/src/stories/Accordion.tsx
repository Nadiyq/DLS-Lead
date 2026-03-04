import React from 'react';
import './accordion.css';

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
  className?: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, children, defaultOpen = false, disabled = false, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <div
        ref={ref}
        className={['dls-accordion-item', className].filter(Boolean).join(' ')}
        data-open={isOpen || undefined}
        {...props}
      >
        <button
          className="dls-accordion-item__trigger"
          onClick={() => setIsOpen((o) => !o)}
          disabled={disabled}
          aria-expanded={isOpen}
        >
          <span className="dls-accordion-item__title">{title}</span>
          <svg
            className="dls-accordion-item__chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && children !== undefined && (
          <div className="dls-accordion-item__content">{children}</div>
        )}
      </div>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

// ─── Accordion (group) ────────────────────────────────────────────────────────

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={['dls-accordion', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  ),
);

Accordion.displayName = 'Accordion';
