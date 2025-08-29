import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	DataCard,
	DataCardHeader,
	DataCardTitle,
	DataCardContent,
	DataCardValue,
	DataCardDescription,
} from "../components/data-card";

const meta: Meta<typeof DataCard> = {
	title: "Components/DataCard",
	component: DataCard,
	parameters: {
		layout: "centered",
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DataCard>;

export const Default: Story = {
	render: (args) => (
		<DataCard {...args} className="w-[350px]">
			<DataCardHeader>
				<DataCardTitle>Total Revenue</DataCardTitle>
			</DataCardHeader>
			<DataCardContent>
				<DataCardValue>$45,231.89</DataCardValue>
				<DataCardDescription>+20.1% from last month</DataCardDescription>
			</DataCardContent>
		</DataCard>
	),
};

export const WithData: Story = {
	render: (args) => (
		<DataCard {...args} data={{ total: 1234, change: 12.3 }} className="w-[350px]">
			<DataCardHeader>
				<DataCardTitle>Total</DataCardTitle>
			</DataCardHeader>
			<DataCardContent>
				<DataCardValue>{(data) => `$${data.total}`}</DataCardValue>
				<DataCardDescription>{(data) => `${data.change}% from last month`}</DataCardDescription>
			</DataCardContent>
		</DataCard>
	),
};

export const WithConfig: Story = {
	render: (args) => (
		<DataCard
			{...args}
			data={{
				name: "Test User",
				email: "test@example.com",
				phone: "123-456-7890",
				company: "Example Inc.",
				department: "Engineering"
			}}
			config={{
				visibleFields: ["name", "email"],
				hiddenFields: ["phone", "company", "department"],
			}}
			className="w-[350px]"
		/>
	),
};

export interface GeraeteinfoInterface {
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

const geraeteinfo: GeraeteinfoInterface = {
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
};

export const WithGeraeteinfo: Story = {
	render: (args) => (
		<DataCard
			{...args}
			data={geraeteinfo}
			variant="outlined"
			config={{
				visibleFields: ["modulTyp", "firmwareVersion", "protocolVersion"],
				hiddenFields: [
					"datType",
					"inputChannels",
					"outputChannels",
					{ key: "isRuthmann", cell: (value) => value ? "Yes" : "No" },
					{ key: "isJlg", cell: (value) => value ? "Yes" : "No" },
					{ key: "isPalfinger", cell: (value) => value ? "Yes" : "No" },
					{ key: "hasNoDiag", cell: (value) => value ? "Yes" : "No" },
					{ key: "hasKeyFunction", cell: (value) => value ? "Yes" : "No" },
					{ key: "hasEqtraceFinder", cell: (value) => value ? "Yes" : "No" },
					{ key: "hasEqtraceGate", cell: (value) => value ? "Yes" : "No" },
					{ key: "hasSeparateGps", cell: (value) => value ? "Yes" : "No" },
					"modulRevision",
					"imsi",
					"wlanModulRevision",
					"wlanModulTyp",
				],
			}}
			className="w-[350px]"
		>
			<DataCardHeader>
				<DataCardTitle>Geraeteinfo</DataCardTitle>
			</DataCardHeader>
			<DataCardContent>
				<DataCardValue>{(data) => `Modultyp: ${data.modulTyp}`}</DataCardValue>
				<DataCardDescription>{(data) => `Firmwareversion: ${data.firmwareVersion}`}</DataCardDescription>
			</DataCardContent>
		</DataCard>
	),
};
