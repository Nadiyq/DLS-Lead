import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown as ChevronDownIcon,
  X as XIcon,
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
  onChange?: (value: string | undefined) => void;
  /** Enable autocomplete/search filtering */
  autocomplete?: boolean;
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
  /** Allow clearing the selection */
  clearable?: boolean;
  className?: string;
  id?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      autocomplete = false,
      placeholder = 'Select',
      label,
      hint,
      error,
      leadingIcon,
      disabled = false,
      clearable = true,
      className,
      id,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIdx, setHighlightedIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerId = id || React.useId();
    const listboxId = `${triggerId}-listbox`;

    const hasError = !!error;
    const selected = options.find((o) => o.value === value);
    const hasLeading = !!(leadingIcon || selected?.icon || selected?.avatarSrc || selected?.avatarInitials);

    const filtered = autocomplete && search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setSearch('');
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    const open = () => {
      if (disabled) return;
      setIsOpen(true);
      setHighlightedIdx(-1);
      if (autocomplete) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };

    const close = () => {
      setIsOpen(false);
      setSearch('');
    };

    const select = (opt: DropdownOption) => {
      onChange?.(opt.value);
      close();
    };

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(undefined);
      setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Enter' && isOpen && highlightedIdx >= 0) {
        e.preventDefault();
        select(filtered[highlightedIdx]);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) { open(); return; }
        setHighlightedIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(i - 1, 0));
      }
    };

    const renderLeading = (opt?: DropdownOption) => {
      if (leadingIcon && !opt) {
        return <span className="dls-dropdown__leading dls-dropdown__leading-icon">{leadingIcon}</span>;
      }
      if (opt?.icon) {
        return <span className="dls-dropdown__leading dls-dropdown__leading-icon">{opt.icon}</span>;
      }
      if (opt?.avatarSrc) {
        return (
          <span className="dls-dropdown__leading dls-dropdown__leading-avatar">
            <img src={opt.avatarSrc} alt="" />
          </span>
        );
      }
      if (opt?.avatarInitials) {
        return (
          <span className="dls-dropdown__leading dls-dropdown__leading-avatar">
            {opt.avatarInitials}
          </span>
        );
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
        >
          {renderLeading(selected) || (leadingIcon && renderLeading())}

          {autocomplete && isOpen ? (
            <input
              ref={inputRef}
              className="dls-dropdown__input"
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setHighlightedIdx(0); }}
              placeholder={selected?.label || placeholder}
              onClick={(e) => e.stopPropagation()}
              aria-autocomplete="list"
              aria-controls={listboxId}
            />
          ) : (
            <span
              className="dls-dropdown__value"
              data-placeholder={!selected || undefined}
            >
              {selected?.label || placeholder}
            </span>
          )}

          {clearable && selected && !disabled && (
            <button
              type="button"
              className="dls-dropdown__clear"
              onClick={clear}
              aria-label="Clear selection"
            >
              <XIcon />
            </button>
          )}

          <span className="dls-dropdown__chevron">
            <ChevronDownIcon />
          </span>
        </button>

        <div
          ref={listboxRef}
          id={listboxId}
          className="dls-dropdown__listbox"
          role="listbox"
          aria-label={label || 'Options'}
        >
          {filtered.map((opt, i) => {
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
          {filtered.length === 0 && (
            <ListItem type="empty-state" text="No results" />
          )}
        </div>

        {(hint || hasError) && (
          <div className="dls-dropdown__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-dropdown__hint-icon">
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
