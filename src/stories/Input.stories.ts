import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/input/Input";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
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
		label: "Name",
		placeholder: "Enter your name",
		id: "name-input"
	},
};