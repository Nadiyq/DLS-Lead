import React from 'react';
import './breadcrumbs.css';

/* ---------------------------------------------------------------------------
   Icons (inline SVGs matching Figma 16×16 icons)
   --------------------------------------------------------------------------- */

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Slash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L6 13" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
  </svg>
);

const Ellipsis = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="13" cy="8" r="1" fill="currentColor" />
  </svg>
);

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
                  {separator ?? <ChevronRight />}
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
        <Ellipsis />
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
          <ChevronDown />
        </span>
      )}
    </Tag>
  );
}
