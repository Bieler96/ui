import type { Meta, StoryObj } from '@storybook/react-vite';
import Item from '../components/item/Item';

const meta: Meta<typeof Item> = {
	title: 'Components/Item',
	component: Item,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		description: { control: 'text' },
		clickable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		variant: {
			control: { type: 'select' },
			options: ['first', 'last', 'none', 'rounded'],
		},
		leadingContent: { control: false }, // Disable control for complex props
		trailingContent: { control: false },
		onClick: { action: 'clicked' }, // Add action for onClick
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Default Item',
		description: 'This is a default item.',
		variant: 'rounded',
	},
};

export const Clickable: Story = {
	args: {
		...Default.args,
		label: 'Clickable Item',
		description: 'This item can be clicked.',
		clickable: true,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		label: 'Disabled Item',
		description: 'This item is disabled.',
		disabled: true,
	},
};

export const ClickableDisabled: Story = {
	args: {
		...Clickable.args,
		label: 'Clickable but Disabled',
		description: 'This item is both clickable and disabled.',
		disabled: true,
	},
};

export const WithLeadingContent: Story = {
	args: {
		...Default.args,
		label: 'Item with Leading Content',
		description: 'An icon or element is at the start.',
		leadingContent: '🏠',
	},
};

export const WithTrailingContent: Story = {
	args: {
		...Default.args,
		label: 'Item with Trailing Content',
		description: 'An icon or element is at the end.',
		trailingContent: '→',
	},
};

export const WithAllAddons: Story = {
	args: {
		...Clickable.args,
		label: 'Fully Featured Item',
		description: 'This item has leading and trailing content and is clickable.',
		leadingContent: '⚙️',
		trailingContent: '→',
	},
};

export const List: Story = {
	render: (args) => (
		<div className="w-full md:w-96">
			<Item
				{...args}
				label="First Item"
				description="This is the first item in a list."
				variant="first"
			/>
			<Item {...args} label="Second Item" description="This is a middle item." variant="none" />
			<Item {...args} label="Third Item" description="This is another middle item." variant="none" />
			<Item
				{...args}
				label="Last Item"
				description="This is the last item in a list."
				variant="last"
			/>
		</div>
	),
	args: {
		clickable: true,
		trailingContent: '→',
	},
};