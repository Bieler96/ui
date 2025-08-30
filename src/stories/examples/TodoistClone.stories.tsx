import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopNavBar, TopNavBarBrand, TopNavBarItems } from '../../components/top-nav-bar';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { Item } from '../../components/item/Item';
import { Separator } from '../../components/separator/Separator';
import { Chip } from '../../components/chip/Chip';
import { EmptyState } from '../../components/empty-state/EmptyState';
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon, InboxIcon, LayoutGridIcon, MoonIcon, PlusIcon, SunIcon } from 'lucide-react';
import {
	CommandMenu,
	type CommandMenuGroupType,
	type CommandMenuItemType
} from '../../components/command-menu/CommandMenu';

const meta: Meta = {
	title: 'Examples/TodoistClone',
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Todo = {
	id: number;
	text: string;
	completed: boolean;
	date: string;
};

const TodoItem = ({ todo, onToggle }: { todo: Todo, onToggle: (id: number) => void }) => (
	<div className={`flex items-center p-2 rounded-md hover:bg-primary-container ${todo.completed ? 'text-gray-500 line-through' : ''}`}>
		<Checkbox
			checked={todo.completed}
			onChange={() => onToggle(todo.id)}
		/>
		<span className="flex-grow mx-2">{todo.text}</span>
		<Chip label={todo.date} />
	</div>
);

const projects = [
	{
		id: 'personal',
		label: 'Personal',
		description: 'My personal tasks and errands.',
		icon: '📁'
	},
	{
		id: 'work',
		label: 'Work',
		description: 'Tasks related to my job.',
		icon: '💼'
	},
	{
		id: 'health',
		label: 'Health',
		description: 'Health and fitness goals.',
		icon: '🍏'
	}
];

const TodoistClone = () => {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, text: 'Design the new UI Mockups', completed: false, date: 'Today' },
		{ id: 2, text: 'Develop the main feature', completed: false, date: 'Tomorrow' },
		{ id: 3, text: 'Write documentation', completed: true, date: 'Yesterday' },
	]);
	const [newTodo, setNewTodo] = useState('');
	const [projectsOpen, setProjectsOpen] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const newTodoInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const handleAddTodo = () => {
		if (newTodo.trim() !== '') {
			setTodos([
				...todos,
				{
					id: Date.now(),
					text: newTodo,
					completed: false,
					date: 'Today',
				},
			]);
			setNewTodo('');
		}
	};

	const handleToggleTodo = (id: number) => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const upcomingTodos = todos.filter(todo => !todo.completed);
	const completedTodos = todos.filter(todo => todo.completed);

	const commandMenuGroups: CommandMenuGroupType[] = [
		{
			id: 'tasks',
			heading: 'Tasks',
			items: [
				{
					id: 'add-task',
					title: '⊕ Add new task',
					onSelect: () => newTodoInputRef.current?.focus(),
				},
			],
		},
		{
			id: 'navigation',
			heading: 'Navigation',
			items: [
				{ id: 'inbox', title: '📥 Go to Inbox', onSelect: () => alert('Inbox selected') },
				{ id: 'today', title: '📅 Go to Today', onSelect: () => alert('Today selected') },
				{ id: 'upcoming', title: '📅 Go to Upcoming', onSelect: () => alert('Upcoming selected') },
			],
		},
		{
			id: 'projects',
			heading: 'Projects',
			items: [
				...projects.map(project => ({
					id: project.id,
					title: `${project.icon} Go to ${project.label}`,
					onSelect: () => alert(`${project.label} selected`)
				}))
			],
		},
		{
			id: 'theme',
			heading: 'Theme',
			items: [
				{
					id: 'toggle-dark-mode',
					// füge emojies hinzu
					title: `${isDarkMode ? "☀️" : "🌙"} Toggle Theme`,
					onSelect: () => setIsDarkMode(!isDarkMode),
				},
			],
		},
	];


	return (
		<div className="w-full h-screen flex flex-col">
			<CommandMenu groups={commandMenuGroups} />
			<TopNavBar>
				<TopNavBarBrand>
					<a href="#" className="flex items-center">
						<LayoutGridIcon className="h-6 w-6 mr-2" />
						<span className="font-semibold">Todoist</span>
					</a>
				</TopNavBarBrand>
				<TopNavBarItems>
					<Input placeholder="Search..." className="w-64" />
					<Button variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)}>
						{isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
					</Button>
				</TopNavBarItems>
			</TopNavBar>
			<div className="flex flex-grow">
				<div className="w-80 p-4 border-r border-outline">
					<Item
						leadingContent={<InboxIcon className="h-5 w-5" />}
						label="Inbox"
						description="All tasks"
						variant="first"
						clickable
					/>
					<Item
						leadingContent={<CalendarIcon className="h-5 w-5" />}
						label="Today"
						description="Tasks due today"
						variant="none"
						clickable
					/>
					<Item
						leadingContent={<CalendarIcon className="h-5 w-5" />}
						label="Upcoming"
						description="Future tasks"
						variant="last"
						clickable
					/>
					<Separator className="my-4" />
					<div className="flex items-center cursor-pointer p-2 rounded-md" onClick={() => setProjectsOpen(!projectsOpen)}>
						{projectsOpen ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
						<h3 className="font-semibold ml-2">Projects</h3>
					</div>
					{projectsOpen && (
						<div className="mt-2 ml-4">
							{projects.map((project, index) => (
								<Item
									key={project.id}
									leadingContent={project.icon}
									label={project.label}
									description={project.description}
									variant={index === 0 ? 'first' : index === projects.length - 1 ? 'last' : 'none'}
									clickable
								/>
							))}
						</div>
					)}
				</div>

				<div className="flex-grow p-10 overflow-y-auto">
					<h2 className="text-2xl font-bold mb-6">Inbox</h2>
					{upcomingTodos.length > 0 ? (
						upcomingTodos.map(todo => (
							<TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} />
						))
					) : (
						<EmptyState
							title="All clear!"
							message="You have no upcoming tasks."
						/>
					)}

					{completedTodos.length > 0 && (
						<>
							<Separator className="my-6" />
							<h2 className="text-lg font-semibold mb-4">Completed</h2>
							{completedTodos.map(todo => (
								<TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} />
							))}
						</>
					)}
					<div className="mt-6 w-full">
						<div className="flex flex-row items-center w-full gap-1">
							<div className="w-full">
								<Input
									ref={newTodoInputRef}
									placeholder="Add a new task..."
									value={newTodo}
									onChange={(e) => setNewTodo(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
								/>
							</div>
							<Button onClick={handleAddTodo}>
								<PlusIcon className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

type Story = StoryObj<typeof TodoistClone>;

export const Default: Story = {
	render: () => <TodoistClone />,
};