import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Dropdown, type DropdownOption } from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

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

const textOptions: DropdownOption[] = [
  { value: 'opt1', label: 'Option one' },
  { value: 'opt2', label: 'Option two' },
  { value: 'opt3', label: 'Option three' },
  { value: 'opt4', label: 'Fourth option' },
  { value: 'opt5', label: 'Fifth option' },
];

const avatarOptions: DropdownOption[] = [
  { value: 'alice', label: 'Alice Johnson', avatarInitials: 'AJ' },
  { value: 'bob', label: 'Bob Smith', avatarInitials: 'BS' },
  { value: 'carol', label: 'Carol Williams', avatarInitials: 'CW' },
  { value: 'dave', label: 'Dave Brown', avatarInitials: 'DB' },
];

const AtSignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.33" />
    <path d="M10.5 8V9C10.5 10.1 11.4 11 12.5 11C13.6 11 14 10.1 14 9V8A6 6 0 102 8" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const iconOptions: DropdownOption[] = [
  { value: 'email1', label: 'user@example.com', icon: <AtSignIcon /> },
  { value: 'email2', label: 'admin@example.com', icon: <AtSignIcon /> },
  { value: 'email3', label: 'support@example.com', icon: <AtSignIcon /> },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    options: textOptions,
    placeholder: 'Select',
    label: 'Label',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { options: textOptions },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <Dropdown options={textOptions} placeholder="Select" />
      </Section>
      <Section title="Filled">
        <Dropdown options={textOptions} value="opt1" />
      </Section>
      <Section title="Disabled">
        <Dropdown options={textOptions} value="opt1" disabled />
      </Section>
      <Section title="Error">
        <Dropdown options={textOptions} value="opt1" error="Please select a valid option." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With avatars
// ---------------------------------------------------------------------------

export const WithAvatars: Story = {
  args: { options: avatarOptions, label: 'Assign to', placeholder: 'Select person' },
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: {
    options: iconOptions,
    label: 'Email',
    placeholder: 'Select',
    leadingIcon: <AtSignIcon />,
  },
};

// ---------------------------------------------------------------------------
// Autocomplete
// ---------------------------------------------------------------------------

const AutocompleteTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <Dropdown
      options={textOptions}
      value={value}
      onChange={setValue}
      autocomplete
      label="Autocomplete"
      placeholder="Type to search..."
    />
  );
};

export const Autocomplete: Story = {
  args: { options: textOptions },
  render: () => <AutocompleteTemplate />,
};

// ---------------------------------------------------------------------------
// Autocomplete with avatars
// ---------------------------------------------------------------------------

const AutocompleteAvatarTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <Dropdown
      options={avatarOptions}
      value={value}
      onChange={setValue}
      autocomplete
      label="Search people"
      placeholder="Type a name..."
    />
  );
};

export const AutocompleteWithAvatars: Story = {
  args: { options: avatarOptions },
  render: () => <AutocompleteAvatarTemplate />,
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <Dropdown
      options={textOptions}
      value={value}
      onChange={setValue}
      label="Category"
      hint="Choose one option."
      placeholder="Select"
    />
  );
};

export const Interactive: Story = {
  args: { options: textOptions },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    options: textOptions,
    label: 'Category',
    hint: 'Choose the most relevant option.',
    placeholder: 'Select',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    options: textOptions,
    label: 'Category',
    value: 'opt1',
    error: 'This option is no longer available.',
  },
};
