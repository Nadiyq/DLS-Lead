import { Button } from './Button';
import { Badge } from './Badge';
import { BookOpen, Boxes } from 'lucide-react';
import './header.css';

type User = {
  name: string;
  role?: string;
};

export interface HeaderProps {
  user?: User;
  onOpenFoundations?: () => void;
  onOpenComponents?: () => void;
}

export const Header = ({ user, onOpenFoundations, onOpenComponents }: HeaderProps) => (
  <header className="dls-header-example" aria-label="DLS example header">
    <div className="dls-header-example__brand">
      <img className="dls-header-example__logo" src="/logo.svg" alt="" />
      <div className="dls-header-example__title-group">
        <Badge variant="soft" intent="info" size="s">
          Storybook
        </Badge>
        <h1>DLS Lead</h1>
        <p>Documented tokens, components, and composition examples</p>
      </div>
    </div>
    <div className="dls-header-example__actions">
      {user ? (
        <span className="dls-header-example__welcome">
          Reviewing as <b>{user.name}</b>
          {user.role && <span>{user.role}</span>}
        </span>
      ) : (
        <Badge variant="soft" intent="success" size="s">
          Ready for review
        </Badge>
      )}
      <Button size="s" variant="ghost" icon={<BookOpen aria-hidden />} onClick={onOpenFoundations}>
        Foundations
      </Button>
      <Button size="s" intent="primary" variant="filled" icon={<Boxes aria-hidden />} onClick={onOpenComponents}>
        Components
      </Button>
    </div>
  </header>
);
