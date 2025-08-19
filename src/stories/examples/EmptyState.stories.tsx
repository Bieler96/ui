import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '../..';

const meta: Meta<typeof EmptyState> = {
	component: EmptyState,
	title: 'Examples/EmptyState',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
	args: {
		title: 'No Data Available',
		message: 'There is no data to display at the moment.',
		buttonText: 'Go Back',
		onButtonClick: () => alert('Button clicked!'),
	},
};

export const WithoutButton: Story = {
	args: {
		title: 'No Items Found',
		message: 'We could not find any items matching your search.',
	},
};