import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers — inline styled buttons (same pattern as other stories)
// ---------------------------------------------------------------------------

const FilledButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      padding: '0 10px',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      background: 'var(--dls-color-intent-neutral-base)',
      color: 'var(--dls-color-intent-neutral-on-base)',
    }}
  >
    {label}
  </button>
);

const OutlineButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      padding: '0 10px',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      background: 'transparent',
      color: 'var(--dls-color-text-primary)',
      border: '1px solid var(--dls-color-border-base)',
    }}
  >
    {label}
  </button>
);

const TriggerButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      padding: '0 16px',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      background: 'var(--dls-color-intent-neutral-base)',
      color: 'var(--dls-color-intent-neutral-on-base)',
    }}
  >
    {label}
  </button>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    open: true,
    breakpoint: 'desktop',
    title: 'Dialog Title',
    description: 'This is dialog description',
  },
  render: (args) => (
    <Dialog
      open={args.open}
      breakpoint={args.breakpoint}
      title={args.title}
      description={args.description}
      onClose={() => {}}
      actions={
        <>
          <OutlineButton label="Cancel" />
          <FilledButton label="Save" />
        </>
      }
    />
  ),
};

// ---------------------------------------------------------------------------
// Desktop with slot content
// ---------------------------------------------------------------------------

export const DesktopWithContent: Story = {
  args: {
    open: true,
    breakpoint: 'desktop',
    title: 'Dialog Title',
    description: 'This is dialog description',
  },
  render: () => (
    <Dialog
      open
      breakpoint="desktop"
      title="Dialog Title"
      description="This is dialog description"
      onClose={() => {}}
      actions={
        <>
          <OutlineButton label="Cancel" />
          <FilledButton label="Save" />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>Subtitle</div>
        </div>
        <div style={{ fontSize: 14, color: 'var(--dls-color-text-primary)', lineHeight: 1.5, fontFamily: 'var(--dls-font-family)' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Desktop with form inputs (slot)
// ---------------------------------------------------------------------------

export const DesktopWithForm: Story = {
  args: {
    open: true,
    breakpoint: 'desktop',
    title: 'Dialog Title',
    description: 'This is dialog description',
  },
  render: () => (
    <Dialog
      open
      breakpoint="desktop"
      title="Dialog Title"
      description="This is dialog description"
      onClose={() => {}}
      actions={
        <>
          <OutlineButton label="Cancel" />
          <FilledButton label="Save" />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            style={{
              all: 'unset',
              boxSizing: 'border-box',
              display: 'block',
              width: '100%',
              height: 32,
              padding: '0 8px',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'var(--dls-font-family)',
              border: '1px solid var(--dls-color-border-base)',
              color: 'var(--dls-color-text-primary)',
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>Hint</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            style={{
              all: 'unset',
              boxSizing: 'border-box',
              display: 'block',
              width: '100%',
              height: 32,
              padding: '0 8px',
              borderRadius: 6,
              fontSize: 14,
              fontFamily: 'var(--dls-font-family)',
              border: '1px solid var(--dls-color-border-base)',
              color: 'var(--dls-color-text-primary)',
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>Hint</span>
        </div>
      </div>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Mobile layout
// ---------------------------------------------------------------------------

export const MobileLayout: Story = {
  args: {
    open: true,
    breakpoint: 'mobile',
    title: 'Dialog Title',
    description: 'This is dialog description',
  },
  render: () => (
    <Dialog
      open
      breakpoint="mobile"
      title="Dialog Title"
      description="This is dialog description"
      onClose={() => {}}
      actions={
        <>
          <OutlineButton label="Cancel" />
          <FilledButton label="Save" />
        </>
      }
    >
      <div style={{ fontSize: 14, color: 'var(--dls-color-text-primary)', lineHeight: 1.5, fontFamily: 'var(--dls-font-family)' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </div>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Interactive — open/close with trigger button
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: {
    open: false,
    breakpoint: 'desktop',
    title: 'Dialog Title',
    description: 'This is dialog description',
  },
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <TriggerButton label="Open Dialog" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          breakpoint="desktop"
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onClose={() => setOpen(false)}
          actions={
            <>
              <OutlineButton label="Cancel" onClick={() => setOpen(false)} />
              <FilledButton label="Confirm" onClick={() => setOpen(false)} />
            </>
          }
        />
      </>
    );
  },
};

// ---------------------------------------------------------------------------
// Minimal — title only, no description or slot content
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: {
    open: true,
    breakpoint: 'desktop',
    title: 'Simple Dialog',
  },
  render: () => (
    <Dialog
      open
      title="Simple Dialog"
      onClose={() => {}}
      actions={<FilledButton label="OK" />}
    />
  ),
};
