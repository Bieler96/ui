import type { Meta, StoryObj } from '@storybook/react-vite';

import DataTable, { Alignment } from '../components/datatable/DataTable';

const meta = {
	title: 'Components/DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		headerAlignment: {
			control: { type: 'select' },
			options: [Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT],
		},
		cellAlignment: {
			control: { type: 'select' },
			options: [Alignment.LEFT, Alignment.CENTER, Alignment.RIGHT],
		},
	},
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Beispieldaten für einfache Tabelle
const simpleData = [
	{ name: 'Max Mustermann', age: 30, city: 'Berlin', occupation: 'Entwickler' },
	{ name: 'Anna Schmidt', age: 25, city: 'München', occupation: 'Designerin' },
	{ name: 'Tom Weber', age: 35, city: 'Hamburg', occupation: 'Manager' },
	{ name: 'Lisa Müller', age: 28, city: 'Köln', occupation: 'Marketing' },
];

// Beispieldaten für verschachtelte Objekte
const nestedData = [
	{
		name: 'Max Mustermann',
		contact: { email: 'max@example.com', phone: '+49 123 456789' },
		address: { street: 'Musterstraße 1', city: 'Berlin', zip: '10115' },
		employment: { position: 'Entwickler', department: 'IT', salary: 65000 }
	},
	{
		name: 'Anna Schmidt',
		contact: { email: 'anna@example.com', phone: '+49 987 654321' },
		address: { street: 'Beispielweg 5', city: 'München', zip: '80331' },
		employment: { position: 'Designerin', department: 'Design', salary: 58000 }
	},
	{
		name: 'Tom Weber',
		contact: { email: 'tom@example.com', phone: '+49 555 123456' },
		address: { street: 'Hafenstraße 12', city: 'Hamburg', zip: '20457' },
		employment: { position: 'Manager', department: 'Management', salary: 75000 }
	},
];

// Beispieldaten für leere Tabelle
const emptyData: Array<Record<string, any>> = [];

// Beispieldaten für große Tabelle
const largeData = Array.from({ length: 20 }, (_, index) => ({
	id: index + 1,
	name: `Benutzer ${index + 1}`,
	email: `user${index + 1}@example.com`,
	department: ['IT', 'Marketing', 'Sales', 'HR'][index % 4],
	status: ['Aktiv', 'Inaktiv', 'Pendend'][index % 3],
	lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE'),
}));

export const Default: Story = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const NestedData: Story = {
	args: {
		data: nestedData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const LeftAligned: Story = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.LEFT,
		cellAlignment: Alignment.LEFT,
	},
};

export const CenterAligned: Story = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.CENTER,
	},
};

export const RightAligned: Story = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.RIGHT,
		cellAlignment: Alignment.RIGHT,
	},
};

export const MixedAlignment: Story = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const LargeDataset: Story = {
	args: {
		data: largeData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const EmptyTable: Story = {
	args: {
		data: emptyData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const ComplexNestedData: Story = {
	args: {
		data: [
			{
				employee: { id: 1, name: 'Max Mustermann' },
				performance: { rating: 4.5, projects: 8, reviews: 12 },
				salary: { base: 65000, bonus: 5000, total: 70000 },
				benefits: { health: 'Premium', dental: 'Standard', vision: 'Basic' }
			},
			{
				employee: { id: 2, name: 'Anna Schmidt' },
				performance: { rating: 4.8, projects: 12, reviews: 15 },
				salary: { base: 72000, bonus: 8000, total: 80000 },
				benefits: { health: 'Premium', dental: 'Premium', vision: 'Premium' }
			},
			{
				employee: { id: 3, name: 'Tom Weber' },
				performance: { rating: 4.2, projects: 6, reviews: 8 },
				salary: { base: 58000, bonus: 3000, total: 61000 },
				benefits: { health: 'Standard', dental: 'Basic', vision: 'Basic' }
			},
		],
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
}; 