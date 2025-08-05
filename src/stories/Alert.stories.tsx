import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/alert/Alert';

const meta: Meta<typeof Alert> = {
	component: Alert,
	title: 'Components/Alert',
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
	args: {
		open: true,
		title: 'Alert',
		message: 'This is an alert message.',
		confirmText: 'OK',
	},
};
