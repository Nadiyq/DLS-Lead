import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { List } from './List';
import { ListItem } from './ListItem';
import { Button } from '../Button';
import { ChipRegular } from '../chip/ChipRegular';
import { SearchField } from '../search-field/SearchField';
import { Check } from 'lucide-react';

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
// With sections (matches Figma: label + divider + text items)
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
// With selected item (matches Figma pressed/selected state)
// ---------------------------------------------------------------------------

export const WithSelected: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="label" text="Label" />
      <ListItem type="divider" />
      <ListItem type="text" text="Text" />
      <ListItem type="text" text="Text" selected />
      <ListItem type="text" text="Text" />
      <ListItem type="text" text="Text" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With slots (icon, slot content left/right)
// ---------------------------------------------------------------------------

export const WithSlots: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="text" text="Text" />
      <ListItem type="with-slots" text="Text" iconStart={<Check size={16} />} selected />
      <ListItem type="text" text="Text" />
      <ListItem type="text" text="Text" />
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
      <ListItem type="two-line" text="Text" secondaryText="text" />
      <ListItem type="two-line" text="Text" secondaryText="text" />
      <ListItem type="two-line" text="Text" secondaryText="text" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// Two-line with slots (icon, slot content, etc.)
// ---------------------------------------------------------------------------

export const TwoLineWithSlots: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="two-line-slots" text="Text" secondaryText="text" iconStart={<Check size={16} />} />
      <ListItem type="two-line-slots" text="Text" secondaryText="text" iconStart={<Check size={16} />} selected />
      <ListItem type="two-line-slots" text="Text" secondaryText="text" iconStart={<Check size={16} />} />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With chips (DLS ChipRegular)
// ---------------------------------------------------------------------------

export const WithChips: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="chips">
        <ChipRegular variant="outline" label="text" chevron size="s" />
        <ChipRegular variant="outline" label="text" chevron size="s" />
        <ChipRegular variant="outline" label="text" chevron size="s" />
      </ListItem>
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" selected />
      <ListItem type="text" text="Option 3" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With search (DLS SearchField)
// ---------------------------------------------------------------------------

export const WithSearch: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="search">
        <SearchField placeholder="Search" />
      </ListItem>
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" />
      <ListItem type="text" text="Option 3" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// With buttons (DLS Button)
// ---------------------------------------------------------------------------

export const WithButtons: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" />
      <ListItem type="divider" />
      <ListItem type="buttons">
        <Button variant="outline" intent="neutral" size="m" style={{ flex: 1 }}>Cancel</Button>
        <Button variant="filled" intent="neutral" size="m" style={{ flex: 1 }}>Apply</Button>
      </ListItem>
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
      <ListItem type="empty-state" text="No results found matching your search criteria" />
    </List>
  ),
};

// ---------------------------------------------------------------------------
// Full example (all types combined)
// ---------------------------------------------------------------------------

export const FullExample: Story = {
  args: { children: null },
  render: () => (
    <List>
      <ListItem type="chips">
        <ChipRegular variant="outline" label="text" chevron size="s" />
        <ChipRegular variant="outline" label="text" chevron size="s" />
        <ChipRegular variant="outline" label="text" chevron size="s" />
      </ListItem>
      <ListItem type="search">
        <SearchField placeholder="Search" />
      </ListItem>
      <ListItem type="text" text="Option 1" />
      <ListItem type="text" text="Option 2" selected />
      <ListItem type="text" text="Option 3" />
      <ListItem type="divider" />
      <ListItem type="buttons">
        <Button variant="outline" intent="neutral" size="m" style={{ flex: 1 }}>Cancel</Button>
        <Button variant="filled" intent="neutral" size="m" style={{ flex: 1 }}>Apply</Button>
      </ListItem>
      <ListItem type="empty-state" text="No results found matching your search criteria" />
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
              iconEnd={selected === item ? <Check size={16} /> : undefined}
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
