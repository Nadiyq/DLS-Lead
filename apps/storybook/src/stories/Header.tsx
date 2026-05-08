import { Button } from './Button';
import { BookOpen, Boxes } from 'lucide-react';
import './header.css';

export interface HeaderProps {
  onOpenFoundations?: () => void;
  onOpenComponents?: () => void;
}

export const Header = ({ onOpenFoundations, onOpenComponents }: HeaderProps) => (
  <header className="dls-header-example" aria-label="DLS example header">
    <div className="dls-header-example__topbar">
      <img className="dls-header-example__logo" src="/logo.svg" alt="" />
      <div className="dls-header-example__actions">
        <div className="dls-header-example__action-buttons">
          <Button size="m" variant="ghost" intent="neutral" icon={<BookOpen aria-hidden />} onClick={onOpenFoundations}>
            Foundations
          </Button>
          <Button size="m" variant="ghost" intent="neutral" icon={<Boxes aria-hidden />} onClick={onOpenComponents}>
            Components
          </Button>
        </div>
      </div>
    </div>
    <div className="dls-header-example__brand">
      <span className="dls-header-example__eyebrow">Storybook</span>
      <div className="dls-header-example__title-group">
        <h1>DLS Lead</h1>
        <p>Documented tokens, components, and composition examples</p>
      </div>
    </div>
  </header>
);
