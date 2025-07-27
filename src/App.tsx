import Skeleton from './components/skeleton/Skeleton';
import { useEffect, useState } from 'react';
import DataTable, { Alignment, type ColumnDef } from './components/datatable/DataTable';
import Button from './components/button/Button';
import { Crown, HeartPlus, Mail, Phone, PhoneCall, Trash2, User } from 'lucide-react';
import Dialog from './components/dialog/Dialog';
import CopyButton from './components/copy-button/CopyButton';
import Popover from './components/popover/Popover';
import Separator from './components/separator/Separator';

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


function App() {
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
					{/* <Button variant='ghost' className='text-nowrap flex items-center gap-1' onClick={() => window.open(`mailto:${row.email}`)}> */}
					<Button
						variant='ghost'
						className='text-nowrap flex items-center gap-1'
						onClick={() => {
							setDialogType('email');
							setIsDialogOpen(true);
							setSelectedUserData(row);
						}}>
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
					{/* <Button variant='ghost' className='text-nowrap flex items-center gap-1' onClick={() => window.open(`tel:${row.phone}`)}> */}
					<Button
						variant='ghost'
						className='text-nowrap flex items-center gap-1'
						onClick={() => {
							setDialogType('call');
							setIsDialogOpen(true);
							setSelectedUserData(row);
						}}>
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
		{
			accessorKey: 'actions', header: '', cell: ({ row }) => (
				<Popover
					trigger={
						<Button variant='ghost'>Aktionen</Button>
					}
					content={
						<div className="flex flex-col gap-1">
							<div className="text-left font-semibold ms-2"><span className="text-on-surface/50 font-normal">#{row.id}</span> {row.firstName} {row.lastName}</div>
							<Separator className="bg-outline-variant my-1" />
							<Button
								variant='ghost'
								className='justify-start'
								onClick={() => {
									setDialogType('call');
									setIsDialogOpen(true);
									setSelectedUserData(row);
								}}
							>
								<PhoneCall className='size-4 mr-2' /> Anrufen
							</Button>
							<Button
								variant='ghost'
								className='justify-start'
								onClick={() => {
									setDialogType('email');
									setIsDialogOpen(true);
									setSelectedUserData(row);
								}}
							>
								<Mail className='size-4 mr-2' /> E-Mail senden
							</Button>
							<Separator className="bg-outline-variant my-1" />
							{/* delete */}
							<Button
								variant='ghost'
								className='justify-start text-error'
								onClick={() => alert(`Löschen von ${row.firstName} ${row.lastName}`)}
							>
								<Trash2 className='size-4 mr-2' /> Löschen
							</Button>
						</div>
					}
				/>
			)
		}

	];
	const [data, setData] = useState<User[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedUserData, setSelectedUserData] = useState<User | undefined>(undefined);
	const [dialogType, setDialogType] = useState<'call' | 'email'>('call');

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
			<Dialog
				open={isDialogOpen}
				onClose={() => {
					setIsDialogOpen(false);
				}}
				classNameOverlay="bg-linear-to-b from-black/50 to-primary backdrop-blur-none!" // This line seems to be the issue.
			>
				{selectedUserData &&
					(dialogType === 'call' ?
						<ExampleCallDialog userData={selectedUserData} /> :
						<ExampleEmailDialog userData={selectedUserData} />
					)
				}
			</Dialog>

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

function ExampleCallDialog({ userData }: { userData: User }) {
	return (
		<div className="text-center">
			<div className="size-16 bg-primary flex items-center justify-center rounded-full mb-4 m-auto">
				<PhoneCall className="text-on-primary" />
			</div>
			<h1 className="text-xl font-semibold mb-2">{userData.firstName} {userData.lastName}</h1>
			{userData && <p>Calling: {userData.phone}</p>}
			<div className="flex items-center gap-1 mt-4">
				<Button
					className="w-full"
					onClick={() => alert(`Calling ${userData.phone}`)}
				>Anrufen</Button>
				<CopyButton text={userData.phone} />
			</div>
		</div>
	);
}

function ExampleEmailDialog({ userData }: { userData: User }) {
	return (
		<div className="text-center">
			<div className="size-16 bg-primary flex items-center justify-center rounded-full mb-4 m-auto">
				<Mail className="text-on-primary" />
			</div>
			<h1 className="text-xl font-semibold mb-2">{userData.firstName} {userData.lastName}</h1>
			{userData && <p><span className="font-semibold">Email:</span> {userData.email}</p>}
			<div className="flex items-center gap-1 mt-4">
				<Button
					className="w-full"
					onClick={() => window.open(`mailto:${userData.email}`)}
				>E-Mail senden</Button>
				<CopyButton text={userData.email} />
			</div>
		</div>
	);
}

export default App