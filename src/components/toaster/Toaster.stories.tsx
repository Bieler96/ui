import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from './Toaster';
import { toast } from 'sonner';
import { Button } from '../button/Button';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast('Hello from sonner!')}>Show Toast</Button>
        <Button onClick={() => toast.success('Success toast!')}>Show Success Toast</Button>
        <Button onClick={() => toast.error('Error toast!')}>Show Error Toast</Button>
        <Button onClick={() => toast.info('Info toast!')}>Show Info Toast</Button>
        <Button onClick={() => toast.warning('Warning toast!')}>Show Warning Toast</Button>
      </div>
    </>
  ),
};
