import type { Meta, StoryObj } from '@storybook/react-vite'; // Corrected import
import FloatingActionButton from '../components/floating-action-button/FloatingActionButton';
import { useState } from 'react';

// A simple plus icon for demonstration
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'The icon to display inside the FAB.',
    },
    label: {
      control: 'text',
      description: 'The text label for the extended FAB.',
    },
    extended: {
      control: 'boolean',
      description: 'If true, the FAB will be in its extended state.',
    },
    onClick: { action: 'clicked', description: 'Callback when the button is clicked.' },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  args: {
    icon: <PlusIcon />,
    label: 'Create',
    extended: false,
  },
};

export const Extended: Story = {
  args: {
    icon: <PlusIcon />,
    label: 'Create New',
    extended: true,
  },
};

export const Interactive: Story = {
  render: (args: Parameters<typeof FloatingActionButton>[0]) => {
    const [isExtended, setIsExtended] = useState(false);
    return (
      <FloatingActionButton
        {...args}
        icon={<PlusIcon />}
        label="Create New Item"
        extended={isExtended}
        onClick={() => setIsExtended(!isExtended)}
      />
    );
  },
  args: {
    // No specific args needed here as they are managed by useState
  },
  name: 'Interactive (Click to Toggle Extended)',
};