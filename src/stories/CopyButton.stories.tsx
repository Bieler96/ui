import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '../components/copy-button/CopyButton';

const meta: Meta<typeof CopyButton> = {
	title: 'Components/CopyButton',
	component: CopyButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'This text will be copied',
		size: 'sm'
	},
};

export const WithLabel: Story = {
	args: {
		text: 'This text will be copied',
		label: 'Copy',
	},
};

export const WithBothLabels: Story = {
	args: {
		text: 'This text will be copied',
		label: 'Copy',
		labelCopied: 'Copied!',
	},
};