import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/card/Card';

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['elevated', 'filled', 'outlined'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
	args: {
		variant: 'elevated',
		children: <p>This is an elevated card.</p>,
	},
};

export const Filled: Story = {
	args: {
		variant: 'filled',
		children: <p>This is a filled card.</p>,
	},
};

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		children: <p>This is an outlined card.</p>,
	},
};
