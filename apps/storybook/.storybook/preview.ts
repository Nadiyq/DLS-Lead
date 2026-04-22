import type { Preview } from '@storybook/react-vite';
import { createElement, useEffect, type ComponentType, type PropsWithChildren } from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import '@tokens/tokens.css';
import './dls-preview.css';

type PreviewTheme = 'light' | 'dark';
type DocsGlobals = {
  globals?: {
    theme?: unknown;
    surface?: unknown;
  };
};

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

function getPreviewTheme(value: unknown): PreviewTheme {
  return value === 'dark' ? 'dark' : 'light';
}

function getPreviewSurface(value: unknown): string {
  return typeof value === 'string' ? value : 'canvas';
}

function PreviewShell({
  Story,
  theme,
  surface,
  layout,
}: {
  Story: ComponentType;
  theme: PreviewTheme;
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

function ThemedDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  const globals = (props.context as DocsContainerProps['context'] & DocsGlobals).globals;
  const theme = getPreviewTheme(globals?.theme);
  const surface = getPreviewSurface(globals?.surface);
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
      const theme = getPreviewTheme(context.globals.theme);
      const surface = getPreviewSurface(context.globals.surface);
      const layout =
        typeof context.parameters.layout === 'string' ? context.parameters.layout : 'padded';

      return createElement(PreviewShell, {
        Story: Story as ComponentType,
        theme,
        surface,
        layout,
      });
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
