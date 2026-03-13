import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignupForm } from './SignupForm';

const meta = {
  title: 'Templates/SignupForm',
  component: SignupForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>;

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
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: true,
    primaryButtonLabel: 'Create account',
  },
};

/* ---------------------------------------------------------------------------
   Type 1 — Simple card
   --------------------------------------------------------------------------- */

export const SimpleCard: Story = {
  args: {
    type: '1',
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: true,
  },
};

/* ---------------------------------------------------------------------------
   Type 2 — Card + Image
   --------------------------------------------------------------------------- */

export const WithImage: Story = {
  args: {
    type: '2',
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: true,
  },
};

/* ---------------------------------------------------------------------------
   Type 3 — Logo + Social first
   --------------------------------------------------------------------------- */

export const LogoSocial: Story = {
  args: {
    type: '3',
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: true,
    logo: <LogoStub />,
    termsText: 'By clicking continue, you agree to our Terms of Service and Privacy Policy',
  },
};

/* ---------------------------------------------------------------------------
   Type 4 — Logo + Image + Terms
   --------------------------------------------------------------------------- */

export const LogoImage: Story = {
  args: {
    type: '4',
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: true,
    logo: <LogoStub />,
    termsText: 'By clicking continue, you agree to our Terms of Service and Privacy Policy',
  },
};

/* ---------------------------------------------------------------------------
   No social login
   --------------------------------------------------------------------------- */

export const NoSocialLogin: Story = {
  args: {
    type: '1',
    title: 'Create your account',
    subtitle: 'Get started with a free account',
    showSocialLogin: false,
    showPasswordStrength: true,
  },
};

/* ---------------------------------------------------------------------------
   No strength bar
   --------------------------------------------------------------------------- */

export const NoStrengthBar: Story = {
  args: {
    type: '1',
    title: 'Create account',
    subtitle: 'Enter your information below to create your account',
    showSocialLogin: true,
    showPasswordStrength: false,
  },
};
