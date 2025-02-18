import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Click me",
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
