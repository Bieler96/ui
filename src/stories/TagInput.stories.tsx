import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TagInput } from '../components/tag-input/TagInput';

const meta: Meta<typeof TagInput> = {
    component: TagInput,
    title: 'Components/TagInput',
    render: (args) => {
        const [tags, setTags] = useState(args.tags);
        return <TagInput {...args} tags={tags} setTags={setTags} />;
    }
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
    args: {
        tags: ['React', 'TypeScript'],
        placeholder: 'Add a tag',
    },
};