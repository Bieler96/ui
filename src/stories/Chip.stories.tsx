import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../components/chip/Chip';
import { useState } from 'react';
import { Camera } from 'lucide-react';

const meta: Meta<typeof Chip> = {
	title: 'Components/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['assist', 'filter', 'input', 'suggestion'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Assist: Story = {
	args: {
		variant: 'assist',
		label: 'Assist Chip',
		onClick: () => alert('Assist chip clicked!'),
		icon: <Camera size={16} />,
	},
};

export const Filter: Story = {
	args: {
		variant: 'filter',
		label: 'Filter Chip',
		selected: false,
	},
	render: function Render(args) {
		const [selected, setSelected] = useState(args.selected);

		return <Chip {...args} selected={selected} onClick={() => setSelected(!selected)} />;
	},
};

export const Input: Story = {
	args: {
		variant: 'input',
		label: 'Input Chip',
		onDelete: () => alert('Chip deleted!'),
	},
};

export const Suggestion: Story = {
	args: {
		variant: 'suggestion',
		label: 'Suggestion Chip',
	},
};

export const CustomColors: Story = {
	args: {
		variant: 'filter',
		label: 'Custom Colors',
		colors: {
			backgroundColor: '#ffffff',
			textColor: '#000000',
			borderColor: '#000000',
			hoverBackgroundColor: '#eeeeee',
			selectedBackgroundColor: '#0000ff',
			selectedTextColor: '#ffffff',
			selectedBorderColor: '#ff0000',
			selectedHoverBackgroundColor: '#0000cc',
		},
	},
	render: function Render(args) {
		const [selected, setSelected] = useState(args.selected);

		return <Chip {...args} selected={selected} onClick={() => setSelected(!selected)} />;
	},
};
