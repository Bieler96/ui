import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DataTable, Alignment, type ColumnDef, type DataTableProps } from '../components/datatable/DataTable';
import { Button } from '../components/button/Button';
import { Status, type StatusProps } from '../components/status/Status';

const meta: Meta<typeof DataTable> = {
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
};

export default meta;

// Beispieldaten für einfache Tabelle
const simpleData = [
	{ name: 'Max Mustermann', age: 30, city: 'Berlin', occupation: 'Entwickler', status: 'approved' },
	{ name: 'Anna Schmidt', age: 25, city: 'München', occupation: 'Designerin', status: 'in-progress' },
	{ name: 'Tom Weber', age: 35, city: 'Hamburg', occupation: 'Manager', status: 'rejected' },
	{ name: 'Lisa Müller', age: 28, city: 'Köln', occupation: 'Marketing', status: 'approved' },
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

export const Default: StoryObj<typeof DataTable> = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const NestedData: StoryObj<typeof DataTable> = {
	args: {
		data: nestedData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const LeftAligned: StoryObj<typeof DataTable> = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.LEFT,
		cellAlignment: Alignment.LEFT,
	},
};

export const CenterAligned: StoryObj<typeof DataTable> = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.CENTER,
	},
};

export const RightAligned: StoryObj<typeof DataTable> = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.RIGHT,
		cellAlignment: Alignment.RIGHT,
	},
};

export const MixedAlignment: StoryObj<typeof DataTable> = {
	args: {
		data: simpleData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const LargeDataset: StoryObj<typeof DataTable> = {
	args: {
		data: largeData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const EmptyTable: StoryObj<typeof DataTable> = {
	args: {
		data: emptyData,
		headerAlignment: Alignment.CENTER,
		cellAlignment: Alignment.LEFT,
	},
};

export const ComplexNestedData: StoryObj<typeof DataTable> = {
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

// Erstellen Sie einen spezifischen Typ für die Daten und die Story, um die Typsicherheit zu gewährleisten.
type SimpleData = (typeof simpleData)[0];
type SimpleDataStory = StoryObj<DataTableProps<SimpleData>>;

const statusMapping: { [key: string]: { variant: StatusProps['variant'], text: string, ping?: boolean } } = {
	'approved': { variant: 'online', text: 'Genehmigt', ping: true },
	'in-progress': { variant: 'maintenance', text: 'In Bearbeitung', ping: true },
	'rejected': { variant: 'offline', text: 'Abgelehnt', ping: true },
};

const columnsWithCustomCells: ColumnDef<(typeof simpleData)[0]>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => React.createElement('span', { className: 'font-bold' }, row.name),
	},
	{
		accessorKey: 'age',
		header: 'Alter',
		cell: ({ row }) => React.createElement('span', null, `${row.age} Jahre`),
	},
	{
		accessorKey: 'city',
		header: 'Stadt',
	},
	{
		accessorKey: 'occupation',
		header: 'Beruf',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const statusInfo = statusMapping[row.status];
			if (!statusInfo) return null;
			return React.createElement(Status, { variant: statusInfo.variant, text: statusInfo.text, ping: statusInfo.ping });
		}
	},
	{
		accessorKey: 'actions',
		header: 'Aktionen',
		cell: ({ row }) =>
			React.createElement(
				'div',
				{ className: 'flex gap-2' },
				React.createElement(Button, { size: 'sm', onClick: () => alert(`Bearbeite ${row.name}`), children: 'Bearbeiten' }),
				React.createElement(Button, { size: 'sm', variant: 'tonal', onClick: () => alert(`Lösche ${row.name}`), children: 'Löschen' }),
			),
	},
];

export const WithCustomCells: SimpleDataStory = {
	args: {
		data: simpleData,
		columns: columnsWithCustomCells,
	},
};