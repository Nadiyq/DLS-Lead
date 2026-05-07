import React from 'react';

import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './card/Card';
import { Header } from './Header';
import { Text } from './text/Text';
import { Boxes, CheckCircle2, Layers3, Palette, Workflow } from 'lucide-react';
import './page.css';

type User = {
  name: string;
  role?: string;
};

const focusContent = {
  foundations: {
    label: 'Foundations',
    description: 'Color, typography, spacing, and motion are mapped through named DLS tokens.',
  },
  components: {
    label: 'Components',
    description: 'Stories show documented props, variants, states, and composition rules.',
  },
};

const systemPillars = [
  {
    icon: <Palette aria-hidden />,
    title: 'Foundations',
    status: 'Tokenized',
    intent: 'info',
    description: 'Semantic token layers keep light and dark themes consistent across stories.',
    details: [
      {
        title: 'Color',
        description: 'Surface, text, border, and intent tokens are used instead of raw values.',
      },
      {
        title: 'Typography',
        description: 'Headings and body copy follow the Inter-based DLS type scale.',
      },
    ],
  },
  {
    icon: <Boxes aria-hidden />,
    title: 'Components',
    status: 'Documented',
    intent: 'success',
    description: 'Reusable UI pieces are shown with real variants and documented props.',
    details: [
      {
        title: 'Actions',
        description: 'Buttons, badges, cards, and text primitives are composed directly.',
      },
      {
        title: 'States',
        description: 'Review stories cover useful interactive and themed states.',
      },
    ],
  },
  {
    icon: <Workflow aria-hidden />,
    title: 'Patterns',
    status: 'Composed',
    intent: 'warning',
    description: 'Examples demonstrate how foundations and components become product surfaces.',
    details: [
      {
        title: 'Structure',
        description: 'Content is grouped with DLS components before introducing new layout.',
      },
      {
        title: 'Governance',
        description: 'Storybook links stay aligned with the local DLS specs and MCP docs.',
      },
    ],
  },
] as const;

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [focus, setFocus] = React.useState<keyof typeof focusContent>('components');
  const activeFocus = focusContent[focus];

  return (
    <article className="dls-page-example-shell">
      <Header
        user={user}
        onOpenFoundations={() => setFocus('foundations')}
        onOpenComponents={() => setFocus('components')}
      />

      <section className="dls-page-example">
        <div className="dls-page-example__hero">
          <div className="dls-page-example__intro">
            <Badge variant="soft" intent="info" size="s">
              DLS example
            </Badge>
            <h2>Design-system workspace</h2>
            <p>
              This page replaces the starter Storybook tutorial with a DLS-native example: semantic
              tokens, documented components, and composition patterns working together in one surface.
            </p>
            <div className="dls-page-example__actions">
              <Button
                intent="primary"
                variant="filled"
                icon={<CheckCircle2 aria-hidden />}
                onClick={() => setUser({ name: 'Nadia', role: 'Design system owner' })}
              >
                Review as designer
              </Button>
              {user && (
                <Button variant="ghost" onClick={() => setUser(undefined)}>
                  Reset reviewer
                </Button>
              )}
            </div>
          </div>

          <aside className="dls-page-example__status" aria-label="DLS workspace status">
            <Badge variant="filled" intent={focus === 'foundations' ? 'info' : 'success'} size="s">
              Focus: {activeFocus.label}
            </Badge>
            <Text size="s" title="Current review path" description={activeFocus.description} />
          </aside>
        </div>

        <div className="dls-page-example__grid">
          {systemPillars.map((pillar) => (
            <Card
              key={pillar.title}
              type="outline"
              headerIcon={pillar.icon}
              headerContent={
                <Badge variant="soft" intent={pillar.intent} size="s">
                  {pillar.status}
                </Badge>
              }
              title={pillar.title}
              description={pillar.description}
              footer={<Badge variant="ghost" intent="neutral" size="s">DLS ready</Badge>}
            >
              <div className="dls-page-example__detail-stack">
                {pillar.details.map((detail) => (
                  <Text
                    key={detail.title}
                    size="s"
                    title={detail.title}
                    description={detail.description}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card
          type="muted"
          headerIcon={<Layers3 aria-hidden />}
          headerContent={<Badge variant="soft" intent="neutral" size="s">Composition</Badge>}
          title="How to add DLS content here"
          description="Use the existing Example stories as composition examples: import documented DLS components, wire realistic state, and place them under the Examples navigation group."
        />
      </section>
    </article>
  );
};
