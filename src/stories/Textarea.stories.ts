import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/textarea/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    placeholder: "Ghost textarea",
    variant: "ghost",
  },
};