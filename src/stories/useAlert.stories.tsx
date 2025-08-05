
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useAlert } from '../hooks/useAlert';
import { Button } from '../components/button/Button';

const meta: Meta<typeof useAlert> = {
    title: 'Hooks/useAlert',
};

export default meta;

const Template = () => {
    const { alert, AlertDialog } = useAlert();

    const handleAlert = async () => {
        await alert({
            title: 'Alert',
            message: 'This is an alert message.',
        });
    };

    return (
        <div>
            <Button onClick={handleAlert}>Show Alert</Button>
            <AlertDialog />
        </div>
    );
};

export const Default: StoryObj = {
    render: Template,
};
