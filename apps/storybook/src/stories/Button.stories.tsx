import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button, PlusIcon } from './Button';
import type { ButtonVariant, ButtonIntent } from './Button';
import { Section, Row } from './_helpers/StoryLayout';

const INTENTS: ButtonIntent[] = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'];
const VARIANTS: ButtonVariant[] = ['filled', 'outline', 'soft', 'dotted', 'ghost', 'link'];

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    intent: {
      control: 'select',
      options: INTENTS,
    },
    size: {
      control: 'inline-radio',
      options: ['m', 's'],
    },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'filled',
    intent: 'neutral',
    size: 'm',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    icon: <PlusIcon />,
    children: 'Button',
  },
};

// ---------------------------------------------------------------------------
// Variant × Intent matrix (mirrors Figma layout)
// ---------------------------------------------------------------------------

export const Filled: Story = {
  render: () => (
    <Section title="Filled">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="filled" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="filled" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="filled" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const Outline: Story = {
  render: () => (
    <Section title="Outline">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="outline" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="outline" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="outline" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const Soft: Story = {
  render: () => (
    <Section title="Soft">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="soft" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="soft" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="soft" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const Dotted: Story = {
  render: () => (
    <Section title="Dotted">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="dotted" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="dotted" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="dotted" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Section title="Ghost">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="ghost" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="ghost" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="ghost" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

export const Link: Story = {
  render: () => (
    <Section title="Link">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <Button variant="link" intent={intent} icon={<PlusIcon />}>Button</Button>
          <Button variant="link" intent={intent} icon={<PlusIcon />} disabled>Button</Button>
          <Button variant="link" intent={intent} size="s" icon={<PlusIcon />}>Button</Button>
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Size M (32px)">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} intent="primary" size="m" icon={<PlusIcon />}>Button</Button>
          ))}
        </div>
      </Section>
      <Section title="Size S (24px)">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} intent="primary" size="s" icon={<PlusIcon />}>Button</Button>
          ))}
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Icon-only
// ---------------------------------------------------------------------------

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Icon-only M">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {VARIANTS.filter((v) => v !== 'link').map((v) => (
            <Button key={v} variant={v} intent="primary" size="m" icon={<PlusIcon />} iconOnly />
          ))}
        </div>
      </Section>
      <Section title="Icon-only S">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {VARIANTS.filter((v) => v !== 'link').map((v) => (
            <Button key={v} variant={v} intent="primary" size="s" icon={<PlusIcon />} iconOnly />
          ))}
        </div>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All intents × variants matrix
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {VARIANTS.map((variant) => (
        <Section key={variant} title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
          {INTENTS.map((intent) => (
            <Row key={intent} label={intent}>
              <Button variant={variant} intent={intent} icon={<PlusIcon />}>Button</Button>
              <Button variant={variant} intent={intent} icon={<PlusIcon />} disabled>Button</Button>
            </Row>
          ))}
        </Section>
      ))}
    </div>
  ),
};
