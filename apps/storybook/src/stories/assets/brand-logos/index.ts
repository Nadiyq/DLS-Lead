/**
 * Brand logos — third-party brand assets used in demos/stories.
 *
 * These are NOT DLS UI icons. They are brand identity marks (Mastercard, Visa,
 * PayPal, Google, Apple, Microsoft, Azure, etc.) that intentionally use brand
 * colors and lockups, not design tokens. Lucide-only rules do not apply.
 *
 * Vite imports `.svg` files as URL strings by default; use them with `<img>`
 * or as a `background-image`, e.g.:
 *
 *   import { mastercardLogo } from '../assets/brand-logos';
 *   <img src={mastercardLogo} alt="Mastercard" width={32} height={20} />
 */

// Payment cards
import mastercardLogo from './mastercard.svg';
import visaLogo from './visa.svg';

// Payment providers
import paypalLogo from './paypal.svg';

// Identity / SSO providers
import googleLogo from './google.svg';
import appleLogo from './apple.svg';
import microsoftLogo from './microsoft.svg';

// Cloud / platforms
import azureLogo from './azure.svg';

export {
  mastercardLogo,
  visaLogo,
  paypalLogo,
  googleLogo,
  appleLogo,
  microsoftLogo,
  azureLogo,
};
