import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

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
          <Button variant="outline" intent="neutral" size="m">Cancel</Button>
          <Button variant="filled" intent="neutral" size="m">Save</Button>
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
          <Button variant="outline" intent="neutral" size="m">Cancel</Button>
          <Button variant="filled" intent="neutral" size="m">Save</Button>
        </>
      }
    >
      <div className="dls-dialog__content">
        <div className="dls-dialog__title" style={{ fontSize: 'var(--dls-text-l-font-size)', lineHeight: 'var(--dls-text-l-line-height)', fontWeight: 'var(--dls-font-weight-medium)' }}>Subtitle</div>
        <div style={{ fontSize: 'var(--dls-text-m-font-size)', color: 'var(--dls-color-text-primary)', lineHeight: 'var(--dls-text-m-line-height)', fontFamily: 'var(--dls-font-family)' }}>
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
          <Button variant="outline" intent="neutral" size="m">Cancel</Button>
          <Button variant="filled" intent="neutral" size="m">Save</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 'var(--dls-text-s-font-size)', fontWeight: 'var(--dls-font-weight-medium)', color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>
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
              borderRadius: 'var(--dls-radius-component-input)',
              fontSize: 'var(--dls-text-m-font-size)',
              fontFamily: 'var(--dls-font-family)',
              border: '1px solid var(--dls-color-border-base)',
              color: 'var(--dls-color-text-primary)',
            }}
          />
          <span style={{ fontSize: 'var(--dls-text-s-font-size)', color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>Hint</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 'var(--dls-text-s-font-size)', fontWeight: 'var(--dls-font-weight-medium)', color: 'var(--dls-color-text-primary)', fontFamily: 'var(--dls-font-family)' }}>
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
              borderRadius: 'var(--dls-radius-component-input)',
              fontSize: 'var(--dls-text-m-font-size)',
              fontFamily: 'var(--dls-font-family)',
              border: '1px solid var(--dls-color-border-base)',
              color: 'var(--dls-color-text-primary)',
            }}
          />
          <span style={{ fontSize: 'var(--dls-text-s-font-size)', color: 'var(--dls-color-text-secondary)', fontFamily: 'var(--dls-font-family)' }}>Hint</span>
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
          <Button variant="filled" intent="neutral" size="m">Save</Button>
          <Button variant="outline" intent="neutral" size="m">Cancel</Button>
        </>
      }
    >
      <div style={{ fontSize: 'var(--dls-text-m-font-size)', color: 'var(--dls-color-text-primary)', lineHeight: 'var(--dls-text-m-line-height)', fontFamily: 'var(--dls-font-family)' }}>
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
        <Button variant="filled" intent="neutral" size="m" onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          breakpoint="desktop"
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button variant="outline" intent="neutral" size="m" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="filled" intent="neutral" size="m" onClick={() => setOpen(false)}>Confirm</Button>
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
      actions={<Button variant="filled" intent="neutral" size="m">OK</Button>}
    />
  ),
};
