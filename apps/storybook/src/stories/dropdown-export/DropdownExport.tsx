import React, { useState } from 'react';
import './dropdown-export.css';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { Radiobutton } from '../radiobutton/Radiobutton';

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
      className,
    },
    ref,
  ) => {
    const [scope, setScope] = useState<ExportScope>(scopeProp);
    const [format, setFormat] = useState<ExportFormat>(formatProp);

    const handleScope = (value: ExportScope) => {
      setScope(value);
      onScopeChange?.(value);
    };

    const handleFormat = (value: ExportFormat) => {
      setFormat(value);
      onFormatChange?.(value);
    };

    return (
      <List
        ref={ref}
        className={['dls-dropdown-export', className].filter(Boolean).join(' ')}
      >
        {/* Scope section */}
        <ListItem type="label" text="Export" />

        {scopeOptions.map((opt) => (
          <ListItem key={opt.value} type="with-slots">
            <Radiobutton
              label={opt.label}
              checked={scope === opt.value}
              onChange={() => handleScope(opt.value)}
              name="export-scope"
              value={opt.value}
            />
          </ListItem>
        ))}

        <ListItem type="divider" />

        {/* Format section */}
        <ListItem type="label" text="Format" />

        {formatOptions.map((opt) => (
          <ListItem key={opt.value} type="with-slots">
            <Radiobutton
              label={opt.label}
              checked={format === opt.value}
              onChange={() => handleFormat(opt.value)}
              name="export-format"
              value={opt.value}
            />
          </ListItem>
        ))}
      </List>
    );
  },
);

DropdownExport.displayName = 'DropdownExport';
