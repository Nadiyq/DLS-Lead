import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { PhoneInput, type CountryOption } from './PhoneInput';

const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 364 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: '000-000-0000',
  },
} satisfies Meta<typeof PhoneInput>;

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

const countries: CountryOption[] = [
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Phone number',
    placeholder: '000-000-0000',
  },
};

// ---------------------------------------------------------------------------
// All states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: { placeholder: '000-000-0000' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 364 }}>
      <Section title="Normal (empty)">
        <PhoneInput placeholder="000-000-0000" />
      </Section>
      <Section title="Filled">
        <PhoneInput placeholder="000-000-0000" value="202-111-1111" readOnly />
      </Section>
      <Section title="Disabled">
        <PhoneInput placeholder="000-000-0000" value="202-111-1111" disabled />
      </Section>
      <Section title="Error">
        <PhoneInput placeholder="000-000-0000" value="202-111-1111" error="Error message" readOnly />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With label and hint
// ---------------------------------------------------------------------------

export const WithLabelAndHint: Story = {
  args: {
    label: 'Phone number',
    placeholder: '000-000-0000',
    hint: 'Include area code.',
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  args: {
    label: 'Phone number',
    placeholder: '000-000-0000',
    value: '123',
    error: 'Please enter a valid phone number.',
  },
};

// ---------------------------------------------------------------------------
// Different country
// ---------------------------------------------------------------------------

export const DifferentCountry: Story = {
  args: {
    label: 'Phone number',
    placeholder: '0000 000000',
    country: countries[1],
  },
};

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const InteractiveTemplate = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [countryIdx, setCountryIdx] = useState(0);

  const cycleCountry = () => {
    const next = (countryIdx + 1) % countries.length;
    setCountryIdx(next);
    setCountry(countries[next]);
  };

  return (
    <PhoneInput
      label="Phone number"
      placeholder="000-000-0000"
      country={country}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      onCountryClick={cycleCountry}
    />
  );
};

export const Interactive: Story = {
  args: { placeholder: '000-000-0000' },
  render: () => <InteractiveTemplate />,
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Phone number',
    placeholder: '000-000-0000',
    value: '202-111-1111',
    disabled: true,
  },
};
