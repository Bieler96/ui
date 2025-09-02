import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Item } from '../../components/item/Item';
import { Button } from '../../components/button/Button';
import { Drawer } from '../../components/drawer/Drawer';
import { RefreshCw, Power, FileText } from 'lucide-react';
import { Status } from '../../components/status/Status';
import { useAlert } from '../../hooks/useAlert';

const meta: Meta = {
	title: 'Examples/OBS',
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type MachineGroup = {
	id: string;
	name: string;
	machines: Machine[];
}

type Machine = {
	id: string;
	name: string;
	status: 'online' | 'offline' | 'maintenance';
	cpuUsage: number; // percentage
	memoryUsage: number; // percentage
	diskUsage: number; // percentage
	uptime: string; // e.g., "5 days, 4 hours"
	lastUpdated: string; // ISO date string
}

const sampleData: MachineGroup[] = [
	{
		id: 'group1',
		name: 'Web Servers',
		machines: [
			{
				id: 'machine1',
				name: 'Web-01',
				status: 'online',
				cpuUsage: 45,
				memoryUsage: 70,
				diskUsage: 60,
				uptime: '12 days, 3 hours',
				lastUpdated: new Date().toISOString(),
			},
			{
				id: 'machine2',
				name: 'Web-02',
				status: 'maintenance',
				cpuUsage: 0,
				memoryUsage: 0,
				diskUsage: 0,
				uptime: '0 days, 0 hours',
				lastUpdated: new Date().toISOString(),
			},
		],
	},
	{
		id: 'group2',
		name: 'Database Servers',
		machines: [
			{
				id: 'machine3',
				name: 'DB-01',
				status: 'online',
				cpuUsage: 65,
				memoryUsage: 80,
				diskUsage: 75,
				uptime: '30 days, 5 hours',
				lastUpdated: new Date().toISOString(),
			},
			{
				id: 'machine4',
				name: 'DB-02',
				status: 'offline',
				cpuUsage: 0,
				memoryUsage: 0,
				diskUsage: 0,
				uptime: '0 days, 0 hours',
				lastUpdated: new Date().toISOString(),
			},
		],
	},
	{
		id: 'group3',
		name: 'Cache Servers',
		machines: [
			{
				id: 'machine5',
				name: 'Cache-01',
				status: 'online',
				cpuUsage: 25,
				memoryUsage: 50,
				diskUsage: 30,
				uptime: '60 days, 1 hour',
				lastUpdated: new Date().toISOString(),
			},
		],
	},
	{
		id: 'group4',
		name: 'Worker Servers',
		machines: [
			{
				id: 'machine6',
				name: 'Worker-01',
				status: 'online',
				cpuUsage: 80,
				memoryUsage: 60,
				diskUsage: 50,
				uptime: '2 days, 8 hours',
				lastUpdated: new Date().toISOString(),
			},
			{
				id: 'machine7',
				name: 'Worker-02',
				status: 'offline',
				cpuUsage: 0,
				memoryUsage: 0,
				diskUsage: 0,
				uptime: '0 days, 0 hours',
				lastUpdated: new Date().toISOString(),
			},
		],
	},
];

const statusColors: Record<string, string> = {
	online: 'bg-green-500',
	offline: 'bg-red-500',
	maintenance: 'bg-yellow-500',
};

const ActionItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
	<div className="flex flex-col items-center gap-2" onClick={onClick}>
		<div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center">
			{icon}
		</div>
		<span className="text-xs">{label}</span>
	</div>
);

const MachineGroupList: React.FC<{
	groups: MachineGroup[];
	onSelectGroup: (group: MachineGroup) => void;
}> = ({ groups, onSelectGroup }) => {
	return (
		<div className="p-4 space-y-4">
			<h1 className="text-2xl font-bold mb-4">Machine Groups</h1>
			<div className="flex flex-col">
				{groups.map((group, index) => (
					<Item
						key={group.id}
						label={group.name}
						description={`${group.machines.length} Machines`}
						clickable
						onClick={() => onSelectGroup(group)}
						variant={groups.length === 1 ? 'rounded' : index === 0 ? 'first' : index === groups.length - 1 ? 'last' : 'none'}
					/>
				))}
			</div>
		</div>
	);
};

const MachineList: React.FC<{
	group: MachineGroup;
	onBack: () => void;
}> = ({ group, onBack }) => {
	const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { alert } = useAlert();

	const handleMachineClick = (machine: Machine) => {
		setSelectedMachine(machine);
		setIsDrawerOpen(true);
	};

	const otherActions = selectedMachine ? [
		{ label: "Update Agent", onClick: () => alert({ title: `Updating agent on ${selectedMachine.name}`, message: "" }) },
		{ label: "Run Diagnostics", onClick: () => alert({ title: `Running diagnostics on ${selectedMachine.name}`, message: "" }) },
		{ label: "Open Terminal", onClick: () => alert({ title: `Opening terminal on ${selectedMachine.name}`, message: "" }) }
	] : [];

	return (
		<div className="p-4 space-y-4">
			<Button variant='ghost' onClick={onBack}>Back to Groups</Button>
			<h1 className="text-2xl font-bold mb-4">{group.name}</h1>
			<div className="flex flex-col">
				{group.machines.map((machine, index) => (
					<Item
						key={machine.id}
						label={machine.name}
						description={`CPU: ${machine.cpuUsage}% | Mem: ${machine.memoryUsage}% | Disk: ${machine.diskUsage}%`}
						leadingContent={
							// <div className={`w-3 h-3 rounded-full ${statusColors[machine.status]}`} />
							<Status
								ping
								// if maintenance, show degraded status
								variant={machine.status === 'maintenance' ? 'degraded' : machine.status}
							/>
						}
						variant={group.machines.length === 1 ? 'rounded' : index === 0 ? 'first' : index === group.machines.length - 1 ? 'last' : 'none'}
						clickable
						onClick={() => handleMachineClick(machine)}
					/>
				))}
			</div>
			{selectedMachine && (
				<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} trigger={<div />}>
					<div className="p-4 flex flex-col gap-4">
						<h2 className="text-2xl font-bold text-center mb-4">{selectedMachine.name}</h2>
						<div className="flex justify-around">
							<ActionItem icon={<RefreshCw />} label="Restart" onClick={() => alert({ title: `Restarting ${selectedMachine.name}`, message: "" })} />
							<ActionItem icon={<Power />} label="Shutdown" onClick={() => alert({ title: `Shutting down ${selectedMachine.name}`, message: "" })} />
							<ActionItem icon={<FileText />} label="View Logs" onClick={() => alert({ title: `Viewing logs for ${selectedMachine.name}`, message: "" })} />
						</div>
						<div>
							<div className="flex flex-col">
								{otherActions.map((action, index) => (
									<Item
										key={action.label}
										label={action.label}
										clickable
										onClick={action.onClick}
										variant={otherActions.length === 1 ? 'rounded' : index === 0 ? 'first' : index === otherActions.length - 1 ? 'last' : 'none'}
									/>
								))}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<Button className='h-12' onClick={() => alert({ title: `Restarting ${selectedMachine.name}`, message: "" })}>
								<div className='flex flex-row items-center gap-2'>
									<RefreshCw className="size-4" />Restart
								</div>
							</Button>
							<Button className='h-12' onClick={() => alert({ title: `Shutting down ${selectedMachine.name}`, message: "" })}>
								<div className='flex flex-row items-center gap-2'>
									<Power className="size-4" />Shutdown
								</div>
							</Button>
						</div>
					</div>
				</Drawer>
			)}
		</div>
	);
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [selectedGroup, setSelectedGroup] = useState<MachineGroup | null>(null);

		if (selectedGroup) {
			return <MachineList group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
		}

		return <MachineGroupList groups={sampleData} onSelectGroup={setSelectedGroup} />;
	},
};