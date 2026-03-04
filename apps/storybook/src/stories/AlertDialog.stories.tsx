import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AlertDialog, InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from './AlertDialog';
import { Button } from './Button';
import type { AlertDialogIntent } from './AlertDialog';

const INTENTS: AlertDialogIntent[] = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'];

const INTENT_ICONS: Record<AlertDialogIntent, React.ReactNode> = {
  neutral: <InfoIcon />,
  primary: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <AlertTriangleIcon />,
  danger: <XCircleIcon />,
};

/* ---------------------------------------------------------------------------
   Inline preview wrapper — renders alert dialog panel without <dialog> modal
   behavior so stories are visible in the Storybook canvas.
   --------------------------------------------------------------------------- */

const InlinePanel = ({
  intent = 'neutral' as AlertDialogIntent,
  breakpoint,
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  intent?: AlertDialogIntent;
  breakpoint?: 'desktop' | 'mobile';
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) => {
  const hasActions = primaryAction || secondaryAction;
  return (
    <div
      className="dls-alert-dialog"
      data-intent={intent}
      data-breakpoint={breakpoint || 'desktop'}
      style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
    >
      <div className="dls-alert-dialog__content">
        {icon && <span className="dls-alert-dialog__icon">{icon}</span>}
        {(title || description) && (
          <div className="dls-alert-dialog__text">
            {title && <div className="dls-alert-dialog__title">{title}</div>}
            {description && <div className="dls-alert-dialog__description">{description}</div>}
          </div>
        )}
      </div>
      {hasActions && (
        <div className="dls-alert-dialog__actions">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  );
};

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: INTENTS,
    },
    breakpoint: {
      control: 'inline-radio',
      options: ['desktop', 'mobile'],
    },
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    intent: 'neutral',
    open: false,
    title: 'Alert Dialog Title',
    description: 'This is alert dialog description',
    icon: <InfoIcon />,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      fontFamily: 'var(--dls-font-family)',
      color: 'var(--dls-color-text-primary)',
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {children}
    </div>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
    <span style={{
      width: 64,
      fontSize: 12,
      color: 'var(--dls-color-text-secondary)',
      fontFamily: 'var(--dls-font-family)',
      flexShrink: 0,
      paddingTop: 18,
    }}>
      {label}
    </span>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground — opens real <dialog> modal
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="filled" intent={args.intent} onClick={() => setOpen(true)}>
          Open Alert Dialog
        </Button>
        <AlertDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          icon={INTENT_ICONS[args.intent || 'neutral']}
          primaryAction={
            <Button variant="filled" intent={args.intent} onClick={() => setOpen(false)}>
              Action 1
            </Button>
          }
          secondaryAction={
            <Button variant="outline" intent={args.intent} onClick={() => setOpen(false)}>
              Action 2
            </Button>
          }
        />
      </>
    );
  },
};

// ---------------------------------------------------------------------------
// All intents — Desktop (inline panels)
// ---------------------------------------------------------------------------

export const AllIntentsDesktop: Story = {
  render: () => (
    <Section title="All Intents (Desktop)">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <InlinePanel
            intent={intent}
            breakpoint="desktop"
            icon={INTENT_ICONS[intent]}
            title="Alert Dialog Title"
            description="This is alert dialog description"
            primaryAction={<Button variant="filled" intent={intent} size="m">Action 1</Button>}
            secondaryAction={<Button variant="outline" intent={intent} size="m">Action 2</Button>}
          />
        </Row>
      ))}
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// All intents — Mobile (inline panels)
// ---------------------------------------------------------------------------

export const AllIntentsMobile: Story = {
  render: () => (
    <Section title="All Intents (Mobile)">
      {INTENTS.map((intent) => (
        <Row key={intent} label={intent}>
          <InlinePanel
            intent={intent}
            breakpoint="mobile"
            icon={INTENT_ICONS[intent]}
            title="Alert Dialog Title"
            description="This is alert dialog description"
            primaryAction={<Button variant="filled" intent={intent} size="m">Action 1</Button>}
            secondaryAction={<Button variant="outline" intent={intent} size="m">Action 2</Button>}
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
      <InlinePanel
        intent="danger"
        breakpoint="desktop"
        title="Delete this item?"
        description="This action cannot be undone. All associated data will be permanently removed."
        primaryAction={<Button variant="filled" intent="danger" size="m">Delete</Button>}
        secondaryAction={<Button variant="outline" intent="danger" size="m">Cancel</Button>}
      />
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Without description
// ---------------------------------------------------------------------------

export const WithoutDescription: Story = {
  render: () => (
    <Section title="Without Description">
      <InlinePanel
        intent="warning"
        breakpoint="desktop"
        icon={<AlertTriangleIcon />}
        title="Are you sure you want to leave?"
        primaryAction={<Button variant="filled" intent="warning" size="m">Leave</Button>}
        secondaryAction={<Button variant="outline" intent="warning" size="m">Stay</Button>}
      />
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Primary action only
// ---------------------------------------------------------------------------

export const PrimaryActionOnly: Story = {
  render: () => (
    <Section title="Primary Action Only">
      <InlinePanel
        intent="info"
        breakpoint="desktop"
        icon={<InfoIcon />}
        title="Update available"
        description="A new version is ready to install."
        primaryAction={<Button variant="filled" intent="info" size="m">Update now</Button>}
      />
    </Section>
  ),
};
