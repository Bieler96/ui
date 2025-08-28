import type { Meta, StoryObj } from '@storybook/react-vite';
import { Status } from '../components/status/Status';

const meta: Meta<typeof Status> = {
    component: Status,
    title: 'Components/Status',
    argTypes: {
        variant: {
            control: {
                type: 'select',
            },
            options: ['online', 'offline', 'maintenance', 'degraded'],
        },
    }
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Online: Story = {
    args: {
        variant: 'online',
        text: 'Online',
    },
};

export const Offline: Story = {
    args: {
        variant: 'offline',
        text: 'Offline',
    },
};

export const Maintenance: Story = {
    args: {
        variant: 'maintenance',
        text: 'Maintenance',
    },
};

export const Degraded: Story = {
    args: {
        variant: 'degraded',
        text: 'Degraded',
    },
};
