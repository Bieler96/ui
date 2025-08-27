import type { Meta, StoryObj } from '@storybook/react-vite'; // Corrected import
import { useState, useEffect, useRef } from 'react';
import { FloatingActionButton } from '../components/floating-action-button/FloatingActionButton';

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

export const OnLongPage: Story = {
  render: (args) => {
    const [isExtended, setIsExtended] = useState(true); // Initial state: extended
    const lastScrollY = useRef(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsExtended(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setIsExtended(true);
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <>
        <div style={{ height: '2000px', border: '1px solid #ccc', padding: '20px' }}>
          <p>Scroll down to see the Floating Action Button.</p>
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>This is some dummy content to make the page scrollable. Line {i + 1}</p>
          ))}
          <p style={{ marginTop: '1000px' }}>End of scrollable content.</p>
        </div>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <FloatingActionButton {...args} icon={<PlusIcon />} label="Add Item" extended={isExtended} />
        </div>
      </>
    );
  },
  args: {
    // Default args for the FAB within this context
    // extended prop is now controlled by the render function
  },
  parameters: {
    layout: 'fullscreen',
  },
  name: 'On a Long Scrollable Page (Scroll-aware)',
};