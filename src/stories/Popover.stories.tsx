import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { Popover } from "../components/popover/Popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

const content = (
  <div>
    <h4 className="text-sm font-bold">Popover Titel</h4>
    <p className="text-sm text-gray-600">Das ist ein Beispiel-Inhalt.</p>
  </div>
);

const baseTrigger = (label: string) => (
  <button className="border rounded px-3 py-1 hover:bg-gray-100 flex items-center gap-2">
    <Info className="w-4 h-4" />
    {label}
  </button>
);

export const Click: Story = {
  name: "Click to Open",
  args: {
    trigger: baseTrigger("Click mich"),
    placement: "bottom",
    content,
  },
};

export const Hover: Story = {
  name: "Hover to Open",
  args: {
    trigger: baseTrigger("Hover mich"),
    content,
    onHover: true,
  },
};

export const PlacementTop: Story = {
  name: "Placement: Top",
  args: {
    trigger: baseTrigger("Oben"),
    content,
    placement: "top",
  },
};

export const PlacementRightStart: Story = {
  name: "Placement: Right Start",
  args: {
    trigger: baseTrigger("Rechts Start"),
    content,
    placement: "right-start",
  },
};

export const BottomEdge: Story = {
  name: "Am unteren Rand (Auto-Flip)",
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="flex h-screen items-end justify-center p-4">
      <Popover {...args} />
    </div>
  ),
  args: {
    trigger: baseTrigger("Unten am Rand"),
    content,
    placement: "bottom",
  },
};