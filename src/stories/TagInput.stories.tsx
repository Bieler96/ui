
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

export const WithSuggestions: Story = {
    args: {
        tags: ['React', 'TypeScript'],
        placeholder: 'Add a tag',
        suggestions: [
            'JavaScript', 'Next.js', 'Storybook', 'Tailwind CSS', 'Vite',
            'Webpack', 'Babel', 'CSS', 'HTML', 'Node.js', 'Express.js',
            'GraphQL', 'Apollo', 'Redux', 'MobX', 'Vue.js',
            'Angular', 'Svelte', 'Ember.js', 'Backbone.js',
            'jQuery', 'Bootstrap', 'Material-UI', 'Ant Design',
            'Chakra UI', 'Semantic UI', 'Foundation', 'Bulma',
            'Tailwind', 'PostCSS', 'Sass', 'Less', 'Stylus',
            'CSS Modules', 'Styled Components', 'Emotion', 'JSS',
            'Figma', 'Sketch', 'Adobe XD', 'InVision', 'Zeplin',
            'Framer', 'Webflow', 'Gatsby', 'Nuxt.js',
            'Eleventy', 'Hugo', 'Jekyll', 'Gridsome',
            'Astro', '11ty', 'Parcel', 'Rollup', 'Snowpack',
            'esbuild', 'Turbopack', 'Vercel', 'Netlify',
            'Firebase', 'AWS Amplify', 'Azure Static Web Apps',
        ],
    },
};
