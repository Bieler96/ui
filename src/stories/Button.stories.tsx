import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/button/Button';
import { Camera } from 'lucide-react';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['filled', 'outlined', 'tonal'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'icon'],
		},
		disabled: {
			control: { type: 'boolean' },
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button',
		variant: 'filled',
		size: 'md',
	},
};

export const Filled: Story = {
	args: {
		children: 'Filled Button',
		variant: 'filled',
		size: 'md',
	},
};

export const Outlined: Story = {
	args: {
		children: 'Outlined Button',
		variant: 'outlined',
		size: 'md',
	},
};

export const Tonal: Story = {
	args: {
		children: 'Tonal Button',
		variant: 'tonal',
		size: 'md',
	},
};

export const Ghost: Story = {
	args: {
		children: 'Ghost Button',
		variant: 'ghost',
		size: 'md',
	},
};

export const Small: Story = {
	args: {
		children: 'Small Button',
		variant: 'filled',
		size: 'sm',
	},
};

export const Medium: Story = {
	args: {
		children: 'Medium Button',
		variant: 'filled',
		size: 'md',
	},
};

export const Large: Story = {
	args: {
		children: 'Large Button',
		variant: 'filled',
		size: 'lg',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled Button',
		variant: 'filled',
		size: 'md',
		disabled: true,
	},
};

export const Icon: Story = {
	// render: (args) => <Button {...args}><Camera /></Button>,
	args: {
		children: <Camera />,
		variant: 'filled',
		size: 'icon',
	},
};