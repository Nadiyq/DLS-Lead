import React, { useState } from 'react';
import './dropdown-export.css';

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
      <div
        ref={ref}
        className={['dls-dropdown-export', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-label="Export settings"
      >
        {/* Scope section */}
        <div className="dls-dropdown-export__label">Export</div>

        <div role="radiogroup" aria-label="Export scope">
          {scopeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="dls-dropdown-export__option"
              role="radio"
              aria-checked={scope === opt.value}
              data-selected={scope === opt.value ? '' : undefined}
              onClick={() => handleScope(opt.value)}
            >
              <span className="dls-dropdown-export__radio">
                <span className="dls-dropdown-export__radio-dot" />
              </span>
              <span className="dls-dropdown-export__text">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="dls-dropdown-export__divider" />

        {/* Format section */}
        <div className="dls-dropdown-export__label">Format</div>

        <div role="radiogroup" aria-label="Export format">
          {formatOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="dls-dropdown-export__option"
              role="radio"
              aria-checked={format === opt.value}
              data-selected={format === opt.value ? '' : undefined}
              onClick={() => handleFormat(opt.value)}
            >
              <span className="dls-dropdown-export__radio">
                <span className="dls-dropdown-export__radio-dot" />
              </span>
              <span className="dls-dropdown-export__text">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  },
);

DropdownExport.displayName = 'DropdownExport';
