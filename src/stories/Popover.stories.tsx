import type { Meta, StoryObj } from "@storybook/react";
import Popover from "../components/popover/Popover";
import Button from "../components/button/Button";

const meta: Meta<typeof Popover> = {
  title: "components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    trigger: { control: { disable: true } },
    content: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onHover: false,
    trigger: <Button>Click me</Button>,
    content: (
      <div>
        <h3 className="font-bold">Popover Title</h3>
        <p className="text-sm">
          This is the content of the popover. You can put any React node here.
        </p>
      </div>
    ),
  },
};

export const OnHover: Story = {
  args: {
    onHover: true,
    trigger: <Button>Hover me</Button>,
    content: (
      <div>
        <h3 className="font-bold">Hover Popover</h3>
        <p className="text-sm">
          This popover appears on hover. It has a slight delay before
          disappearing.
        </p>
      </div>
    ),
  },
};
