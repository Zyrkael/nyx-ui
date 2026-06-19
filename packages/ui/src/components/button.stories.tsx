import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large button",
  },
};
