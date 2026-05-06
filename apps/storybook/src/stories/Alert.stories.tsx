import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Alert, InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from './Alert';
import { Button } from './Button';
import type { AlertIntent } from './Alert';
import { Section, Row } from './_helpers/StoryLayout';

const INTENTS: AlertIntent[] = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'];

const INTENT_ICONS: Record<AlertIntent, React.ReactNode> = {
  neutral: <InfoIcon />,
  primary: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <AlertTriangleIcon />,
  danger: <XCircleIcon />,
};

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: INTENTS,
    },
    size: {
      control: 'inline-radio',
      options: ['m', 's'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    intent: 'neutral',
    size: 'm',
    title: 'Alert title',
    description: 'This is alert description',
    icon: <InfoIcon />,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    icon: <InfoIcon />,
    title: 'Alert title',
    description: 'This is alert description',
    action: <Button variant="filled" intent="neutral" size="s">Button</Button>,
  },
};

// ---------------------------------------------------------------------------
// All intents — Size M
// ---------------------------------------------------------------------------

export const AllIntents: Story = {
  render: () => (
    <Section title="All Intents (Size M)">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="m"
            icon={INTENT_ICONS[intent]}
            title="Alert title"
            description="This is alert description"
            action={<Button variant="filled" intent={intent} size="s">Button</Button>}
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All intents — Size S
// ---------------------------------------------------------------------------

export const AllIntentsSmall: Story = {
  render: () => (
    <Section title="All Intents (Size S)">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="s"
            icon={INTENT_ICONS[intent]}
            title="Alert title"
            description="This is alert description"
            action={<Button variant="filled" intent={intent} size="s">Button</Button>}
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Without icon
// ---------------------------------------------------------------------------

export const WithoutIcon: Story = {
  render: () => (
    <Section title="Without Icon">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="m"
            title="Alert title"
            description="This is alert description"
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Without title
// ---------------------------------------------------------------------------

export const WithoutTitle: Story = {
  render: () => (
    <Section title="Without Title">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="m"
            icon={INTENT_ICONS[intent]}
            description="This is alert description"
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Without description
// ---------------------------------------------------------------------------

export const WithoutDescription: Story = {
  render: () => (
    <Section title="Without Description">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="m"
            icon={INTENT_ICONS[intent]}
            title="Alert title"
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// With action button
// ---------------------------------------------------------------------------

export const WithAction: Story = {
  render: () => (
    <Section title="With Action Button">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent} align="start">
          <Alert
            intent={intent}
            size="m"
            icon={INTENT_ICONS[intent]}
            title="Alert title"
            description="This is alert description"
            action={<Button variant="filled" intent={intent} size="s">Button</Button>}
          />
        </Row>
      ))}
    </Section>
  ),
};
