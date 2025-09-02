import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Tabs, Tab } from '../components/tabs';

const meta = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 'tab1',
		onChange: () => { },
		children: '',
	},
	render: function Render(args) {
		const [value, setValue] = useState(args.value);

		useEffect(() => {
			setValue(args.value);
		}, [args.value]);

		return (
			<div style={{ width: 400 }}>
				<Tabs
					{...args}
					value={value}
					onChange={(newValue) => {
						args.onChange(newValue);
						setValue(newValue);
					}}
				>
					<Tab label="Tab 1" value="tab1">
						<div className="p-4">
							<p>Content for Tab 1</p>
						</div>
					</Tab>
					<Tab label="Tab 2" value="tab2">
						<div className="p-4">
							<p>Content for Tab 2</p>
							<p>This tab has more content.</p>
						</div>
					</Tab>
					<Tab label="Tab 3" value="tab3">
						<div className="p-4">
							<p>Content for Tab 3</p>
							<p>This tab has even more content.</p>
							<p>And more.</p>
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	},
};