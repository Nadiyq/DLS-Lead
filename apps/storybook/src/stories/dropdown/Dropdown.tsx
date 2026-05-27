import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown as ChevronDownIcon,
  TriangleAlert as TriangleAlertIcon,
} from 'lucide-react';
import './dropdown.css';
import { ListItem } from '../list-item/ListItem';
import { Avatar } from '../Avatar';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface DropdownOption {
  value: string;
  label: string;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Avatar initials fallback */
  avatarInitials?: string;
}

export interface DropdownProps {
  /** Available options */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Leading icon for the trigger (shown when no value selected) */
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select',
      label,
      hint,
      error,
      leadingIcon,
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const reactId = React.useId();
    const triggerId = id || reactId;
    const listboxId = `${triggerId}-listbox`;

    const hasError = !!error;
    const hintId = `${triggerId}-hint`;
    const selected = options.find((o) => o.value === value);
    const hasLeading = !!(leadingIcon || selected?.icon || selected?.avatarSrc || selected?.avatarInitials);

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

    const open = () => {
      if (disabled) return;
      setIsOpen(true);
      setHighlightedIdx(options.findIndex((o) => o.value === value));
    };

    const close = () => setIsOpen(false);

    const select = (opt: DropdownOption) => {
      onChange?.(opt.value);
      close();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Enter' && isOpen && highlightedIdx >= 0) {
        e.preventDefault();
        select(options[highlightedIdx]);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) { open(); return; }
        setHighlightedIdx((i) => Math.min(i + 1, options.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(i - 1, 0));
      }
    };

    const renderLeading = (opt?: DropdownOption) => {
      if (opt?.icon) {
        return <span className="dls-dropdown__leading dls-dropdown__leading-icon">{opt.icon}</span>;
      }
      if (opt?.avatarSrc || opt?.avatarInitials) {
        return (
          <span className="dls-dropdown__leading">
            <Avatar
              size="20"
              src={opt.avatarSrc}
              initials={opt.avatarInitials || '?'}
            />
          </span>
        );
      }
      if (leadingIcon && !opt) {
        return <span className="dls-dropdown__leading dls-dropdown__leading-icon">{leadingIcon}</span>;
      }
      return null;
    };

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-dropdown', className].filter(Boolean).join(' ')}
        data-open={isOpen || undefined}
        onKeyDown={handleKeyDown}
      >
        {label && (
          <label
            className="dls-dropdown__label"
            htmlFor={triggerId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <button
          type="button"
          id={triggerId}
          className="dls-dropdown__trigger"
          disabled={disabled}
          data-error={hasError || undefined}
          data-has-leading={hasLeading || undefined}
          onClick={() => (isOpen ? close() : open())}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={(hint || hasError) ? hintId : undefined}
        >
          {renderLeading(selected) || renderLeading()}

          <span
            className="dls-dropdown__value"
            data-placeholder={!selected || undefined}
          >
            {selected?.label || placeholder}
          </span>

          <span className="dls-dropdown__chevron" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </button>

        <div
          id={listboxId}
          className="dls-dropdown__listbox"
          role="listbox"
          aria-label={label || 'Options'}
        >
          {options.map((opt, i) => {
            const avatarSlot = opt.avatarSrc || opt.avatarInitials ? (
              <Avatar
                size="20"
                circle
                src={opt.avatarSrc}
                initials={opt.avatarInitials || '?'}
              />
            ) : undefined;
            return (
              <ListItem
                key={opt.value}
                type="with-slots"
                role="option"
                aria-selected={opt.value === value}
                selected={opt.value === value}
                data-highlighted={i === highlightedIdx || undefined}
                iconStart={opt.icon}
                slotLeft={avatarSlot}
                text={opt.label}
                onClick={() => select(opt)}
                onMouseEnter={() => setHighlightedIdx(i)}
              />
            );
          })}
          {options.length === 0 && (
            <ListItem type="empty-state" text="No options" />
          )}
        </div>

        {(hint || hasError) && (
          <div id={hintId} className="dls-dropdown__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-dropdown__hint-icon" aria-hidden="true">
                <TriangleAlertIcon />
              </span>
            )}
            <span>{error || hint}</span>
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
