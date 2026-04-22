import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  docs: {
    autodocs: 'tag',
    defaultName: 'Overview',
  },
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",

  viteFinal: async (viteConfig) => {
    // ✅ ESM-safe dirname
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias as Record<string, string>),
      "@tokens": path.resolve(dirname, "../../../tokens"),
    };
    return viteConfig;
  },
};

export default config;
