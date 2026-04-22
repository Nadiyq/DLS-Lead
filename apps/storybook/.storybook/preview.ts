import type { Preview } from '@storybook/react-vite';
import { createElement, useEffect } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import '@tokens/tokens.css';
import './dls-preview.css';

function usePreviewTheme(theme: string, surface: string) {
  useEffect(() => {
    const background = theme === 'dark' ? '#0A0D12' : '#FFFFFF';
    const foreground = theme === 'dark' ? '#FFFFFF' : '#181D27';

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.surface = surface;
    document.documentElement.style.backgroundColor = background;
    document.documentElement.style.color = foreground;
    document.body.dataset.theme = theme;
    document.body.dataset.surface = surface;
    document.body.style.backgroundColor = background;
    document.body.style.color = foreground;
  }, [surface, theme]);
}

function PreviewShell({
  Story,
  theme,
  surface,
  layout,
}: {
  Story: () => unknown;
  theme: string;
  surface: string;
  layout: string;
}) {
  usePreviewTheme(theme, surface);

  return createElement(
    'div',
    { className: 'sb-dls-shell', 'data-theme': theme, 'data-surface': surface },
    createElement(
      'div',
      { className: 'sb-dls-frame', 'data-layout': layout },
      createElement(Story),
    ),
  );
}

function ThemedDocsContainer(props: {
  children: unknown;
  context: {
    globals?: {
      theme?: string;
      surface?: string;
    };
  };
}) {
  const theme = props.context.globals?.theme ?? 'light';
  const surface = props.context.globals?.surface ?? 'canvas';
  const docsTheme = theme === 'dark' ? themes.dark : themes.light;

  usePreviewTheme(theme, surface);

  return createElement(
    DocsContainer,
    { ...props, theme: docsTheme },
    createElement(
      'div',
      { className: 'sb-dls-docs-shell', 'data-theme': theme, 'data-surface': surface },
      props.children,
    ),
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Preview components against DLS token themes.',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
    surface: {
      name: 'Surface',
      description: 'Preview canvas background.',
      defaultValue: 'canvas',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'canvas', title: 'Canvas' },
          { value: 'subtle', title: 'Subtle' },
          { value: 'muted', title: 'Muted' },
          { value: 'inverse', title: 'Inverse' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      const surface = context.globals.surface ?? 'canvas';
      const layout = context.parameters.layout ?? 'padded';

      return createElement(PreviewShell, { Story, theme, surface, layout });
    },
  ],
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          'Components',
          'Debug',
        ],
      },
    },
    docs: {
      toc: true,
      container: ThemedDocsContainer,
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
