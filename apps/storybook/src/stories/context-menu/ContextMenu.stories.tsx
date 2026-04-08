import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuLabel,
  ContextMenuSubmenu,
} from './ContextMenu';
import {
  Undo2,
  Redo2,
  MessageSquare,
  Scissors,
  Copy,
  ClipboardPaste,
  Trash2,
  Play,
  Square,
} from 'lucide-react';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground (simple)
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: null as unknown as React.ReactNode,
  },
  render: () => (
    <ContextMenu>
      <ContextMenuItem label="Context menu text" shortcut={['Ctrl']} />
      <ContextMenuItem label="Context menu text" shortcut={['Ctrl']} />
      <ContextMenuItem label="Context menu text" shortcut={['Ctrl']} />
      <ContextMenuSubmenu label="Submenu">
        <ContextMenuItem label="Option 1" />
        <ContextMenuItem label="Option 2" />
      </ContextMenuSubmenu>
      <ContextMenuItem label="Context menu text" shortcut={['Ctrl']} />
    </ContextMenu>
  ),
};

// ---------------------------------------------------------------------------
// Full example (matches Figma 6594:8950)
// ---------------------------------------------------------------------------

export const FullExample: Story = {
  args: { children: null as unknown as React.ReactNode },
  render: () => (
    <div style={{ padding: 100 }}>
      <ContextMenu>
        <ContextMenuItem icon={<Undo2 size={16} />} label="Undo" shortcut={['⌘', '⇧', 'Z']} />
        <ContextMenuItem icon={<Redo2 size={16} />} label="Redo" shortcut={['⌘', '⇧', 'Z']} />
        <ContextMenuSubmenu icon={<MessageSquare size={16} />} label="Speech">
          <ContextMenuItem icon={<Play size={16} />} label="Start speaking" />
          <ContextMenuItem icon={<Square size={16} />} label="Stop speaking" />
        </ContextMenuSubmenu>
        <ContextMenuDivider />
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem icon={<Scissors size={16} />} label="Cut" />
        <ContextMenuItem icon={<Copy size={16} />} label="Copy" />
        <ContextMenuItem icon={<ClipboardPaste size={16} />} label="Paste" />
        <ContextMenuItem icon={<Trash2 size={16} />} label="Delete" />
      </ContextMenu>
    </div>
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
      <ContextMenuItem icon={<Scissors size={16} />} label="Cut" shortcut={['⌘', 'X']} />
      <ContextMenuItem icon={<Copy size={16} />} label="Copy" shortcut={['⌘', 'C']} />
      <ContextMenuItem icon={<ClipboardPaste size={16} />} label="Paste" shortcut={['⌘', 'V']} />
      <ContextMenuDivider />
      <ContextMenuLabel>Danger Zone</ContextMenuLabel>
      <ContextMenuItem icon={<Trash2 size={16} />} label="Delete" shortcut={['Del']} />
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
        <ContextMenuItem icon={<Copy size={16} />} label="Copy" shortcut={['⌘', 'C']} />
        <ContextMenuItem icon={<ClipboardPaste size={16} />} label="Paste" shortcut={['⌘', 'V']} />
        <ContextMenuDivider />
        <ContextMenuSubmenu icon={<MessageSquare size={16} />} label="Speech">
          <ContextMenuItem icon={<Play size={16} />} label="Start speaking" />
          <ContextMenuItem icon={<Square size={16} />} label="Stop speaking" />
        </ContextMenuSubmenu>
      </ContextMenu>
    </div>
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
