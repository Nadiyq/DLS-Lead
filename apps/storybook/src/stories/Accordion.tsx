import React from 'react';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
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
    const id = React.useId();
    const triggerId = `${id}trigger`;
    const contentId = `${id}content`;

    return (
      <div
        ref={ref}
        className={['dls-accordion-item', className].filter(Boolean).join(' ')}
        data-open={isOpen || undefined}
        {...props}
      >
        <button
          id={triggerId}
          className="dls-accordion-item__trigger"
          onClick={() => setIsOpen((o) => !o)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="dls-accordion-item__title">{title}</span>
          <ChevronDownIcon className="dls-accordion-item__chevron" aria-hidden="true" />
        </button>

        {isOpen && children !== undefined && (
          <div
            id={contentId}
            className="dls-accordion-item__content"
            role="region"
            aria-labelledby={triggerId}
          >
            {children}
          </div>
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
