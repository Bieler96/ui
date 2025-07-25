import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '../components/button/Button';
import type { ButtonVariant, Size } from '../components/button/Button';

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
			options: ['sm', 'md', 'lg'],
		},
		disabled: {
			control: { type: 'boolean' },
		},
		children: {
			control: { type: 'text' },
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