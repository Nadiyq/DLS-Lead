import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown as ChevronDownIcon,
  X as XIcon,
  TriangleAlert as TriangleAlertIcon,
} from 'lucide-react';
import './dropdown-autocomplete.css';
import { ListItem } from '../list-item/ListItem';
import { Avatar } from '../Avatar';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface DropdownAutocompleteOption {
  value: string;
  label: string;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** Avatar image URL */
  avatarSrc?: string;
  /** Avatar initials fallback */
  avatarInitials?: string;
}

export interface DropdownAutocompleteProps {
  /** Available options */
  options: DropdownAutocompleteOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string | undefined) => void;
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

export const DropdownAutocomplete = React.forwardRef<HTMLDivElement, DropdownAutocompleteProps>(
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
    const [search, setSearch] = useState('');
    const [highlightedIdx, setHighlightedIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const reactId = React.useId();
    const triggerId = id || reactId;
    const listboxId = `${triggerId}-listbox`;

    const hasError = !!error;
    const selected = options.find((o) => o.value === value);
    const hasLeading = !!(leadingIcon || selected?.icon || selected?.avatarSrc || selected?.avatarInitials);

    const filtered = search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

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
      requestAnimationFrame(() => inputRef.current?.focus());
    };

    const close = () => {
      setIsOpen(false);
      setSearch('');
    };

    const select = (opt: DropdownAutocompleteOption) => {
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

    const renderLeading = (opt?: DropdownAutocompleteOption) => {
      if (opt?.icon) {
        return <span className="dls-dropdown-autocomplete__leading dls-dropdown-autocomplete__leading-icon">{opt.icon}</span>;
      }
      if (opt?.avatarSrc || opt?.avatarInitials) {
        return (
          <span className="dls-dropdown-autocomplete__leading">
            <Avatar
              size="20"
              src={opt.avatarSrc}
              initials={opt.avatarInitials || '?'}
            />
          </span>
        );
      }
      if (leadingIcon && !opt) {
        return <span className="dls-dropdown-autocomplete__leading dls-dropdown-autocomplete__leading-icon">{leadingIcon}</span>;
      }
      return null;
    };

    const showClear = !disabled && (!!selected || (isOpen && !!search));

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-dropdown-autocomplete', className].filter(Boolean).join(' ')}
        data-open={isOpen || undefined}
        onKeyDown={handleKeyDown}
      >
        {label && (
          <label
            className="dls-dropdown-autocomplete__label"
            htmlFor={triggerId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div
          className="dls-dropdown-autocomplete__trigger"
          data-disabled={disabled || undefined}
          data-error={hasError || undefined}
          data-has-leading={hasLeading || undefined}
          onClick={() => {
            if (disabled) return;
            if (!isOpen) open();
            inputRef.current?.focus();
          }}
        >
          {renderLeading(selected) || renderLeading()}

          <input
            ref={inputRef}
            id={triggerId}
            type="text"
            className="dls-dropdown-autocomplete__input"
            disabled={disabled}
            value={isOpen ? search : selected?.label ?? ''}
            placeholder={selected ? selected.label : placeholder}
            onChange={(e) => { setSearch(e.target.value); setHighlightedIdx(0); if (!isOpen) setIsOpen(true); }}
            onFocus={() => !isOpen && open()}
            aria-autocomplete="list"
            aria-controls={isOpen ? listboxId : undefined}
            aria-expanded={isOpen}
            role="combobox"
          />

          {showClear && (
            <button
              type="button"
              className="dls-dropdown-autocomplete__clear"
              onClick={clear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <XIcon />
            </button>
          )}

          <span className="dls-dropdown-autocomplete__chevron" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </div>

        <div
          id={listboxId}
          className="dls-dropdown-autocomplete__listbox"
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
          <div className="dls-dropdown-autocomplete__hint" data-error={hasError || undefined}>
            {hasError && (
              <span className="dls-dropdown-autocomplete__hint-icon" aria-hidden="true">
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

DropdownAutocomplete.displayName = 'DropdownAutocomplete';
