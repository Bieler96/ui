import type { Meta, StoryObj } from '@storybook/react';
import { useConfirm } from '../hooks/useConfirm';
import { useToast } from '../hooks/useToast';
import { Toaster } from '../components/toaster/Toaster';
import Button from '../components/button/Button';

const meta: Meta<typeof useConfirm> = {
  title: 'Hooks/useConfirm',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof useConfirm>;

export const Default: Story = {
  render: () => {
    const { confirm, ConfirmationDialog } = useConfirm();
    const { toast } = useToast();

    const handleDelete = async () => {
      const confirmed = await confirm({
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      });

      if (confirmed) {
        toast.success('Item deleted successfully!');
      } else {
        toast.info('Deletion cancelled.');
      }
    };

    return (
      <>
        <Toaster />
        <ConfirmationDialog />
        <Button onClick={handleDelete}>Delete Item</Button>
      </>
    );
  },
};
