import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'Templates/LoginForm',
  component: LoginForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

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
    title: 'Login to your account',
    subtitle: 'Enter your email below to login to your account',
    showForgotPassword: true,
    showSocialLogin: true,
    primaryButtonLabel: 'Login',
    socialLoginLabel: 'Login with Google',
  },
};

/* ---------------------------------------------------------------------------
   Type 1 — Simple card
   --------------------------------------------------------------------------- */

export const SimpleCard: Story = {
  args: {
    type: '1',
    title: 'Login to your account',
    subtitle: 'Enter your email below to login to your account',
    showForgotPassword: true,
    showSocialLogin: true,
  },
};

/* ---------------------------------------------------------------------------
   Type 2 — Card + Image
   --------------------------------------------------------------------------- */

export const WithImage: Story = {
  args: {
    type: '2',
    title: 'Login to your account',
    subtitle: 'Enter your email below to login to your account',
    showForgotPassword: true,
    showSocialLogin: true,
  },
};

/* ---------------------------------------------------------------------------
   Type 3 — Logo + Social login first
   --------------------------------------------------------------------------- */

export const LogoSocial: Story = {
  args: {
    type: '3',
    title: 'Login to your account',
    subtitle: 'Enter your email below to login to your account',
    showForgotPassword: true,
    showSocialLogin: true,
    showOrDivider: true,
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
    title: 'Login to your account',
    subtitle: 'Enter your email below to login to your account',
    showForgotPassword: true,
    showSocialLogin: true,
    showOrDivider: true,
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
    title: 'Welcome back',
    subtitle: 'Sign in to continue',
    showForgotPassword: true,
    showSocialLogin: false,
  },
};

/* ---------------------------------------------------------------------------
   Custom branding
   --------------------------------------------------------------------------- */

export const CustomBranding: Story = {
  args: {
    type: '3',
    title: 'Welcome to Acme',
    subtitle: 'Sign in with your company credentials',
    showForgotPassword: false,
    showSocialLogin: true,
    socialLoginLabel: 'Continue with SSO',
    showOrDivider: true,
    primaryButtonLabel: 'Sign in',
    logo: <LogoStub />,
    termsText: 'Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.',
  },
};
