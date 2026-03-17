import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { List } from './List';
import { ListItem } from './ListItem';

const meta = {
  title: 'Components/List',
  component: List,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2H9L12 5V14H4V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 2V5H12" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: null,
  },
  render: () => (
    <List>
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" />
      <ListItem type="text" text="Option 3" />
      <ListItem type="text" text="Option 4" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With sections
// ---------------------------------------------------------------------------

export const WithSections: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="label" text="Category A" />
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" />
      <ListItem type="divider" />
      <ListItem type="label" text="Category B" />
      <ListItem type="text" text="Option 3" />
      <ListItem type="text" text="Option 4" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="with-slots" text="Document.tsx" iconStart={<FileIcon />} />
      <ListItem type="with-slots" text="README.md" iconStart={<FileIcon />} iconEnd={<CheckIcon />} />
      <ListItem type="with-slots" text="package.json" iconStart={<FileIcon />} />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// Two-line items
// ---------------------------------------------------------------------------

export const TwoLine: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="two-line-slots" text="John Doe" secondaryText="john@example.com" iconStart={<FileIcon />} />
      <ListItem type="two-line-slots" text="Jane Smith" secondaryText="jane@example.com" iconStart={<FileIcon />} />
      <ListItem type="two-line-slots" text="Bob Wilson" secondaryText="bob@example.com" iconStart={<FileIcon />} />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

export const EmptyState: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="empty-state" text="No results found" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { children: null },
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);
    const items = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <List>
          <ListItem type="label" text="Fruits" />
          {items.map(item => (
            <ListItem
              key={item}
              type="with-slots"
              text={item}
              selected={selected === item}
              iconEnd={selected === item ? <CheckIcon /> : undefined}
              onClick={() => setSelected(item)}
            />
          ))}
        </List>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          {selected ? `Selected: ${selected}` : 'Click to select'}
        </span>
      </div>
    );
  },
};
