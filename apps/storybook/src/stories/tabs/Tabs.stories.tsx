import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { House as HomeIcon, Settings as SettingsIcon } from 'lucide-react';
import { Tabs } from './Tabs';
import { Section } from '../_helpers/StoryLayout';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
];

const iconItems = [
  { value: 'home', label: 'Home', icon: <HomeIcon /> },
  { value: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  { value: 'profile', label: 'Profile' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    items: defaultItems,
    value: 'tab1',
    type: 'pill',
  },
};

// ---------------------------------------------------------------------------
// Both types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {
    items: defaultItems,
    value: 'tab1',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section layout="flat" size="s" title="Pill">
        <Tabs items={defaultItems} value="tab2" type="pill" />
      </Section>
      <Section layout="flat" size="s" title="Folder">
        <Tabs items={defaultItems} value="tab2" type="folder" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: {
    items: iconItems,
    value: 'home',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section layout="flat" size="s" title="Pill with icons">
        <Tabs items={iconItems} value="home" type="pill" />
      </Section>
      <Section layout="flat" size="s" title="Folder with icons">
        <Tabs items={iconItems} value="home" type="folder" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With disabled tab
// ---------------------------------------------------------------------------

export const WithDisabledTab: Story = {
  args: {
    items: [
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2', disabled: true },
      { value: 'tab3', label: 'Tab 3' },
    ],
    value: 'tab1',
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    items: defaultItems,
    value: 'tab1',
  },
  render: () => {
    const [pillValue, setPillValue] = React.useState('tab1');
    const [folderValue, setFolderValue] = React.useState('tab1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Section layout="flat" size="s" title="Pill (interactive)">
          <Tabs items={defaultItems} value={pillValue} onChange={setPillValue} type="pill" />
          <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
            Selected: {pillValue}
          </span>
        </Section>
        <Section layout="flat" size="s" title="Folder (interactive)">
          <Tabs items={defaultItems} value={folderValue} onChange={setFolderValue} type="folder" />
          <span style={{ fontFamily: 'var(--dls-font-family)', fontSize: 13, color: 'var(--dls-color-text-secondary)' }}>
            Selected: {folderValue}
          </span>
        </Section>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Many tabs
// ---------------------------------------------------------------------------

export const ManyTabs: Story = {
  args: {
    items: defaultItems,
    value: 'tab1',
  },
  render: () => {
    const manyItems = Array.from({ length: 6 }, (_, i) => ({
      value: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
    }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Section layout="flat" size="s" title="Pill — many tabs">
          <Tabs items={manyItems} value="tab3" type="pill" />
        </Section>
        <Section layout="flat" size="s" title="Folder — many tabs">
          <Tabs items={manyItems} value="tab3" type="folder" />
        </Section>
      </div>
    );
  },
};
