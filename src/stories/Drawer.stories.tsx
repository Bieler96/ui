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
		onOpenChange: { action: 'openChange' }
	},
};

export default meta;
type Story = StoryObj<typeof CustomDrawer>;

export const Default: Story = {
	args: {
		trigger: <Button>Open Drawer</Button>,
		children: (
			<div className="flex flex-col gap-4">
				<p className="text-gray-600">
					Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work,
					we get into it because we have good taste.
				</p>
				<p className="text-gray-600">
					But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying
					to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is
					still killer. And your taste is why your work disappoints you. A lot of people never get past this
					phase, they quit.{' '}
				</p>
				<p className="text-gray-600">
					Most people I know who do interesting, creative work went through years of this. We know our work
					doesn’t have this special thing that we want it to have. We all go through this. And if you are just
					starting out or you are still in this phase, you gotta know its normal and the most important thing you
					can do is do a lot of work
				</p>
				<p className="text-gray-600">
					Put yourself on a deadline so that every week you will finish one story. It is only by going through a
					volume of work that you will close that gap, and your work will be as good as your ambitions. And I took
					longer to figure out how to do this than anyone I’ve ever met. It’s gonna take awhile. It’s normal to
					take awhile. You’ve just gotta fight your way through.
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