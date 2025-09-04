import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopAppBar } from '../components/top-app-bar/TopAppBar';
import { Menu, Search, MoreVertical } from 'lucide-react';

import { Drawer } from '../components/drawer/Drawer';
import { Button } from '../components/button/Button';
import React from 'react';

import { CommandMenu, type CommandMenuItemType } from '../components/command-menu/CommandMenu';

import { useAlert } from '../hooks/useAlert';

const meta: Meta<typeof TopAppBar> = {
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
  render: function Render() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);
    const { alert, AlertDialog } = useAlert();

    const handleNotImplemented = () => {
      alert({ title: 'Not Implemented', message: 'This feature is not yet implemented.' });
    };

    return (
      <div>
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
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          trigger={<span></span>} // The trigger is now the button in the TopAppBar
          direction="left"
        >
          <div className="p-4">
            <h2 className="text-lg font-bold">Drawer Content</h2>
            <p>This is the content of the drawer.</p>
          </div>
        </Drawer>
        <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} items={sampleItems} />
        <AlertDialog />
      </div>
    );
  },
};
