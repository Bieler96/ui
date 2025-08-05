import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNavBar, TopNavBarBrand, TopNavBarItems, TopNavBarItem, TopNavBarActions } from "../components/top-nav-bar";
import { Button } from "../components/button/Button";

const meta = {
	title: "Components/TopNavBar",
	component: TopNavBar,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: { type: "text" },
		},
	},
} satisfies Meta<typeof TopNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<TopNavBarBrand>
					<a href="/">
						<img src="/vite.svg" alt="Logo" className="h-8" />
					</a>
				</TopNavBarBrand>
				<TopNavBarItems>
					<TopNavBarItem href="#home">Home</TopNavBarItem>
					<TopNavBarItem href="#about">About</TopNavBarItem>
					<TopNavBarItem href="#services">Services</TopNavBarItem>
					<TopNavBarItem href="#contact">Contact</TopNavBarItem>
				</TopNavBarItems>
				<TopNavBarActions>
					<Button variant="ghost" size="sm">Sign In</Button>
					<Button variant="filled" size="sm">Sign Up</Button>
				</TopNavBarActions>
			</>
		),
	},
};