import React from 'react';
import './login-form.css';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type LoginFormType = '1' | '2' | '3' | '4';

export interface LoginFormProps {
  /** Layout type */
  type?: LoginFormType;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Logo slot (types 3 & 4) */
  logo?: React.ReactNode;
  /** Image slot (types 2 & 4) */
  image?: React.ReactNode;
  /** Show "Forgot password?" link */
  showForgotPassword?: boolean;
  /** Forgot password handler */
  onForgotPassword?: () => void;
  /** Primary button label */
  primaryButtonLabel?: string;
  /** Show social login button */
  showSocialLogin?: boolean;
  /** Social login button label */
  socialLoginLabel?: string;
  /** Social login icon */
  socialLoginIcon?: React.ReactNode;
  /** Show "or" divider (type 3) */
  showOrDivider?: boolean;
  /** Bottom text (e.g. "Don't have an account? Sign up") */
  bottomText?: React.ReactNode;
  /** Terms text (types 3 & 4) */
  termsText?: React.ReactNode;
  /** Extra slot content */
  slotContent?: React.ReactNode;
  /** Submit handler */
  onSubmit?: (email: string, password: string) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Default Google icon
   --------------------------------------------------------------------------- */

const GoogleIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.2c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 2.4-3.2 2.4-5.4z" fill="#4285F4" />
    <path d="M8 16c2 0 3.7-.7 5-1.8l-2.4-1.9c-.7.5-1.5.7-2.6.7-2 0-3.7-1.4-4.3-3.2H1.2v1.9C2.5 14.2 5 16 8 16z" fill="#34A853" />
    <path d="M3.7 9.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V4.6H1.2C.4 6 0 7.5 0 8s.4 2 1.2 3.4l2.5-1.9z" fill="#FBBC05" />
    <path d="M8 3.2c1.1 0 2.1.4 2.9 1.1l2.2-2.2C11.7.8 10 0 8 0 5 0 2.5 1.8 1.2 4.6l2.5 1.9C4.3 4.5 6 3.2 8 3.2z" fill="#EA4335" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Form content (shared between all types)
   --------------------------------------------------------------------------- */

const FormContent = ({
  title, subtitle, showForgotPassword, onForgotPassword,
  primaryButtonLabel, showSocialLogin, socialLoginLabel,
  socialLoginIcon, showOrDivider, bottomText, slotContent, onSubmit,
}: LoginFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <>
      {/* Header */}
      <div className="dls-login__header">
        <h2 className="dls-login__title">{title}</h2>
        {subtitle && <p className="dls-login__subtitle">{subtitle}</p>}
      </div>

      {/* Social buttons first (type 3 pattern) */}
      {showOrDivider && showSocialLogin && (
        <div className="dls-login__social">
          <Button
            variant="outline"
            intent="neutral"
            size="m"
            icon={socialLoginIcon || <GoogleIcon />}
            style={{ width: '100%' }}
          >
            {socialLoginLabel || 'Login with Google'}
          </Button>
        </div>
      )}

      {showOrDivider && <div className="dls-login__or">or</div>}

      {/* Form fields */}
      <form className="dls-login__form" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="dls-login__password-group">
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showForgotPassword && (
            <button
              type="button"
              className="dls-login__forgot"
              onClick={onForgotPassword}
            >
              Forgot your password?
            </button>
          )}
        </div>
      </form>

      {/* Slot content */}
      {slotContent}

      {/* Footer */}
      <div className="dls-login__footer">
        <div className="dls-login__buttons">
          <Button
            variant="filled"
            intent="neutral"
            size="m"
            onClick={() => onSubmit?.(email, password)}
            style={{ width: '100%' }}
          >
            {primaryButtonLabel || 'Login'}
          </Button>
          {!showOrDivider && showSocialLogin && (
            <Button
              variant="outline"
              intent="neutral"
              size="m"
              icon={socialLoginIcon || <GoogleIcon />}
              style={{ width: '100%' }}
            >
              {socialLoginLabel || 'Login with Google'}
            </Button>
          )}
        </div>
        {bottomText && (
          <p className="dls-login__bottom-text">{bottomText}</p>
        )}
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const LoginForm = React.forwardRef<HTMLDivElement, LoginFormProps>(
  (props, ref) => {
    const {
      type = '1',
      logo,
      image,
      termsText,
      className,
      ...formProps
    } = props;

    const defaults = {
      title: 'Login to your account',
      subtitle: 'Enter your email below to login to your account',
      showForgotPassword: true,
      primaryButtonLabel: 'Login',
      showSocialLogin: true,
      socialLoginLabel: 'Login with Google',
      showOrDivider: type === '3' || type === '4',
      bottomText: <>Don&apos;t have an account? <a href="#">Sign up</a></>,
      ...formProps,
    };

    const cardContent = (
      <>
        {(type === '2' || type === '4') ? (
          <>
            <div className="dls-login__card-form">
              <FormContent {...defaults} />
            </div>
            <div className="dls-login__image">
              {image || 'Image'}
            </div>
          </>
        ) : (
          <FormContent {...defaults} />
        )}
      </>
    );

    return (
      <div
        ref={ref}
        className={['dls-login', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {/* Logo (types 3 & 4) */}
        {(type === '3' || type === '4') && logo && (
          <div className="dls-login__logo">{logo}</div>
        )}

        {/* Card */}
        <div className="dls-login__card">
          {cardContent}
        </div>

        {/* Terms (types 3 & 4) */}
        {(type === '3' || type === '4') && termsText && (
          <p className="dls-login__terms">{termsText}</p>
        )}
      </div>
    );
  },
);

LoginForm.displayName = 'LoginForm';
