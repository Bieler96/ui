import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../components/select";
import { useState } from "react";

const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
	{ value: "1", label: "Option 1" },
	{ value: "2", label: "Option 2" },
	{ value: "3", label: "Option 3" },
	{ value: "4", label: "Option 4" },
];

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | string[] | undefined>("1");
		return <Select {...args} value={value} onChange={setValue} />;
	},
	args: {
		options: options,
		placeholder: "Select an option",
	},
};

export const Multiple: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | string[] | undefined>(["1", "3"]);
		return <Select {...args} value={value} onChange={setValue} />;
	},
	args: {
		options: options,
		multiple: true,
		placeholder: "Select options",
	},
};

export const Disabled: Story = {
	render: (args) => {
		const [value, setValue] = useState<string | string[] | undefined>("1");
		return <Select {...args} value={value} onChange={setValue} />;
	},
	args: {
		options: options,
		disabled: true,
		placeholder: "Select an option",
	},
};
