import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { ChipInput, type ChipInputOption } from './ChipInput';

const meta = {
  title: 'Components/ChipInput',
  component: ChipInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364, minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChipInput>;

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

const tagOptions: ChipInputOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'product', label: 'Product' },
  { value: 'research', label: 'Research' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
];

const peopleOptions: ChipInputOption[] = [
  { value: 'alice', label: 'Alice Johnson', avatarInitials: 'AJ' },
  { value: 'bob', label: 'Bob Smith', avatarInitials: 'BS' },
  { value: 'carol', label: 'Carol Williams', avatarInitials: 'CW' },
  { value: 'dave', label: 'Dave Brown', avatarInitials: 'DB' },
  { value: 'eve', label: 'Eve Davis', avatarInitials: 'ED' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

const PlaygroundTemplate = (args: React.ComponentProps<typeof ChipInput>) => {
  const [values, setValues] = useState<string[]>(args.values ?? []);
  return <ChipInput {...args} values={values} onValuesChange={setValues} />;
};

export const Playground: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Type to search...',
    options: tagOptions,
    values: ['design', 'engineering'],
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { options: tagOptions },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <ChipInput options={tagOptions} placeholder="Type..." />
      </Section>
      <Section title="Filled">
        <ChipInput options={tagOptions} values={['design', 'engineering', 'marketing']} />
      </Section>
      <Section title="Disabled">
        <ChipInput options={tagOptions} values={['design', 'engineering', 'marketing']} disabled />
      </Section>
      <Section title="Error">
        <ChipInput options={tagOptions} values={['design', 'engineering', 'marketing']} error="Too many tags selected." />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Autocomplete (interactive)
// ---------------------------------------------------------------------------

const AutocompleteTemplate = () => {
  const [values, setValues] = useState<string[]>(['design']);
  return (
    <ChipInput
      label="Tags"
      hint="Type to search and select tags."
      placeholder="Search tags..."
      options={tagOptions}
      values={values}
      onValuesChange={setValues}
    />
  );
};

export const Autocomplete: Story = {
  args: { options: tagOptions },
  render: () => <AutocompleteTemplate />,
};

// ---------------------------------------------------------------------------
// With avatars (people selection)
// ---------------------------------------------------------------------------

const PeopleTemplate = () => {
  const [values, setValues] = useState<string[]>(['alice']);
  return (
    <ChipInput
      label="Assignees"
      hint="Search by name."
      placeholder="Add person..."
      options={peopleOptions}
      values={values}
      onValuesChange={setValues}
    />
  );
};

export const WithAvatars: Story = {
  args: { options: peopleOptions },
  render: () => <PeopleTemplate />,
};

// ---------------------------------------------------------------------------
// Free-text (no options list, chips created via Enter)
// ---------------------------------------------------------------------------

const FreeTextTemplate = () => {
  const [values, setValues] = useState<string[]>(['custom-tag']);
  return (
    <ChipInput
      label="Tags"
      hint="Press Enter to add. Backspace to remove last."
      placeholder="Add tag..."
      values={values}
      onValuesChange={setValues}
      allowFreeText
    />
  );
};

export const FreeText: Story = {
  args: {},
  render: () => <FreeTextTemplate />,
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Tags',
    hint: 'Start typing to filter.',
    placeholder: 'Search tags...',
    options: tagOptions,
    values: ['design'],
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Tags',
    options: tagOptions,
    values: ['design', 'engineering', 'marketing'],
    error: 'Maximum 3 tags allowed.',
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Tags',
    options: tagOptions,
    values: ['design', 'engineering', 'marketing'],
    disabled: true,
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};
