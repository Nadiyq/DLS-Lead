import React, { useState, useId } from 'react';
import './dropdown-export.css';
import { ListItem } from '../list-item/ListItem';
import { Radiobutton } from '../radiobutton/Radiobutton';
import { Button } from '../Button';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ExportScope = 'all' | 'visible';
export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface DropdownExportProps {
  /** Currently selected scope */
  scope?: ExportScope;
  /** Currently selected format */
  format?: ExportFormat;
  /** Called when scope changes */
  onScopeChange?: (scope: ExportScope) => void;
  /** Called when format changes */
  onFormatChange?: (format: ExportFormat) => void;
  /** Called when user clicks Export */
  onExport?: (scope: ExportScope, format: ExportFormat) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Data
   --------------------------------------------------------------------------- */

const scopeOptions: { value: ExportScope; label: string }[] = [
  { value: 'all', label: 'All columns' },
  { value: 'visible', label: 'Only visible columns' },
];

const formatOptions: { value: ExportFormat; label: string }[] = [
  { value: 'csv', label: 'CSV' },
  { value: 'excel', label: 'Excel' },
  { value: 'pdf', label: 'PDF' },
];

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const DropdownExport = React.forwardRef<HTMLDivElement, DropdownExportProps>(
  (
    {
      scope: scopeProp = 'all',
      format: formatProp = 'excel',
      onScopeChange,
      onFormatChange,
      onExport,
      className,
    },
    ref,
  ) => {
    const [scope, setScope] = useState<ExportScope>(scopeProp);
    const [format, setFormat] = useState<ExportFormat>(formatProp);
    // Unique per-instance ID so radios don't collide with other DropdownExport
    // instances rendered on the same page (e.g. Storybook Docs).
    const groupId = useId();

    const handleScope = (value: ExportScope) => {
      setScope(value);
      onScopeChange?.(value);
    };

    const handleFormat = (value: ExportFormat) => {
      setFormat(value);
      onFormatChange?.(value);
    };

    return (
      <div
        ref={ref}
        className={['dls-dropdown-export', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-label="Export settings"
      >
        {/* Scope section */}
        <ListItem type="label" text="Export" />

        {scopeOptions.map((opt) => (
          <ListItem
            key={opt.value}
            type="with-slots"
            interactive={false}
            selected={scope === opt.value}
            slotLeft={
              <Radiobutton
                label={opt.label}
                checked={scope === opt.value}
                onChange={() => handleScope(opt.value)}
                name={`export-scope-${groupId}`}
                value={opt.value}
              />
            }
          />
        ))}

        <ListItem type="divider" />

        {/* Format section */}
        <ListItem type="label" text="Format" />

        {formatOptions.map((opt) => (
          <ListItem
            key={opt.value}
            type="with-slots"
            interactive={false}
            selected={format === opt.value}
            slotLeft={
              <Radiobutton
                label={opt.label}
                checked={format === opt.value}
                onChange={() => handleFormat(opt.value)}
                name={`export-format-${groupId}`}
                value={opt.value}
              />
            }
          />
        ))}

        <ListItem type="buttons">
          <Button
            variant="outline"
            intent="neutral"
            size="m"
            onClick={() => onExport?.(scope, format)}
          >
            Export
          </Button>
        </ListItem>
      </div>
    );
  },
);

DropdownExport.displayName = 'DropdownExport';
