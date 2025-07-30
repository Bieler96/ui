import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../components/tooltip/Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "The content to display inside the tooltip",
    },
    children: {
      control: false,
      description: "The element that triggers the tooltip",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The placement of the tooltip",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const baseChild = (label: string) => (
  <span className="border rounded px-3 py-1 border-dashed">{label}</span>
);

export const Default: Story = {
  name: "Top Tooltip",
  args: {
    content: "This is a helpful tooltip message.",
    children: baseChild("Hover me"),
    placement: "top",
  },
};

export const PlacementBottom: Story = {
  name: "Placement: Bottom",
  args: {
    content: "This tooltip is at the bottom.",
    children: baseChild("Hover me"),
    placement: "bottom",
  },
};

export const PlacementLeft: Story = {
  name: "Placement: Left",
  args: {
    content: "This tooltip is on the left.",
    children: baseChild("Hover me"),
    placement: "left",
  },
};

export const PlacementRight: Story = {
  name: "Placement: Right",
  args: {
    content: "This tooltip is on the right.",
    children: baseChild("Hover me"),
    placement: "right",
  },
};
