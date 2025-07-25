import DataTable, { Alignment } from './components/datatable/DataTable';

const data = [
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
];

function App() {
	return (
		<div className="p-4">
			<DataTable
				data={data}
				cellAlignment={Alignment.CENTER}
			/>
		</div>
	);
}

export default App