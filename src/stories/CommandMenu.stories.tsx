import type { Meta, StoryObj } from '@storybook/react';
import CommandMenu from '../components/command-menu/CommandMenu';

const meta: Meta<typeof CommandMenu> = {
  title: 'Components/CommandMenu',
  component: CommandMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandMenu>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-center">Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">⌘ + K</kbd> to open the command menu.</p>
      <CommandMenu />
    </div>
  ),
};
