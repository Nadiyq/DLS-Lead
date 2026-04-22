import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Columns3 as Columns3Icon,
  Filter as FilterIcon,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import { DropdownOptions } from './DropdownOptions';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';
import { DropdownColumns } from '../dropdown-columns/DropdownColumns';
import { DropdownFilters } from '../dropdown-filters/DropdownFilters';
import { DropdownExport } from '../dropdown-export/DropdownExport';

const meta = {
  title: 'Components/DropdownOptions',
  component: DropdownOptions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 420, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — matches Figma 6122-16148
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
          iconStart={<Columns3Icon />}
          iconEnd={<ChevronRightIcon />}
        />
        <ListItem
          type="with-slots"
          text="Filters"
          iconStart={<FilterIcon />}
          iconEnd={<ChevronRightIcon />}
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
// WithSubMenus — clicking a row swaps the panel for the sub-dropdown
//   Columns → DropdownColumns
//   Filters → DropdownFilters
//   Export  → DropdownExport
// ---------------------------------------------------------------------------

type SubMenu = 'root' | 'columns' | 'filters' | 'export';

const filterOptions = [
  { id: 'status', label: 'Status' },
  { id: 'role', label: 'Role' },
  { id: 'date', label: 'Date' },
  { id: 'department', label: 'Department' },
];

const initialShown = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email', pinned: true },
  { id: 'role', label: 'Role' },
];

const initialHidden = [
  { id: 'phone', label: 'Phone' },
  { id: 'department', label: 'Department' },
];

export const WithSubMenus: Story = {
  args: {
    align: 'end',
    side: 'bottom',
    children: <List><ListItem type="text" text="Option" /></List>,
  },
  render: () => {
    const [menu, setMenu] = React.useState<SubMenu>('root');

    const rootMenu = (
      <List>
        <ListItem type="label" text="Customize" />
        <ListItem
          type="with-slots"
          text="Columns"
          iconStart={<Columns3Icon />}
          iconEnd={<ChevronRightIcon />}
          onClick={() => setMenu('columns')}
        />
        <ListItem
          type="with-slots"
          text="Filters"
          iconStart={<FilterIcon />}
          iconEnd={<ChevronRightIcon />}
          onClick={() => setMenu('filters')}
        />
        <ListItem type="divider" />
        <ListItem
          type="with-slots"
          text="Export"
          iconStart={<DownloadIcon />}
          iconEnd={<ChevronRightIcon />}
          onClick={() => setMenu('export')}
        />
      </List>
    );

    let submenu: React.ReactNode = null;
    if (menu === 'columns') {
      submenu = (
        <DropdownColumns
          shown={initialShown}
          hidden={initialHidden}
          onApply={() => setMenu('root')}
          onCancel={() => setMenu('root')}
        />
      );
    } else if (menu === 'filters') {
      submenu = (
        <DropdownFilters
          options={filterOptions}
          onSelect={() => setMenu('root')}
        />
      );
    } else if (menu === 'export') {
      submenu = <DropdownExport />;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <DropdownOptions align="end" side="bottom">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dls-spacing-2)' }}>
            {rootMenu}
            {submenu}
          </div>
        </DropdownOptions>
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
        }}>
          Current menu: {menu}
        </p>
      </div>
    );
  },
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
