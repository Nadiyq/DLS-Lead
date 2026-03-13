import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpForm } from './OtpForm';

const meta = {
  title: 'Templates/OtpForm',
  component: OtpForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof OtpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Logo stub
   --------------------------------------------------------------------------- */

const LogoStub = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dls-spacing-2)',
  }}>
    <div style={{
      width: 54, height: 54, borderRadius: 'var(--dls-radius-component-card)',
      background: 'var(--dls-color-intent-neutral-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--dls-color-intent-neutral-on-base)',
      fontFamily: 'var(--dls-font-family)', fontWeight: 'var(--dls-font-weight-semibold)',
      fontSize: 'var(--dls-text-xl-font-size)',
    }}>
      A
    </div>
    <span style={{
      fontFamily: 'var(--dls-font-family)', fontSize: 'var(--dls-text-s-font-size)',
      fontWeight: 'var(--dls-font-weight-semibold)', color: 'var(--dls-color-text-primary)',
    }}>
      Acme Inc
    </span>
  </div>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    type: '1',
    title: 'Enter verification code',
    subtitle: 'We sent a 6-digit code to your email.',
    length: 6,
    hint: 'Enter the 6-digit code sent to your email.',
    buttonLabel: 'Verify',
  },
};

/* ---------------------------------------------------------------------------
   Type 1 — Simple card
   --------------------------------------------------------------------------- */

export const SimpleCard: Story = {
  args: {
    type: '1',
    title: 'Enter verification code',
    subtitle: 'We sent a 6-digit code to your email.',
    hint: 'Enter the 6-digit code sent to your email.',
  },
};

/* ---------------------------------------------------------------------------
   Type 2 — Card + Image
   --------------------------------------------------------------------------- */

export const WithImage: Story = {
  args: {
    type: '2',
    title: 'Enter verification code',
    subtitle: 'We sent a 6-digit code to your email.',
    hint: 'Enter the 6-digit code sent to your email.',
  },
};

/* ---------------------------------------------------------------------------
   Type 3 — Logo + Card
   --------------------------------------------------------------------------- */

export const LogoCard: Story = {
  args: {
    type: '3',
    title: 'Enter verification code',
    subtitle: 'We sent a 6-digit code to your email.',
    hint: 'Enter the 6-digit code sent to your email.',
    logo: <LogoStub />,
    termsText: 'By clicking continue, you agree to our Terms of Service and Privacy Policy',
  },
};

/* ---------------------------------------------------------------------------
   Type 4 — Logo + Image
   --------------------------------------------------------------------------- */

export const LogoImage: Story = {
  args: {
    type: '4',
    title: 'Enter verification code',
    subtitle: 'We sent a 6-digit code to your email.',
    hint: 'Enter the 6-digit code sent to your email.',
    logo: <LogoStub />,
    termsText: 'By clicking continue, you agree to our Terms of Service and Privacy Policy',
  },
};

/* ---------------------------------------------------------------------------
   4-digit code
   --------------------------------------------------------------------------- */

export const FourDigit: Story = {
  args: {
    type: '1',
    title: 'Enter PIN',
    subtitle: 'Enter the 4-digit PIN sent to your phone.',
    length: 4,
    hint: 'Check your messages for the PIN.',
    buttonLabel: 'Confirm',
  },
};
