import React from 'react';
import './tabs.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TabType = 'pill' | 'folder';

export interface TabItem {
  /** Unique key */
  value: string;
  /** Tab label */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Optional trailing slot content */
  slotContent?: React.ReactNode;
  /** Disabled */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Currently selected tab value */
  value?: string;
  /** Called when a tab is selected */
  onChange?: (value: string) => void;
  /** Visual type */
  type?: TabType;
  /** Additional class name for the root tablist. */
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      onChange,
      type = 'pill',
      className,
    },
    ref,
  ) => {
    const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
    const selectedItem =
      items.find((item) => item.value === value && !item.disabled) ??
      items.find((item) => !item.disabled);
    const selectedValue = selectedItem?.value;

    const selectItem = (item: TabItem) => {
      if (item.disabled) return;
      onChange?.(item.value);
      buttonRefs.current[item.value]?.focus();
    };

    const focusByOffset = (currentIndex: number, offset: number) => {
      const enabled = items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !item.disabled);

      const enabledIndex = enabled.findIndex(({ index }) => index === currentIndex);
      if (enabledIndex === -1) return;

      const next = enabled[(enabledIndex + offset + enabled.length) % enabled.length]?.item;
      if (next) selectItem(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          focusByOffset(index, -1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          focusByOffset(index, 1);
          break;
        case 'Home': {
          event.preventDefault();
          const first = items.find((item) => !item.disabled);
          if (first) selectItem(first);
          break;
        }
        case 'End': {
          event.preventDefault();
          const last = [...items].reverse().find((item) => !item.disabled);
          if (last) selectItem(last);
          break;
        }
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={['dls-tab-group', className].filter(Boolean).join(' ')}
        data-type={type}
        role="tablist"
      >
        {items.map((item, index) => {
          const selected = selectedValue === item.value;
          return (
            <button
              key={item.value}
              ref={(node) => {
                buttonRefs.current[item.value] = node;
              }}
              type="button"
              className="dls-tab-item"
              role="tab"
              aria-selected={selected}
              aria-disabled={item.disabled || undefined}
              data-selected={selected || undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectItem(item)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.icon && (
                <span className="dls-tab-item__icon">{item.icon}</span>
              )}
              {item.label}
              {item.slotContent}
            </button>
          );
        })}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
