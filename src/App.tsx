import { useState } from 'react';
import DataTable, { Alignment, type ColumnDef } from './components/datatable/DataTable';
import Button from './components/button/Button';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: {
		color: string;
		type: string;
	};
}

const columnsWithCustomCells: ColumnDef<User>[] = [
	{ accessorKey: 'id', header: 'ID' },
	{
		accessorKey: 'image',
		header: 'Bild',
		cell: ({ row }) => (
			<div className="w-14 flex items-center justify-center">
				<img
					src={row.image}
					alt={`${row.firstName} ${row.lastName}`}
					className="size-12"
				/>
			</div>
		)
	},
	{ accessorKey: 'firstName', header: 'Vorname' },
	{ accessorKey: 'lastName', header: 'Nachname' },
	{ accessorKey: 'maidenName', header: 'Maidenname' },
	{ accessorKey: 'age', header: 'Alter' },
	{ accessorKey: 'gender', header: 'Geschlecht' },
	{ accessorKey: 'email', header: 'E-Mail' },
	{
		accessorKey: 'phone',
		header: 'Telefon',
		cell: ({ row }) => (
			<Button variant='ghost' className='text-nowrap'>{row.phone}</Button>
		)
	},
	{ accessorKey: 'username', header: 'Benutzername' },
	{ accessorKey: 'password', header: 'Passwort' },
	{ accessorKey: 'birthDate', header: 'Geburtsdatum' },
	{ accessorKey: 'bloodGroup', header: 'Blutgruppe' },
	{ accessorKey: 'height', header: 'Größe' },
	{ accessorKey: 'weight', header: 'Gewicht' },
	{ accessorKey: 'eyeColor', header: 'Augenfarbe' },
	{ accessorKey: 'hair', header: 'Haare' },
	{ accessorKey: 'hair.color', header: 'Haarfarbe' },
	{ accessorKey: 'hair.type', header: 'Haarart' },

];

function App() {
	const [data, setData] = useState<User[]>([]);

	const fetchData = async () => {
		try {
			const response = await fetch('https://dummyjson.com/users');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			setData(result.users);
		} catch (error) {
			console.error('Fetch error:', error);
		}
	};

	fetchData();


	return (
		<div className="p-4">
			<DataTable
				data={data}
				columns={columnsWithCustomCells}
				cellAlignment={Alignment.CENTER}
			/>
		</div>
	);
}

export default App