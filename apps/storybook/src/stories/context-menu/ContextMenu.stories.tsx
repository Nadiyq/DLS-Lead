import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuLabel,
  ContextMenuSubmenu,
} from './ContextMenu';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14.5 14.5L9.5 5M9.5 14.5L14.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PasteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 4H14C14.5523 4 15 4.44772 15 5V7H9V5C9 4.44772 9.44772 4 10 4Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7H19M10 11V17M14 11V17M6 7L7 19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19L18 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpeechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C7.02944 3 3 6.58172 3 11C3 13.2091 4.05 15.1873 5.73726 16.5636L4 21L8.5 18.5C9.6 18.83 10.78 19 12 19C16.9706 19 21 15.4183 21 11C21 6.58172 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5 4 16.7 5.2 18 7L20 5V11H14L16.5 8.5C15.5 7 13.8 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C14.4 18 16.4 16.6 17.4 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: null as unknown as React.ReactNode,
  },
  render: () => (
    <ContextMenu>
      <ContextMenuItem icon={<CutIcon />} label="Cut" shortcut={['Ctrl', 'X']} />
      <ContextMenuItem icon={<CopyIcon />} label="Copy" shortcut={['Ctrl', 'C']} />
      <ContextMenuItem icon={<PasteIcon />} label="Paste" shortcut={['Ctrl', 'V']} />
      <ContextMenuDivider />
      <ContextMenuItem icon={<TrashIcon />} label="Delete" shortcut={['Del']} />
    </ContextMenu>
  ),
};

// ---------------------------------------------------------------------------
// With section labels
// ---------------------------------------------------------------------------

export const WithSectionLabels: Story = {
  args: { children: null as unknown as React.ReactNode },
  render: () => (
    <ContextMenu>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuItem icon={<CutIcon />} label="Cut" shortcut={['Ctrl', 'X']} />
      <ContextMenuItem icon={<CopyIcon />} label="Copy" shortcut={['Ctrl', 'C']} />
      <ContextMenuItem icon={<PasteIcon />} label="Paste" shortcut={['Ctrl', 'V']} />
      <ContextMenuDivider />
      <ContextMenuLabel>Danger Zone</ContextMenuLabel>
      <ContextMenuItem icon={<TrashIcon />} label="Delete" shortcut={['Del']} />
    </ContextMenu>
  ),
};

// ---------------------------------------------------------------------------
// With submenu
// ---------------------------------------------------------------------------

export const WithSubmenu: Story = {
  args: { children: null as unknown as React.ReactNode },
  render: () => (
    <div style={{ padding: 100 }}>
      <ContextMenu>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem icon={<CopyIcon />} label="Copy" shortcut={['Ctrl', 'C']} />
        <ContextMenuItem icon={<PasteIcon />} label="Paste" shortcut={['Ctrl', 'V']} />
        <ContextMenuDivider />
        <ContextMenuSubmenu icon={<SpeechIcon />} label="Speech">
          <ContextMenuItem label="Start speaking" />
          <ContextMenuItem label="Stop speaking" />
        </ContextMenuSubmenu>
        <ContextMenuDivider />
        <ContextMenuItem icon={<RefreshIcon />} label="Reload" shortcut={['Ctrl', 'R']} />
      </ContextMenu>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With disabled items
// ---------------------------------------------------------------------------

export const WithDisabledItems: Story = {
  args: { children: null as unknown as React.ReactNode },
  render: () => (
    <ContextMenu>
      <ContextMenuItem icon={<CutIcon />} label="Cut" shortcut={['Ctrl', 'X']} />
      <ContextMenuItem icon={<CopyIcon />} label="Copy" shortcut={['Ctrl', 'C']} disabled />
      <ContextMenuItem icon={<PasteIcon />} label="Paste" shortcut={['Ctrl', 'V']} disabled />
      <ContextMenuDivider />
      <ContextMenuSubmenu label="Speech" disabled>
        <ContextMenuItem label="Start speaking" />
      </ContextMenuSubmenu>
      <ContextMenuDivider />
      <ContextMenuItem icon={<TrashIcon />} label="Delete" shortcut={['Del']} />
    </ContextMenu>
  ),
};

// ---------------------------------------------------------------------------
// Minimal (no icons, no shortcuts)
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: { children: null as unknown as React.ReactNode },
  render: () => (
    <ContextMenu>
      <ContextMenuItem label="Undo" />
      <ContextMenuItem label="Redo" />
      <ContextMenuDivider />
      <ContextMenuItem label="Select all" />
    </ContextMenu>
  ),
};
