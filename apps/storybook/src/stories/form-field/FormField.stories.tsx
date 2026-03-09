import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FormField } from './FormField';
import { SlotInput } from '../slot-input/SlotInput';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

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

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    orientation: 'vertical',
    children: <SlotInput placeholder="Type..." />,
  },
};

// ---------------------------------------------------------------------------
// Vertical layout
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: {
    label: 'Label',
    children: <SlotInput placeholder="Type..." />,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Label only">
        <FormField label="Email">
          <SlotInput placeholder="you@example.com" />
        </FormField>
      </Section>
      <Section title="Label + hint">
        <FormField label="Email" hint="We will never share your email.">
          <SlotInput placeholder="you@example.com" />
        </FormField>
      </Section>
      <Section title="Label + info icon">
        <FormField label="Password" showInfo hint="Must be at least 8 characters.">
          <SlotInput placeholder="Enter password" />
        </FormField>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal layout
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  args: {
    label: 'Label',
    children: <SlotInput placeholder="Type..." />,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Label only">
        <FormField label="Email" orientation="horizontal">
          <SlotInput placeholder="you@example.com" />
        </FormField>
      </Section>
      <Section title="Label + hint">
        <FormField label="Email" hint="Required" orientation="horizontal">
          <SlotInput placeholder="you@example.com" />
        </FormField>
      </Section>
      <Section title="Label + info icon">
        <FormField label="Password" showInfo orientation="horizontal">
          <SlotInput placeholder="Enter password" />
        </FormField>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With different inputs
// ---------------------------------------------------------------------------

export const WithDifferentInputs: Story = {
  args: {
    label: 'Label',
    children: <SlotInput placeholder="Type..." />,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="With icon input">
        <FormField label="Search" hint="Find anything.">
          <SlotInput iconStart={<SearchIcon />} placeholder="Search..." />
        </FormField>
      </Section>
      <Section title="With slot input">
        <FormField label="Amount" hint="Enter value in USD.">
          <SlotInput
            placeholder="0.00"
            slotRight={
              <span style={{
                display: 'inline-flex', alignItems: 'center', padding: '0 6px',
                height: 20, borderRadius: 4, fontSize: 12, fontWeight: 600,
                background: 'var(--dls-color-surface-subtle)', color: 'var(--dls-color-text-secondary)',
              }}>USD</span>
            }
          />
        </FormField>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Email',
    hint: 'Contact email address.',
    disabled: true,
    children: <SlotInput placeholder="you@example.com" disabled />,
  },
};
