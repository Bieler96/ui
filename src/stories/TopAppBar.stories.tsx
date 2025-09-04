import { TopAppBar } from '../components/top-app-bar/TopAppBar';
import { Menu, Search, MoreVertical } from 'lucide-react';
import { CustomDrawer } from '../components/custom-drawer/CustomDrawer';
import { Button } from '../components/button/Button';
import React from 'react';
import { CommandMenu, type CommandMenuItemType } from '../components/command-menu/CommandMenu';
import { useAlert } from '../hooks/useAlert';
import { useDrag } from '@use-gesture/react';
import { useSpring } from '@react-spring/web';
import type { StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'Components/TopAppBar',
	component: TopAppBar,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: CommandMenuItemType[] = [
	{
		id: "profile",
		title: "Profile",
		onSelect: () => alert("Profile selected"),
	},
	{
		id: "settings",
		title: "Settings",
		onSelect: () => alert("Settings selected"),
	},
	{
		id: "dashboard",
		title: "Dashboard",
		onSelect: () => alert("Dashboard selected"),
	},
	{
		id: "logout",
		title: "Logout",
		onSelect: () => alert("Logout selected"),
	},
];

export const Default: Story = {
	args: {
		title: 'Page Title',
		navigationIcon: <Menu />,
		actionIcons: [
			<Search />,
			<MoreVertical />,
		],
	},
};

export const Centered: Story = {
	args: {
		title: 'Page Title',
		navigationIcon: <Menu />,
		actionIcons: [
			<Search />,
			<MoreVertical />,
		],
		center: true,
	},
};

export const WithDrawerAndCommandMenu: Story = {
	args: {
		title: 'Page Title',
		navigationIcon: undefined,
		actionIcons: undefined,
	},
	render: function Render() {
		const [drawerOpen, setDrawerOpen] = React.useState(false);
		const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);
		const { alert, AlertDialog } = useAlert();

		const [{ x }, api] = useSpring(() => ({ x: -window.innerWidth })); // Manage x here

		const handleNotImplemented = () => {
			alert({ title: 'Not Implemented', message: 'This feature is not yet implemented.' });
		};

		const bind = useDrag(
			({ down, movement: [mx], velocity: [vx], direction: [dx] }) => {
				const startX = drawerOpen ? 0 : -window.innerWidth;

				if (down) {
					api.start({ x: startX + mx });
				} else {
					const openThreshold = window.innerWidth / 3;
					const velocityThreshold = 0.5;
					const shouldOpen = drawerOpen
						? !(Math.abs(mx) > openThreshold || (Math.abs(vx) > velocityThreshold && dx < 0))
						: (Math.abs(mx) > openThreshold || (Math.abs(vx) > velocityThreshold && dx > 0));

					api.start({ x: shouldOpen ? 0 : -window.innerWidth });
					setDrawerOpen(shouldOpen);
				}
			},
			{ from: () => [x.get(), 0], bounds: { left: -window.innerWidth, right: 0 }, rubberband: true }
		);

		React.useEffect(() => {
			api.start({ x: drawerOpen ? 0 : -window.innerWidth });
		}, [drawerOpen, api]);

		return (
			<div style={{ touchAction: 'pan-y', width: '100vw', height: '100vh' }}>
				<TopAppBar
					title="Page Title"
					navigationIcon={
						<Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)} className="mr-4">
							<Menu />
						</Button>
					}
					actionIcons={[
						<Button variant="ghost" size="icon" onClick={() => setCommandMenuOpen(true)}>
							<Search />
						</Button>,
						<Button variant="ghost" size="icon" onClick={handleNotImplemented}>
							<MoreVertical />
						</Button>,
					]}
				/>
				<CustomDrawer
					bind={bind}
					open={drawerOpen}
					onOpenChange={setDrawerOpen}
					direction="left"
					x={x} // Pass the SpringValue
					windowWidth={window.innerWidth} // Pass window.innerWidth
				>
					<div className="p-4">
						<h2 className="text-lg font-bold">Drawer Content</h2>
						<p>This is the content of the drawer.</p>
					</div>
				</CustomDrawer>
				<CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} items={sampleItems} />
				<AlertDialog />
			</div>
		);
	},
};
