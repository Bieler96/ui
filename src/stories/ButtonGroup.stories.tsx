
import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from '../components/button-group/ButtonGroup';
import Button from '../components/button/Button';

const meta: Meta<typeof ButtonGroup> = {
	title: 'Components/ButtonGroup',
	component: ButtonGroup,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
	args: {
		children: (
			<>
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</>
		),
	},
};
