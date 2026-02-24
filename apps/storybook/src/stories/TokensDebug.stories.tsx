import type { Meta, StoryObj } from "@storybook/react";
import { helloFromTokens } from "@tokens/tokens/debug";

const meta: Meta = {
  title: "Debug/Tokens",
};
export default meta;

type Story = StoryObj;

export const AliasWorks: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <div><strong>{helloFromTokens}</strong></div>
      <div>If you see this, the @tokens alias works in Storybook.</div>
    </div>
  ),
};