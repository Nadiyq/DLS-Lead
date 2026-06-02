import React from 'react';
import {
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  Slash as SlashIcon,
  Ellipsis as EllipsisIcon,
} from 'lucide-react';
import './breadcrumbs.css';

/* Re-export Slash icon for stories (separator variant) */
export const Slash = SlashIcon;

/* ---------------------------------------------------------------------------
   BreadcrumbItem types
   --------------------------------------------------------------------------- */

export interface BreadcrumbItemRegular {
  type?: 'regular';
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}

export interface BreadcrumbItemDropdown {
  type: 'dropdown';
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}

export interface BreadcrumbItemMore {
  type: 'more';
  onClick?: React.MouseEventHandler;
}

export interface BreadcrumbItemCurrent {
  type: 'current';
  label: string;
}

export type BreadcrumbItem =
  | BreadcrumbItemRegular
  | BreadcrumbItemDropdown
  | BreadcrumbItemMore
  | BreadcrumbItemCurrent;

/* ---------------------------------------------------------------------------
   Breadcrumbs component
   --------------------------------------------------------------------------- */

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Custom separator element. Defaults to ChevronRight icon. */
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={className}
      {...props}
    >
      <ol className="dls-breadcrumbs">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <li className="dls-breadcrumbs__item">
              <BreadcrumbItemRenderer item={item} isLast={i === items.length - 1} />
            </li>
            {i < items.length - 1 && (
              <li className="dls-breadcrumbs__item" aria-hidden="true">
                <span className="dls-breadcrumbs__separator">
                  {separator ?? <ChevronRightIcon />}
                </span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  ),
);

Breadcrumbs.displayName = 'Breadcrumbs';

/* ---------------------------------------------------------------------------
   Item renderer
   --------------------------------------------------------------------------- */

function BreadcrumbItemRenderer({ item, isLast }: { item: BreadcrumbItem; isLast: boolean }) {
  const type = item.type ?? 'regular';

  if (type === 'current') {
    return (
      <span className="dls-breadcrumbs__current" aria-current="page">
        {(item as BreadcrumbItemCurrent).label}
      </span>
    );
  }

  if (type === 'more') {
    return (
      <button
        type="button"
        className="dls-breadcrumbs__more"
        onClick={(item as BreadcrumbItemMore).onClick}
        aria-label="Show more breadcrumbs"
      >
        <EllipsisIcon />
      </button>
    );
  }

  const { label, href, onClick } = item as BreadcrumbItemRegular | BreadcrumbItemDropdown;
  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href } : { type: 'button' as const };

  return (
    <Tag
      className="dls-breadcrumbs__link"
      onClick={onClick}
      aria-current={isLast ? 'page' : undefined}
      {...linkProps}
    >
      <span>{label}</span>
      {type === 'dropdown' && (
        <span className="dls-breadcrumbs__dropdown-icon">
          <ChevronDownIcon />
        </span>
      )}
    </Tag>
  );
}
