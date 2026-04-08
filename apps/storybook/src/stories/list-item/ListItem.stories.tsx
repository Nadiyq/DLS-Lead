import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ListItem } from './ListItem';
import { Button } from '../Button';
import { ChipRegular } from '../chip/ChipRegular';
import { SearchField } from '../search-field/SearchField';
import { Badge } from '../Badge';
import { File, Check, ChevronRight } from 'lucide-react';

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
          <ListItem type="with-slots" text="File.tsx" iconStart={<File size={16} />} />
          <ListItem type="with-slots" text="Selected" iconStart={<File size={16} />} iconEnd={<Check size={16} />} />
          <ListItem type="with-slots" text="With badge" iconStart={<File size={16} />} slotRight={<Badge variant="soft" intent="info" size="xs">New</Badge>} />
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
          <ListItem type="two-line-slots" text="Primary text" secondaryText="Secondary text" iconStart={<File size={16} />} iconEnd={<ChevronRight size={16} />} />
          <ListItem type="two-line-slots" text="Another item" secondaryText="Description" iconStart={<File size={16} />} slotRight={<Badge variant="soft" intent="info" size="xs">3</Badge>} />
        </div>
      </Section>

      <Section title="Chips">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="chips">
            <ChipRegular variant="outline" label="text" chevron size="s" />
            <ChipRegular variant="outline" label="text" chevron size="s" />
            <ChipRegular variant="outline" label="text" chevron size="s" />
          </ListItem>
        </div>
      </Section>

      <Section title="Search">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="search">
            <SearchField placeholder="Search" />
          </ListItem>
        </div>
      </Section>

      <Section title="Buttons">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="buttons">
            <Button variant="outline" intent="neutral" size="m" style={{ flex: 1 }}>Cancel</Button>
            <Button variant="filled" intent="neutral" size="m" style={{ flex: 1 }}>Apply</Button>
          </ListItem>
        </div>
      </Section>

      <Section title="Empty state">
        <div style={{ background: 'var(--dls-color-surface-base)', borderRadius: 12, border: '1px solid var(--dls-color-border-subtle)', padding: 4, display: 'flex', flexDirection: 'column' }}>
          <ListItem type="empty-state" text="No results found matching your search criteria" />
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
              selected={selected === item}
              iconEnd={selected === item ? <Check size={16} /> : undefined}
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

