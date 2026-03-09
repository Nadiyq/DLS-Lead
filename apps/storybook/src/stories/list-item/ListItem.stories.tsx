import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ListItem } from './ListItem';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 280, background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

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

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Badge = ({ label }: { label: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', padding: '0 6px',
    height: 18, borderRadius: 9, fontSize: 11, fontWeight: 600,
    background: 'var(--dls-color-intent-info-subtle)', color: 'var(--dls-color-intent-info-text)',
    fontFamily: 'var(--dls-font-family)',
  }}>
    {label}
  </span>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'text',
    text: 'List item',
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {
    text: 'Text',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <Section title="Text">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="text" text="Option 1" />
          <ListItem type="text" text="Option 2" />
          <ListItem type="text" text="Option 3" />
        </div>
      </Section>

      <Section title="Label">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="label" text="Category" />
          <ListItem type="text" text="Option 1" />
          <ListItem type="text" text="Option 2" />
        </div>
      </Section>

      <Section title="With slots">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="with-slots" text="File.tsx" iconStart={<FileIcon />} />
          <ListItem type="with-slots" text="Selected" iconStart={<FileIcon />} iconEnd={<CheckIcon />} />
          <ListItem type="with-slots" text="With badge" iconStart={<FileIcon />} slotRight={<Badge label="New" />} />
        </div>
      </Section>

      <Section title="Two-line">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="two-line" text="Primary text" secondaryText="Secondary text" />
          <ListItem type="two-line" text="Another item" secondaryText="Description here" />
        </div>
      </Section>

      <Section title="Two-line with slots">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="two-line-slots" text="Primary text" secondaryText="Secondary text" iconStart={<FileIcon />} iconEnd={<ChevronRight />} />
          <ListItem type="two-line-slots" text="Another item" secondaryText="Description" iconStart={<FileIcon />} slotRight={<Badge label="3" />} />
        </div>
      </Section>

      <Section title="Empty state">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="empty-state" text="No results found" />
        </div>
      </Section>

      <Section title="With divider">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="text" text="Option 1" />
          <ListItem type="text" text="Option 2" />
          <ListItem type="divider" />
          <ListItem type="text" text="Option 3" />
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    text: 'Click me',
  },
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);
    const items = ['Apple', 'Banana', 'Cherry', 'Dragonfruit'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="label" text="Fruits" />
          {items.map(item => (
            <ListItem
              key={item}
              type="with-slots"
              text={item}
              iconEnd={selected === item ? <CheckIcon /> : undefined}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
        <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
          {selected ? `Selected: ${selected}` : 'Click to select'}
        </span>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    type: 'text',
    text: 'Disabled item',
    disabled: true,
  },
};
