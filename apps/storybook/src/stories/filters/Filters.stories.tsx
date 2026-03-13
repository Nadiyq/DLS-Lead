import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Filters } from './Filters';
import type { FilterGroup } from './Filters';
import { ChipFilter } from '../chip/ChipFilter';

const meta = {
  title: 'Components/Filters',
  component: Filters,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
    size: 'm',
    showAdd: true,
    groups: [
      {
        id: 'status',
        children: (
          <ChipFilter
            segments={[{ label: 'Status' }, { label: 'Active' }]}
            active
            size="m"
          />
        ),
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Selected — multiple active filter groups
// ---------------------------------------------------------------------------

export const Selected: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Size M — selected">
        <Filters
          size="m"
          groups={[
            {
              id: 'status',
              children: (
                <ChipFilter
                  segments={[{ label: 'Status' }, { label: 'Active' }]}
                  active
                  size="m"
                />
              ),
            },
            {
              id: 'role',
              children: (
                <ChipFilter
                  segments={[{ label: 'Role' }, { label: 'Admin' }]}
                  active
                  size="m"
                />
              ),
            },
            {
              id: 'date',
              children: (
                <ChipFilter
                  segments={[{ label: 'Date' }, { label: 'Last 30 days' }]}
                  active
                  size="m"
                />
              ),
            },
          ]}
        />
      </Section>
      <Section title="Size S — selected">
        <Filters
          size="s"
          groups={[
            {
              id: 'status',
              children: (
                <ChipFilter
                  segments={[{ label: 'Status' }, { label: 'Active' }]}
                  active
                  size="s"
                />
              ),
            },
            {
              id: 'role',
              children: (
                <ChipFilter
                  segments={[{ label: 'Role' }, { label: 'Admin' }]}
                  active
                  size="s"
                />
              ),
            },
          ]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Unselected — single group + add button
// ---------------------------------------------------------------------------

export const Unselected: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Size M — unselected">
        <Filters
          size="m"
          groups={[
            {
              id: 'status',
              children: (
                <ChipFilter
                  segments={[{ label: 'Status' }]}
                  size="m"
                />
              ),
            },
          ]}
        />
      </Section>
      <Section title="Size S — unselected">
        <Filters
          size="s"
          groups={[
            {
              id: 'status',
              children: (
                <ChipFilter
                  segments={[{ label: 'Status' }]}
                  size="s"
                />
              ),
            },
          ]}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive — add / remove filters
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { size: 'm', groups: [] },
  render: () => {
    const availableFilters = ['Status', 'Role', 'Date', 'Department', 'Location'];
    const [activeFilters, setActiveFilters] = React.useState<
      { id: string; label: string; value: string }[]
    >([
      { id: 'status', label: 'Status', value: 'Active' },
    ]);

    const addFilter = () => {
      const used = new Set(activeFilters.map(f => f.label));
      const next = availableFilters.find(f => !used.has(f));
      if (next) {
        setActiveFilters(prev => [
          ...prev,
          { id: next.toLowerCase(), label: next, value: 'All' },
        ]);
      }
    };

    const removeFilter = (id: string) => {
      setActiveFilters(prev => prev.filter(f => f.id !== id));
    };

    const groups: FilterGroup[] = activeFilters.map(f => ({
      id: f.id,
      children: (
        <ChipFilter
          segments={[{ label: f.label }, { label: f.value }]}
          active
          size="m"
          onClick={() => removeFilter(f.id)}
        />
      ),
    }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Section title="Click chip to remove, + to add">
          <Filters
            size="m"
            groups={groups}
            showAdd={activeFilters.length < availableFilters.length}
            onAdd={addFilter}
          />
        </Section>
        <p style={{
          margin: 0, fontSize: 'var(--dls-text-s-font-size)',
          fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)',
        }}>
          Active filters: {activeFilters.length === 0 ? 'None' : activeFilters.map(f => `${f.label}: ${f.value}`).join(', ')}
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Sizes comparison
// ---------------------------------------------------------------------------

export const SizesComparison: Story = {
  args: { size: 'm', groups: [] },
  render: () => {
    const makeGroups = (size: 'm' | 's'): FilterGroup[] => [
      {
        id: 'status',
        children: (
          <ChipFilter
            segments={[{ label: 'Status' }, { label: 'Active' }]}
            active
            size={size}
          />
        ),
      },
      {
        id: 'role',
        children: (
          <ChipFilter
            segments={[{ label: 'Role' }, { label: 'Admin' }]}
            active
            size={size}
          />
        ),
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section title="Size M (32px)">
          <Filters size="m" groups={makeGroups('m')} />
        </Section>
        <Section title="Size S (24px)">
          <Filters size="s" groups={makeGroups('s')} />
        </Section>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Without add button
// ---------------------------------------------------------------------------

export const WithoutAddButton: Story = {
  args: { size: 'm', groups: [] },
  render: () => (
    <Filters
      size="m"
      showAdd={false}
      groups={[
        {
          id: 'status',
          children: (
            <ChipFilter
              segments={[{ label: 'Status' }, { label: 'Active' }]}
              active
              size="m"
            />
          ),
        },
        {
          id: 'role',
          children: (
            <ChipFilter
              segments={[{ label: 'Role' }, { label: 'Admin' }]}
              active
              size="m"
            />
          ),
        },
      ]}
    />
  ),
};
