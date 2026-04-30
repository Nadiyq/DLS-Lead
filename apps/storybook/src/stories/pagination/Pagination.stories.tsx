import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { PageButton, ItemsPerPage, Pagination } from './Pagination';

/* ===========================================================================
   PageButton stories
   =========================================================================== */

const pageButtonMeta = {
  title: 'Components/Pagination/PageButton',
  component: PageButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageButton>;

export default pageButtonMeta;
type PBStory = StoryObj<typeof pageButtonMeta>;

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: PBStory = {
  args: {
    type: 'number',
    children: '1',
    selected: false,
    disabled: false,
  },
};

/* ---------------------------------------------------------------------------
   All types
   --------------------------------------------------------------------------- */

export const AllTypes: PBStory = {
  args: { children: '1' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Number">
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <PageButton type="number">1</PageButton>
          <PageButton type="number" selected>2</PageButton>
          <PageButton type="number">3</PageButton>
          <PageButton type="number" disabled>4</PageButton>
        </div>
      </Section>
      <Section title="More (ellipsis)">
        <div style={{ display: 'flex', gap: 4 }}>
          <PageButton type="more" />
          <PageButton type="more" disabled />
        </div>
      </Section>
      <Section title="Previous / Next">
        <div style={{ display: 'flex', gap: 8 }}>
          <PageButton type="previous" />
          <PageButton type="next" />
        </div>
      </Section>
      <Section title="Previous / Next — disabled">
        <div style={{ display: 'flex', gap: 8 }}>
          <PageButton type="previous" disabled />
          <PageButton type="next" disabled />
        </div>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   States
   --------------------------------------------------------------------------- */

export const States: PBStory = {
  args: { children: '1' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Number states (hover/focus are interactive — try them)">
        <div style={{ display: 'flex', gap: 4 }}>
          <PageButton type="number">Normal</PageButton>
          <PageButton type="number" selected>Selected</PageButton>
          <PageButton type="number" disabled>Disabled</PageButton>
        </div>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Items per page
   --------------------------------------------------------------------------- */

export const ItemsPerPageStory: PBStory = {
  args: { children: '1' },
  render: () => {
    const Wrapper = () => {
      const [size, setSize] = useState(10);
      return (
        <ItemsPerPage
          value={size}
          total={500}
          options={[5, 10, 20, 50, 100]}
          onChange={setSize}
        />
      );
    };
    return <Wrapper />;
  },
};

/* ---------------------------------------------------------------------------
   Full pagination
   --------------------------------------------------------------------------- */

export const FullPagination: PBStory = {
  args: { children: '1' },
  render: () => {
    const Wrapper = () => {
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const totalItems = 500;
      const totalPages = Math.ceil(totalItems / pageSize);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="Bordered (default) — with items-per-page">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </Section>

          <Section title="Bordered — pages only">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </Section>

          <Section title="Borderless variant">
            <Pagination
              variant="borderless"
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </Section>

          <Section title="Few pages (no ellipsis)">
            <Pagination
              currentPage={Math.min(page, 5)}
              totalPages={5}
              onPageChange={setPage}
            />
          </Section>
        </div>
      );
    };
    return <Wrapper />;
  },
};

/* ---------------------------------------------------------------------------
   Edge cases
   --------------------------------------------------------------------------- */

export const EdgeCases: PBStory = {
  args: { children: '1' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="First page (Previous disabled)">
        <Pagination currentPage={1} totalPages={20} />
      </Section>
      <Section title="Last page (Next disabled)">
        <Pagination currentPage={20} totalPages={20} />
      </Section>
      <Section title="Middle page (ellipsis both sides)">
        <Pagination currentPage={10} totalPages={20} />
      </Section>
      <Section title="Single page">
        <Pagination currentPage={1} totalPages={1} />
      </Section>
    </div>
  ),
};
