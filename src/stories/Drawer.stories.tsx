import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomDrawer } from '../components/drawer/Drawer';
import React from 'react';
import Button from '../components/button/Button';

const meta: Meta<typeof CustomDrawer> = {
	title: 'Components/Drawer',
	component: CustomDrawer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		open: { control: 'boolean' },
		onOpenChange: { action: 'openChange' },
		direction: {
			control: { type: 'select' },
			options: ['left', 'right', 'bottom'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof CustomDrawer>;

export const Default: Story = {
	args: {
		trigger: <Button>Open Drawer</Button>,
		children: (
			<div className="max-w-md mx-auto">
				<p className="text-gray-600">
					Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work,
					we get into it because we have good taste.
				</p>
			</div>
		)
	},
	render: (args) => {
		const [open, setOpen] = React.useState(false);
		return (
			<CustomDrawer {...args} open={open} onOpenChange={setOpen}>
				{args.children}
			</CustomDrawer>
		);
	},
};

export const Left: Story = {
	args: {
		trigger: <Button>Open Drawer</Button>,
		children: (
			<div className="max-w-md mx-auto">
				<p className="text-gray-600">
					Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work,
					we get into it because we have good taste.
				</p>
			</div>
		),
		direction: "left"
	},
	render: (args) => {
		const [open, setOpen] = React.useState(false);
		return (
			<CustomDrawer {...args} open={open} onOpenChange={setOpen}>
				{args.children}
			</CustomDrawer>
		);
	},
};

export const Right: Story = {
	args: {
		trigger: <Button>Open Drawer</Button>,
		children: (
			<div className="max-w-md mx-auto">
				<p className="text-gray-600">
					Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work,
					we get into it because we have good taste.
				</p>
			</div>
		),
		direction: "right"
	},
	render: (args) => {
		const [open, setOpen] = React.useState(false);
		return (
			<CustomDrawer {...args} open={open} onOpenChange={setOpen}>
				{args.children}
			</CustomDrawer>
		);
	},
};