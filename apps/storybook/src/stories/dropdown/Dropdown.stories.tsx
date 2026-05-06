import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { AtSign as AtSignIcon } from 'lucide-react';
import { Dropdown, type DropdownOption } from './Dropdown';
import { Section } from '../_helpers/StoryLayout';

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
      <Section layout="flat" title="Normal (empty)">
        <Dropdown options={textOptions} placeholder="Select" />
      </Section>
      <Section layout="flat" title="Filled">
        <Dropdown options={textOptions} value="opt1" />
      </Section>
      <Section layout="flat" title="Disabled">
        <Dropdown options={textOptions} value="opt1" disabled />
      </Section>
      <Section layout="flat" title="Error">
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
