import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookServiceForm } from './BookServiceForm';

const meta = {
  title: 'Templates/BookServiceForm',
  component: BookServiceForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof BookServiceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    title: 'Book a service',
    subtitle: 'Fill out the form below to schedule your appointment.',
    showCheckbox: true,
  },
};

/* ---------------------------------------------------------------------------
   Default
   --------------------------------------------------------------------------- */

export const Default: Story = {
  args: {},
};

/* ---------------------------------------------------------------------------
   Custom services
   --------------------------------------------------------------------------- */

export const CustomServices: Story = {
  args: {
    title: 'Schedule appointment',
    subtitle: 'Choose your preferred service and time.',
    serviceOptions: ['Oil change', 'Tire rotation', 'Brake inspection', 'Full tune-up'],
    servicePlaceholder: 'Choose a service',
  },
};

/* ---------------------------------------------------------------------------
   Without checkbox
   --------------------------------------------------------------------------- */

export const WithoutCheckbox: Story = {
  args: {
    title: 'Book a session',
    subtitle: 'Pick a date and time that works for you.',
    showCheckbox: false,
  },
};

/* ---------------------------------------------------------------------------
   Custom labels
   --------------------------------------------------------------------------- */

export const CustomLabels: Story = {
  args: {
    title: 'Reserve a spot',
    subtitle: 'Complete the form to reserve your spot.',
    nameLabel: 'Full name',
    emailLabel: 'Email address',
    serviceLabel: 'Type of service',
    dateLabel: 'Preferred date',
    cancelLabel: 'Go back',
    submitLabel: 'Reserve',
    checkboxLabel: 'I accept the cancellation policy.',
  },
};
