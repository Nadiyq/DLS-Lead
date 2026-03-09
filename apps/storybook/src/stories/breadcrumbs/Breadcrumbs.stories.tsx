import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Breadcrumbs, Slash, type BreadcrumbItem } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Category', href: '#' },
  { type: 'current', label: 'Current Page' },
];

export const Default: Story = {
  args: { items: defaultItems },
};

// ---------------------------------------------------------------------------
// With dropdown
// ---------------------------------------------------------------------------

const dropdownItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { type: 'dropdown', label: 'Products', href: '#' },
  { label: 'Category', href: '#' },
  { type: 'current', label: 'Current Page' },
];

export const WithDropdown: Story = {
  args: { items: dropdownItems },
};

// ---------------------------------------------------------------------------
// With collapsed (more)
// ---------------------------------------------------------------------------

const collapsedItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { type: 'more', onClick: () => alert('Show hidden items') },
  { type: 'dropdown', label: 'Products', href: '#' },
  { label: 'Category', href: '#' },
  { label: 'Subcategory', href: '#' },
  { type: 'current', label: 'Current Page' },
];

export const WithCollapsed: Story = {
  args: { items: collapsedItems },
};

// ---------------------------------------------------------------------------
// Full example (matches Figma assembly)
// ---------------------------------------------------------------------------

const fullItems: BreadcrumbItem[] = [
  { label: 'Breadcrumb', href: '#' },
  { type: 'more', onClick: () => alert('Show hidden items') },
  { type: 'dropdown', label: 'Breadcrumb', href: '#' },
  { label: 'Breadcrumb', href: '#' },
  { label: 'Breadcrumb', href: '#' },
  { type: 'current', label: 'Breadcrumb' },
];

export const FullExample: Story = {
  args: { items: fullItems },
};

// ---------------------------------------------------------------------------
// Custom separator (slash) — matches Figma instance swap
// ---------------------------------------------------------------------------

export const SlashSeparator: Story = {
  args: {
    items: defaultItems,
    separator: <Slash />,
  },
};

// ---------------------------------------------------------------------------
// Text separator
// ---------------------------------------------------------------------------

export const TextSeparator: Story = {
  args: {
    items: defaultItems,
    separator: <span style={{ color: 'var(--dls-color-text-secondary)', fontSize: 'var(--dls-text-m-font-size)' }}>/</span>,
  },
};

// ---------------------------------------------------------------------------
// All item types
// ---------------------------------------------------------------------------

export const AllItemTypes: Story = {
  args: { items: defaultItems },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Simple path">
        <Breadcrumbs items={[
          { label: 'Home', href: '#' },
          { label: 'Settings', href: '#' },
          { type: 'current', label: 'Profile' },
        ]} />
      </Section>
      <Section title="With more (collapsed)">
        <Breadcrumbs items={[
          { label: 'Home', href: '#' },
          { type: 'more' },
          { label: 'Settings', href: '#' },
          { type: 'current', label: 'Profile' },
        ]} />
      </Section>
      <Section title="With dropdown">
        <Breadcrumbs items={[
          { label: 'Home', href: '#' },
          { type: 'dropdown', label: 'Workspace', href: '#' },
          { type: 'current', label: 'Dashboard' },
        ]} />
      </Section>
      <Section title="Two items only">
        <Breadcrumbs items={[
          { label: 'Home', href: '#' },
          { type: 'current', label: 'Page' },
        ]} />
      </Section>
      <Section title="Custom separator (slash)">
        <Breadcrumbs separator={<Slash />} items={[
          { label: 'Home', href: '#' },
          { label: 'Products', href: '#' },
          { type: 'current', label: 'Detail' },
        ]} />
      </Section>
    </div>
  ),
};
