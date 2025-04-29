
import type { Meta, StoryObj } from "@storybook/react";
import { PageSpinner } from "./page-spinner";

const meta = {
  title: "UI/PageSpinner",
  component: PageSpinner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageSpinner />,
};
