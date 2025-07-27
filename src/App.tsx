import Skeleton from './components/skeleton/Skeleton';
import { useEffect, useState } from 'react';
import DataTable, { Alignment, type ColumnDef } from './components/datatable/DataTable';
import Button from './components/button/Button';
import { Crown, HeartPlus, Mail, Phone, User } from 'lucide-react';

interface User {
	id: number;
	role: string;
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
		accessorKey: 'role',
		header: 'Rolle',
		cell: ({ row }) => {
			if (row.role === 'admin') {
				return <span className='flex items-center gap-1'><Crown className='text-primary' />{row.role}</span>;
			}
			if (row.role === 'moderator') {
				return <span className='flex items-center gap-1'><HeartPlus className='text-error' />{row.role}</span>;
			}
			return <span className='flex items-center gap-1'><User className='text-info' />{row.role}</span>;
		}
	},
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
	{
		accessorKey: 'email',
		header: 'E-Mail',
		cell: ({ row }) => (
			<div className="w-full flex items-start">
				<Button variant='ghost' className='text-nowrap flex items-center gap-1' onClick={() => window.open(`mailto:${row.email}`)}>
					<Mail className='size-4' /> {row.email}
				</Button>
			</div>
		)
	},
	{
		accessorKey: 'phone',
		header: 'Telefon',
		cell: ({ row }) => (
			<div className="w-full flex items-start">
				<Button variant='ghost' className='text-nowrap flex items-center gap-1' onClick={() => window.open(`tel:${row.phone}`)}>
					<Phone className='size-4' /> {row.phone}
				</Button>
			</div>
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
			setTimeout(async () => {
				const response = await fetch('https://dummyjson.com/users');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const result = await response.json();
				setData(result.users);
			}, 0); // Simulate loading delay
		} catch (error) {
			console.error('Fetch error:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const isLoading = data.length === 0;

	return (
		<div className="p-4">
			{isLoading ? (
				<div className="space-y-2">
					{Array.from({ length: 10 }).map((_, i) => (
						<Skeleton key={i} className={"h-10 w-full"} delay={i * 100} />
					))}
				</div>
			) : (
				<DataTable
					data={data}
					columns={columnsWithCustomCells}
					cellAlignment={Alignment.CENTER}
				/>
			)}
		</div>
	);
}

export default App