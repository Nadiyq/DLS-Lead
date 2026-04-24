import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import { ChipRegular } from '../chip/ChipRegular';
import { ListItem } from '../list-item/ListItem';
import { Avatar } from '../Avatar';
import './chip-input.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ChipInputOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  avatarSrc?: string;
  avatarInitials?: string;
}

export interface ChipInputProps {
  /** Available options — when provided, behaves as multi-select autocomplete */
  options?: ChipInputOption[];
  /** Currently selected values (option values when using options, or free-text strings) */
  values?: string[];
  /** Callback when selection changes */
  onValuesChange?: (values: string[]) => void;
  /** Allow creating values not in options list (via Enter key) */
  allowFreeText?: boolean;
  /** Label text */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Error message */
  error?: string;
  /** Placeholder when empty */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ChipInput = React.forwardRef<HTMLInputElement, ChipInputProps>(
  (
    {
      options,
      values = [],
      onValuesChange,
      allowFreeText,
      label,
      hint,
      error,
      placeholder = 'Type...',
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const reactId = React.useId();
    const inputId = id || reactId;
    const listboxId = `${inputId}-listbox`;

    const hasError = !!error;
    const hasOptions = !!options && options.length > 0;
    const hasChips = values.length > 0;
    const canFreeText = allowFreeText ?? !hasOptions;

    const filtered = useMemo(() => {
      if (!hasOptions) return [];
      const q = search.trim().toLowerCase();
      const base = q
        ? options!.filter((o) => o.label.toLowerCase().includes(q))
        : options!;
      return base.filter((o) => !values.includes(o.value));
    }, [hasOptions, options, search, values]);

    const showListbox = hasOptions && isOpen && !disabled;

    const setRef = (node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

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

    const addValue = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || values.includes(trimmed)) return;
      onValuesChange?.([...values, trimmed]);
    };

    const removeValue = (index: number) => {
      onValuesChange?.(values.filter((_, i) => i !== index));
    };

    const selectOption = (opt: ChipInputOption) => {
      addValue(opt.value);
      setSearch('');
      setHighlightedIdx(-1);
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
        return;
      }
      if (e.key === 'ArrowDown' && hasOptions) {
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setHighlightedIdx((i) => Math.min(i + 1, filtered.length - 1));
        return;
      }
      if (e.key === 'ArrowUp' && hasOptions) {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter') {
        if (showListbox && highlightedIdx >= 0 && filtered[highlightedIdx]) {
          e.preventDefault();
          selectOption(filtered[highlightedIdx]);
          return;
        }
        if (canFreeText && search.trim()) {
          e.preventDefault();
          addValue(search);
          setSearch('');
        }
        return;
      }
      if (e.key === 'Backspace' && !search && hasChips) {
        removeValue(values.length - 1);
      }
    };

    const handleBoxClick = () => {
      if (disabled) return;
      inputRef.current?.focus();
      if (hasOptions) setIsOpen(true);
    };

    const getOption = (value: string): ChipInputOption | undefined => {
      if (!hasOptions) return undefined;
      return options!.find((o) => o.value === value);
    };

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={['dls-chip-input', className].filter(Boolean).join(' ')}
        data-open={showListbox || undefined}
      >
        {label && (
          <label
            className="dls-chip-input__label"
            htmlFor={inputId}
            data-disabled={disabled || undefined}
          >
            {label}
          </label>
        )}

        <div className="dls-chip-input__field">
          <div
            className="dls-chip-input__box"
            data-has-chips={hasChips || undefined}
            data-disabled={disabled || undefined}
            data-error={hasError || undefined}
            onClick={handleBoxClick}
          >
            <div className="dls-chip-input__content">
              {values.map((v, i) => {
                const opt = getOption(v);
                const chipAvatar = opt?.avatarSrc || opt?.avatarInitials
                  ? { src: opt.avatarSrc, initials: opt.avatarInitials }
                  : undefined;
                return (
                  <ChipRegular
                    key={`${v}-${i}`}
                    label={opt?.label ?? v}
                    leadingIcon={opt?.icon}
                    avatar={chipAvatar}
                    variant="outline"
                    intent="neutral"
                    size="s"
                    disabled={disabled}
                    onRemove={!disabled ? () => removeValue(i) : undefined}
                  />
                );
              })}

              <input
                ref={setRef}
                id={inputId}
                type="text"
                className="dls-chip-input__input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIdx(0);
                  if (hasOptions && !isOpen) setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (hasOptions) setIsOpen(true);
                }}
                placeholder={hasChips ? '' : placeholder}
                disabled={disabled}
                role={hasOptions ? 'combobox' : undefined}
                aria-autocomplete={hasOptions ? 'list' : undefined}
                aria-controls={showListbox ? listboxId : undefined}
                aria-expanded={hasOptions ? isOpen : undefined}
              />
            </div>
          </div>

          {hasOptions && (
            <div
              id={listboxId}
              className="dls-chip-input__listbox"
              role="listbox"
              aria-label={label || 'Options'}
              aria-multiselectable="true"
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
                    aria-selected={false}
                    data-highlighted={i === highlightedIdx || undefined}
                    iconStart={opt.icon}
                    slotLeft={avatarSlot}
                    text={opt.label}
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setHighlightedIdx(i)}
                  />
                );
              })}
              {filtered.length === 0 && (
                <ListItem type="empty-state" text="No results" />
              )}
            </div>
          )}
        </div>

        {(hint || hasError) && (
          <div
            className="dls-chip-input__hint"
            data-error={hasError || undefined}
          >
            {hasError && (
              <span className="dls-chip-input__hint-icon" aria-hidden="true">
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

ChipInput.displayName = 'ChipInput';
