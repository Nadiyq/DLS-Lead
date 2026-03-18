import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownExport } from './DropdownExport';
import type { ExportScope, ExportFormat } from './DropdownExport';
import { Button } from '../Button';

const meta = {
  title: 'Components/DropdownExport',
  component: DropdownExport,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownExport>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    scope: 'all',
    format: 'excel',
  },
};

// ---------------------------------------------------------------------------
// Default state (matching Figma)
// ---------------------------------------------------------------------------

export const DefaultState: Story = {
  args: {
    scope: 'all',
    format: 'excel',
  },
};

// ---------------------------------------------------------------------------
// Visible columns + CSV
// ---------------------------------------------------------------------------

export const VisibleCsv: Story = {
  args: {
    scope: 'visible',
    format: 'csv',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    scope: 'all',
    format: 'excel',
  },
  render: () => {
    const [scope, setScope] = React.useState<ExportScope>('all');
    const [format, setFormat] = React.useState<ExportFormat>('excel');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <DropdownExport
          scope={scope}
          format={format}
          onScopeChange={setScope}
          onFormatChange={setFormat}
        />
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
          textAlign: 'center',
        }}>
          Scope: <strong>{scope}</strong> | Format: <strong>{format}</strong>
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// In context — triggered from button
// ---------------------------------------------------------------------------

export const InContext: Story = {
  args: {
    scope: 'all',
    format: 'excel',
  },
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Button variant="soft" intent="neutral" size="m" onClick={() => setOpen(v => !v)}>
          {open ? 'Close' : 'Export'}
        </Button>
        {open && <DropdownExport />}
      </div>
    );
  },
};
