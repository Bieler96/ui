import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Checkbox, { type CheckboxProps } from "../components/checkbox/Checkbox";

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: { type: "boolean" },
		},
		onChange: {
			action: "changed",
		},
		label: {
			control: { type: "text" },
		},
		disabled: {
			control: { type: "boolean" },
		},
		className: {
			control: { type: "text" },
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(args.checked);

		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={setChecked}
			/>
		);
	},
	args: {
		checked: false,
		label: "Checkbox",
		onChange: () => { }
	},
};

export const Checked: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(args.checked);

		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={setChecked}
			/>
		);
	},
	args: {
		checked: true,
		label: "Checkbox",
		onChange: () => { }
	},
};

export const Disabled: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(args.checked);

		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={setChecked}
			/>
		);
	},
	args: {
		checked: false,
		disabled: true,
		label: "Checkbox",
		onChange: () => { }
	},
};