import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter, FilterField } from '../components/filter/Filter';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Filter>;

const filterFields: FilterField[] = [
	{ value: "status", label: "Status", type: "select", options: ["New", "In Progress", "Resolved", "Closed", "Rejected"] },
	{ value: "priority", label: "Priority", type: "select", options: ["Low", "Normal", "High", "Urgent", "Immediate"] },
	{ value: "assignee", label: "Assignee", type: "select", options: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"] },
	{ value: "category", label: "Category", type: "select", options: ["Bug", "Feature", "Support", "Documentation"] },
	{ value: "created_date", label: "Created Date", type: "date" },
	{ value: "due_date", label: "Due Date", type: "date" },
	{ value: "subject", label: "Subject", type: "string" },
	{ value: "description", label: "Description", type: "string" },
	{ value: "estimated_hours", label: "Estimated Hours", type: "number" },
	{ value: "spent_hours", label: "Spent Hours", type: "number" },
	{ value: "is_active", label: "Is Active", type: "bool" },
];

export const Default: Story = {
  args: {
    fields: filterFields,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};