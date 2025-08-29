
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type ColumnDef } from "../components/datatable/DataTable";
import {
	DataCard,
	DataCardHeader,
	DataCardTitle,
	DataCardContent,
	DataCardValue,
	DataCardDescription,
} from "../components/data-card";
import { Button } from "../components/button/Button";

interface GeraeteinfoInterface {
	id: number;
	datType: number;
	protocolVersion: number;
	firmwareVersion: string;
	inputChannels: number;
	outputChannels: number;
	isRuthmann: boolean;
	isJlg: boolean;
	isPalfinger: boolean;
	hasNoDiag: boolean;
	hasKeyFunction: boolean;
	hasEqtraceFinder: boolean;
	hasEqtraceGate: boolean;
	hasSeparateGps: boolean;
	modulRevision: number;
	modulTyp: string;
	imsi: number;
	wlanModulRevision: number;
	wlanModulTyp: string;
}

const geraeteinfos: GeraeteinfoInterface[] = [
	{
		id: 1,
		datType: 1,
		protocolVersion: 2,
		firmwareVersion: "1.2.3",
		inputChannels: 4,
		outputChannels: 2,
		isRuthmann: true,
		isJlg: false,
		isPalfinger: false,
		hasNoDiag: false,
		hasKeyFunction: true,
		hasEqtraceFinder: true,
		hasEqtraceGate: false,
		hasSeparateGps: true,
		modulRevision: 3,
		modulTyp: "CAN-Modul",
		imsi: 1234567890,
		wlanModulRevision: 1,
		wlanModulTyp: "WLAN-Modul",
	},
	{
		id: 2,
		datType: 2,
		protocolVersion: 3,
		firmwareVersion: "2.0.1",
		inputChannels: 8,
		outputChannels: 4,
		isRuthmann: false,
		isJlg: true,
		isPalfinger: false,
		hasNoDiag: true,
		hasKeyFunction: false,
		hasEqtraceFinder: true,
		hasEqtraceGate: true,
		hasSeparateGps: false,
		modulRevision: 4,
		modulTyp: "IO-Modul",
		imsi: 9876543210,
		wlanModulRevision: 2,
		wlanModulTyp: "WLAN-Modul-Advanced",
	},
	{
		id: 3,
		datType: 1,
		protocolVersion: 2,
		firmwareVersion: "1.5.0",
		inputChannels: 4,
		outputChannels: 4,
		isRuthmann: false,
		isJlg: false,
		isPalfinger: true,
		hasNoDiag: false,
		hasKeyFunction: true,
		hasEqtraceFinder: false,
		hasEqtraceGate: true,
		hasSeparateGps: true,
		modulRevision: 2,
		modulTyp: "CAN-Modul-Pro",
		imsi: 1122334455,
		wlanModulRevision: 1,
		wlanModulTyp: "WLAN-Modul",
	},
];

const columns: ColumnDef<GeraeteinfoInterface>[] = [
	{ accessorKey: "modulTyp", header: "Modultyp" },
	{ accessorKey: "firmwareVersion", header: "Firmware" },
	{ accessorKey: "protocolVersion", header: "Protokoll" },
	{
		accessorKey: "actions",
		header: "Aktionen",
		cell: ({ row }) => (
			<Button size="sm" onClick={() => alert(`Details für ${row.modulTyp} anzeigen`)}>
				Details
			</Button>
		),
	},
];

const meta: Meta = {
	title: "Views/DataView",
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const Default: StoryObj = {
	render: () => {
		const [view, setView] = useState<"table" | "card">("table");

		const toggleView = () => {
			setView(view === "table" ? "card" : "table");
		};

		return (
			<div>
				<div className="mb-4">
					<Button onClick={toggleView}>
						{view === "table" ? "Kartenansicht" : "Tabellenansicht"}
					</Button>
				</div>
				{view === "table" ? (
					<DataTable data={geraeteinfos} columns={columns} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{geraeteinfos.map((geraet) => (
							<DataCard
								key={geraet.id}
								data={geraet}
								variant="outlined"
								config={{
									visibleFields: ["modulTyp", "firmwareVersion", "protocolVersion"],
									hiddenFields: [
										"datType",
										"inputChannels",
										"outputChannels",
										{ key: "isRuthmann", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "isJlg", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "isPalfinger", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "hasNoDiag", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "hasKeyFunction", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "hasEqtraceFinder", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "hasEqtraceGate", cell: (value) => (value ? "Ja" : "Nein") },
										{ key: "hasSeparateGps", cell: (value) => (value ? "Ja" : "Nein") },
										"modulRevision",
										"imsi",
										"wlanModulRevision",
										"wlanModulTyp",
									],
								}}
							>
								<DataCardHeader>
									<DataCardTitle>Geräteinfo</DataCardTitle>
								</DataCardHeader>
								<DataCardContent>
									<DataCardValue>{(data) => `Modultyp: ${data.modulTyp}`}</DataCardValue>
									<DataCardDescription>{(data) => `Firmware: ${data.firmwareVersion}`}</DataCardDescription>
								</DataCardContent>
							</DataCard>
						))}
					</div>
				)}
			</div>
		);
	},
};
