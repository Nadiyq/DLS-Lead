import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { User as UserIcon, Lock as LockIcon, Eye as EyeIcon } from 'lucide-react';
import { Dialog } from './Dialog';
import { Button } from '../Button';
import { FormField } from '../form-field/FormField';
import { InputField } from '../input-field/InputField';

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
// Desktop with slot content (text)
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
      <div className="dls-dialog__subtitle">Subtitle</div>
      <div className="dls-dialog__body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
      <FormField label="Name">
        <InputField placeholder="Type..." iconStart={<UserIcon aria-hidden="true" />} />
      </FormField>
      <FormField label="Password">
        <InputField placeholder="Type..." iconStart={<LockIcon aria-hidden="true" />} iconEnd={<EyeIcon aria-hidden="true" />} />
      </FormField>
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
      <div className="dls-dialog__body">
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
