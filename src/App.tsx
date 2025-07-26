import DataTable, { Alignment, type ColumnDef } from './components/datatable/DataTable';

interface User {
	name: string;
	alter: number;
	beruf: string;
	adresse: {
		stadt: string;
		plz: string;
	};
}

const data: User[] = [
	{
		name: "Anna",
		alter: 28,
		beruf: "Entwicklerin",
		adresse: { stadt: "Berlin", plz: "10115" },
	},
	{
		name: "Ben",
		alter: 34,
		beruf: "Designer",
		adresse: { stadt: "Hamburg", plz: "20095" },
	},
	{
		name: "Chris",
		alter: 22,
		beruf: "Student",
		adresse: { stadt: "München", plz: "80331" },
	},
	{
		name: "David",
		alter: 45,
		beruf: "Manager",
		adresse: { stadt: "Köln", plz: "50667" },
	},
	{
		name: "Eva",
		alter: 16,
		beruf: "Marketing",
		adresse: { stadt: "Frankfurt", plz: "60311" },
	},
];

const columnsWithCustomCells: ColumnDef<User>[] = [
	{ accessorKey: 'name', header: 'Name' },
	{
		accessorKey: 'alter',
		header: 'Alter',
		cell: ({ row }) => {
			const age = row.alter;
			return age >= 18 ? `${age} Jahre` : `${age} Jahre (Minderjährig)`;
		}
	},
	{ accessorKey: 'beruf', header: 'Beruf' },
	{ accessorKey: 'adresse', header: 'Adresse' },
	{ accessorKey: 'adresse.stadt', header: 'Stadt' },
	{ accessorKey: 'adresse.plz', header: "PLZ" },
];

function App() {
	return (
		<div className="p-4">
			<DataTable
				data={data}
			// columns={columnsWithCustomCells}
			// cellAlignment={Alignment.CENTER}
			/>
		</div>
	);
}

export default App