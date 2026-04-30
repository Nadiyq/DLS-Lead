import React from 'react';
import './login-form.css';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { googleLogo } from '../assets/brand-logos';

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
  <img src={googleLogo} alt="Google" width={16} height={16} style={{ display: 'inline-block' }} />
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

      {/* Body: social + or + form + slot + footer */}
      <div className="dls-login__body">
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
