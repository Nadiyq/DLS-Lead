import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { AtSign as AtSignIcon } from 'lucide-react';
import {
  DropdownAutocomplete,
  type DropdownAutocompleteOption,
} from './DropdownAutocomplete';

const meta = {
  title: 'Components/DropdownAutocomplete',
  component: DropdownAutocomplete,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownAutocomplete>;

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

const textOptions: DropdownAutocompleteOption[] = [
  { value: 'opt1', label: 'Option one' },
  { value: 'opt2', label: 'Option two' },
  { value: 'opt3', label: 'Option three' },
  { value: 'opt4', label: 'Fourth option' },
  { value: 'opt5', label: 'Fifth option' },
];

const avatarOptions: DropdownAutocompleteOption[] = [
  { value: 'alice', label: 'Alice Johnson', avatarInitials: 'AJ' },
  { value: 'bob', label: 'Bob Smith', avatarInitials: 'BS' },
  { value: 'carol', label: 'Carol Williams', avatarInitials: 'CW' },
  { value: 'dave', label: 'Dave Brown', avatarInitials: 'DB' },
];

const iconOptions: DropdownAutocompleteOption[] = [
  { value: 'email1', label: 'user@example.com', icon: <AtSignIcon /> },
  { value: 'email2', label: 'admin@example.com', icon: <AtSignIcon /> },
  { value: 'email3', label: 'support@example.com', icon: <AtSignIcon /> },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

const PlaygroundTemplate = (args: React.ComponentProps<typeof DropdownAutocomplete>) => {
  const [value, setValue] = useState<string | undefined>(args.value);
  return <DropdownAutocomplete {...args} value={value} onChange={setValue} />;
};

export const Playground: Story = {
  args: {
    options: textOptions,
    placeholder: 'Select',
    label: 'Label',
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { options: textOptions },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <DropdownAutocomplete options={textOptions} placeholder="Select" />
      </Section>
      <Section title="Filled">
        <DropdownAutocomplete options={textOptions} value="opt1" />
      </Section>
      <Section title="Disabled">
        <DropdownAutocomplete options={textOptions} value="opt1" disabled />
      </Section>
      <Section title="Error">
        <DropdownAutocomplete options={textOptions} value="opt1" error="Please select a valid option." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With avatars
// ---------------------------------------------------------------------------

const AvatarTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <DropdownAutocomplete
      options={avatarOptions}
      value={value}
      onChange={setValue}
      label="Search people"
      placeholder="Type a name..."
    />
  );
};

export const WithAvatars: Story = {
  args: { options: avatarOptions },
  render: () => <AvatarTemplate />,
};

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

const IconTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <DropdownAutocomplete
      options={iconOptions}
      value={value}
      onChange={setValue}
      label="Email"
      placeholder="Select"
      leadingIcon={<AtSignIcon />}
    />
  );
};

export const WithIcons: Story = {
  args: { options: iconOptions },
  render: () => <IconTemplate />,
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <DropdownAutocomplete
      options={textOptions}
      value={value}
      onChange={setValue}
      label="Category"
      hint="Start typing to filter."
      placeholder="Search..."
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
    hint: 'Start typing to filter.',
    placeholder: 'Search...',
  },
  render: (args) => <PlaygroundTemplate {...args} />,
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
  render: (args) => <PlaygroundTemplate {...args} />,
};
