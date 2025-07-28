import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Confirm } from '../components/confirm/Confirm';
import Button from '../components/button/Button';

const meta: Meta<typeof Confirm> = {
  title: 'Components/Confirm',
  component: Confirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Confirm>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      alert('Confirmed!');
      setIsOpen(false);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Confirm Dialog</Button>
        <Confirm
          {...args}
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </>
    );
  },
  args: {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    confirmText: 'Yes, proceed',
    cancelText: 'No, cancel',
  },
};
