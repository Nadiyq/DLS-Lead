import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DropdownOptions } from './DropdownOptions';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

const meta = {
  title: 'Components/DropdownOptions',
  component: DropdownOptions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const ColumnsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.33" />
    <rect x="10" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    align: 'end',
    side: 'bottom',
    triggerLabel: 'Options',
    children: (
      <List>
        <ListItem type="label" text="Customize" />
        <ListItem
          type="with-slots"
          text="Columns"
          iconStart={<ColumnsIcon />}
          iconEnd={<CheckIcon />}
        />
        <ListItem
          type="with-slots"
          text="Filter"
          iconStart={<FilterIcon />}
          iconEnd={<CheckIcon />}
        />
        <ListItem type="divider" />
        <ListItem
          type="with-slots"
          text="Export"
          iconStart={<DownloadIcon />}
          iconEnd={<ChevronRightIcon />}
        />
      </List>
    ),
  },
};

// ---------------------------------------------------------------------------
// Table toolbar example (matching Figma)
// ---------------------------------------------------------------------------

export const TableToolbarExample: Story = {
  args: {
    align: 'end',
    children: <List><ListItem type="text" text="Option" /></List>,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{
        margin: 0, fontSize: 'var(--dls-text-s-font-size)',
        fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
      }}>
        Click the kebab button to open the options menu
      </p>
      <DropdownOptions align="end" side="bottom">
        <List>
          <ListItem type="label" text="Customize" />
          <ListItem
            type="with-slots"
            text="Columns"
            iconStart={<ColumnsIcon />}
            iconEnd={<CheckIcon />}
            onClick={() => alert('Columns toggled')}
          />
          <ListItem
            type="with-slots"
            text="Filter"
            iconStart={<FilterIcon />}
            iconEnd={<CheckIcon />}
            onClick={() => alert('Filter toggled')}
          />
          <ListItem type="divider" />
          <ListItem
            type="with-slots"
            text="Export"
            iconStart={<DownloadIcon />}
            iconEnd={<ChevronRightIcon />}
            onClick={() => alert('Export clicked')}
          />
        </List>
      </DropdownOptions>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Alignment variants
// ---------------------------------------------------------------------------

export const AlignStart: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    children: (
      <List>
        <ListItem type="text" text="Option A" onClick={() => {}} />
        <ListItem type="text" text="Option B" onClick={() => {}} />
        <ListItem type="text" text="Option C" onClick={() => {}} />
      </List>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    align: 'end',
    side: 'bottom',
    children: (
      <List>
        <ListItem type="text" text="Option A" onClick={() => {}} />
        <ListItem type="text" text="Option B" onClick={() => {}} />
        <ListItem type="text" text="Option C" onClick={() => {}} />
      </List>
    ),
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <List>
        <ListItem type="text" text="Option" />
      </List>
    ),
  },
};

// ---------------------------------------------------------------------------
// Interactive — with state
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    align: 'end',
    children: <List><ListItem type="text" text="Option" /></List>,
  },
  render: () => {
    const [columnsVisible, setColumnsVisible] = React.useState(true);
    const [filterVisible, setFilterVisible] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <DropdownOptions align="end" side="bottom">
          <List>
            <ListItem type="label" text="Customize" />
            <ListItem
              type="with-slots"
              text="Columns"
              iconStart={<ColumnsIcon />}
              iconEnd={columnsVisible ? <CheckIcon /> : undefined}
              onClick={() => setColumnsVisible(v => !v)}
            />
            <ListItem
              type="with-slots"
              text="Filter"
              iconStart={<FilterIcon />}
              iconEnd={filterVisible ? <CheckIcon /> : undefined}
              onClick={() => setFilterVisible(v => !v)}
            />
            <ListItem type="divider" />
            <ListItem
              type="with-slots"
              text="Export"
              iconStart={<DownloadIcon />}
              iconEnd={<ChevronRightIcon />}
            />
          </List>
        </DropdownOptions>
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
        }}>
          Columns: {columnsVisible ? 'visible' : 'hidden'} | Filter: {filterVisible ? 'visible' : 'hidden'}
        </p>
      </div>
    );
  },
};
