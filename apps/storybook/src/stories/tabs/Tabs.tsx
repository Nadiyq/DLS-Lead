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
    return (
      <div
        ref={ref}
        className={['dls-tab-group', className].filter(Boolean).join(' ')}
        data-type={type}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            className="dls-tab-item"
            role="tab"
            aria-selected={value === item.value || undefined}
            data-selected={value === item.value || undefined}
            disabled={item.disabled}
            onClick={() => onChange?.(item.value)}
          >
            {item.icon && (
              <span className="dls-tab-item__icon">{item.icon}</span>
            )}
            {item.label}
            {item.slotContent}
          </button>
        ))}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
