import React from 'react';
import './signup-form.css';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { googleLogo } from '../assets/brand-logos';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SignupFormType = '1' | '2' | '3' | '4';

type StrengthLevel = 'none' | 'weak' | 'fair' | 'good' | 'strong';

export interface SignupFormProps {
  /** Layout type */
  type?: SignupFormType;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Logo slot (types 3 & 4) */
  logo?: React.ReactNode;
  /** Image slot (types 2 & 4) */
  image?: React.ReactNode;
  /** Primary button label */
  primaryButtonLabel?: string;
  /** Show social login button */
  showSocialLogin?: boolean;
  /** Social login label */
  socialLoginLabel?: string;
  /** Social login icon */
  socialLoginIcon?: React.ReactNode;
  /** Show "or" divider (type 3 & 4) */
  showOrDivider?: boolean;
  /** Show password strength bar */
  showPasswordStrength?: boolean;
  /** Bottom text */
  bottomText?: React.ReactNode;
  /** Terms text (types 3 & 4) */
  termsText?: React.ReactNode;
  /** Extra slot */
  slotContent?: React.ReactNode;
  /** Submit handler */
  onSubmit?: (data: { fullName: string; email: string; password: string; confirmPassword: string }) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Google icon
   --------------------------------------------------------------------------- */

const GoogleIcon = () => (
  <img src={googleLogo} alt="Google" width={16} height={16} style={{ display: 'inline-block' }} />
);

/* ---------------------------------------------------------------------------
   Password strength helper
   --------------------------------------------------------------------------- */

function getStrength(password: string): { level: StrengthLevel; label: string; segments: number } {
  if (!password) return { level: 'none', label: '', segments: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'weak', label: 'Weak', segments: 1 };
  if (score === 2) return { level: 'fair', label: 'So-so', segments: 2 };
  if (score === 3) return { level: 'good', label: 'Good', segments: 3 };
  return { level: 'strong', label: 'Strong', segments: 4 };
}

/* ---------------------------------------------------------------------------
   Strength bar
   --------------------------------------------------------------------------- */

const StrengthBar = ({ password }: { password: string }) => {
  const { level, label, segments } = getStrength(password);

  return (
    <div className="dls-signup__strength" data-level={level}>
      <div className="dls-signup__strength-bar">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="dls-signup__strength-segment"
            data-active={i <= segments ? '' : undefined}
          />
        ))}
      </div>
      {label && <span className="dls-signup__strength-label">{label}</span>}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Form content
   --------------------------------------------------------------------------- */

const FormContent = (props: SignupFormProps) => {
  const {
    title = 'Create account',
    subtitle = 'Enter your information below to create your account',
    primaryButtonLabel = 'Create account',
    showSocialLogin = true,
    socialLoginLabel = 'Sign up with Google',
    socialLoginIcon,
    showOrDivider = false,
    showPasswordStrength = true,
    bottomText,
    slotContent,
    onSubmit,
  } = props;

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ fullName, email, password, confirmPassword });
  };

  return (
    <>
      <div className="dls-signup__header">
        <h2 className="dls-signup__title">{title}</h2>
        {subtitle && <p className="dls-signup__subtitle">{subtitle}</p>}
      </div>

      {/* Body: social + or + form + slot + footer */}
      <div className="dls-signup__body">
        {/* Social first (types 3 & 4) */}
        {showOrDivider && showSocialLogin && (
          <div className="dls-signup__social">
            <Button
              variant="outline"
              intent="neutral"
              size="m"
              icon={socialLoginIcon || <GoogleIcon />}
              style={{ width: '100%' }}
            >
              {socialLoginLabel}
            </Button>
          </div>
        )}

        {showOrDivider && <div className="dls-signup__or">or</div>}

        <form className="dls-signup__form" onSubmit={handleSubmit}>
          <InputField
            label="Full name"
            placeholder="Enter..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="dls-signup__password-field">
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Must be at least 8 characters long."
            />
            {showPasswordStrength && <StrengthBar password={password} />}
          </div>

          <InputField
            label="Confirm password"
            type="password"
            placeholder="Enter..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>

        {slotContent}

        <div className="dls-signup__footer">
          <div className="dls-signup__buttons">
            <Button
              variant="filled"
              intent="neutral"
              size="m"
              onClick={() => onSubmit?.({ fullName, email, password, confirmPassword })}
              style={{ width: '100%' }}
            >
              {primaryButtonLabel}
            </Button>
            {!showOrDivider && showSocialLogin && (
              <Button
                variant="outline"
                intent="neutral"
                size="m"
                icon={socialLoginIcon || <GoogleIcon />}
                style={{ width: '100%' }}
              >
                {socialLoginLabel}
              </Button>
            )}
          </div>
          {bottomText && <p className="dls-signup__bottom-text">{bottomText}</p>}
        </div>
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const SignupForm = React.forwardRef<HTMLDivElement, SignupFormProps>(
  (props, ref) => {
    const { type = '1', logo, image, termsText, className, ...formProps } = props;

    const defaults: SignupFormProps = {
      showOrDivider: type === '3' || type === '4',
      bottomText: <>Already have an account? <a href="#">Login</a></>,
      ...formProps,
    };

    const cardContent =
      type === '2' || type === '4' ? (
        <>
          <div className="dls-signup__card-form">
            <FormContent {...defaults} />
          </div>
          <div className="dls-signup__image">{image || 'Image'}</div>
        </>
      ) : (
        <FormContent {...defaults} />
      );

    return (
      <div
        ref={ref}
        className={['dls-signup', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {(type === '3' || type === '4') && logo && (
          <div className="dls-signup__logo">{logo}</div>
        )}

        <div className="dls-signup__card">{cardContent}</div>

        {(type === '3' || type === '4') && termsText && (
          <p className="dls-signup__terms">{termsText}</p>
        )}
      </div>
    );
  },
);

SignupForm.displayName = 'SignupForm';
