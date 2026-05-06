import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const dlsLeadTheme = create({
  base: 'light',
  brandTitle: 'DLS Lead',
  brandUrl: '/?path=/docs/foundations-overview--docs',
  brandImage: '/logo.svg',
  brandTarget: '_self',
  colorPrimary: '#6941C6',
  colorSecondary: '#7F56D9',
  appBg: '#FAFAFA',
  appContentBg: '#FFFFFF',
  appHoverBg: '#F5F5F5',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E9EAEB',
  appBorderRadius: 8,
  fontBase: '"Inter", sans-serif',
  textColor: '#181D27',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#535862',
  barTextColor: '#414651',
  barHoverColor: '#6941C6',
  barSelectedColor: '#6941C6',
  barBg: '#FFFFFF',
  buttonBg: '#FFFFFF',
  buttonBorder: '#D5D7DA',
  booleanBg: '#E9EAEB',
  booleanSelectedBg: '#6941C6',
  inputBg: '#FFFFFF',
  inputBorder: '#D5D7DA',
  inputTextColor: '#181D27',
  inputBorderRadius: 8,
});

addons.setConfig({
  theme: dlsLeadTheme,
});
