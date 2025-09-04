import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopAppBar } from '../components/top-app-bar/TopAppBar';
import { Menu, Search, MoreVertical } from 'lucide-react';

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
