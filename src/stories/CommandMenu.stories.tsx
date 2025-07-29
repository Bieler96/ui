import type { Meta, StoryObj } from '@storybook/react';
import { CommandMenu } from '../components/command-menu/CommandMenu';

const meta: Meta<typeof CommandMenu> = {
  title: 'Components/CommandMenu',
  component: CommandMenu,
};

export default meta;
type Story = StoryObj<typeof CommandMenu>;

export const Default: Story = {};