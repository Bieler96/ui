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
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon, InboxIcon, LayoutGridIcon, MoonIcon, PlusIcon, SunIcon, Trash2Icon } from 'lucide-react';
import {
	CommandMenu,
	type CommandMenuGroupType,
} from '../../components/command-menu/CommandMenu';
import { useConfirm } from '../../hooks/useConfirm';
import { useToast } from '../../hooks/useToast';
import { Toaster } from '../../components/toaster/Toaster';
import { deleteData, initDB, loadData, saveData } from '../../lib/db';
import Magnet from '../../components/magnetic/Magnetic';

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

type ProjectType = {
	id: string;
	label: string;
	description: string;
	icon: string;
};

type SettingsType = {
	key: string;
	value: any;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: { todo: Todo, onToggle: (id: number) => void, onDelete: (id: number) => void, onEdit: (id: number, text: string) => void }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [isEditing]);

	const handleSave = () => {
		if (editText.trim() !== '' && editText.trim() !== todo.text) {
			onEdit(todo.id, editText);
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	return (
		<div className={`group flex items-center p-2 rounded-md hover:bg-primary-container ${todo.completed ? 'text-gray-500 line-through' : ''}`}>
			<Checkbox
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
			/>
			{isEditing ? (
				<div className="w-full px-2">
					<Input
						ref={inputRef}
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onBlur={handleSave}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSave();
							if (e.key === 'Escape') handleCancel();
						}}
					/>
				</div>
			) : (
				<span className="flex-grow mx-2 cursor-pointer" onClick={() => setIsEditing(true)}>{todo.text}</span>
			)}
			<Chip label={todo.date} />
			<Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" onClick={() => onDelete(todo.id)}>
				<Trash2Icon className="h-4 w-4" />
			</Button>
		</div>
	);
}

const initialProjects: ProjectType[] = [
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

const initialTodos: Todo[] = [
	{ id: 1, text: 'Design the new UI Mockups', completed: false, date: 'Today' },
	{ id: 2, text: 'Develop the main feature', completed: false, date: 'Tomorrow' },
	{ id: 3, text: 'Write documentation', completed: true, date: 'Yesterday' },
];

const TodoistClone = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [newTodo, setNewTodo] = useState('');
	const [projectsOpen, setProjectsOpen] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [dbReady, setDbReady] = useState(false);
	const [initialLoadComplete, setInitialLoadComplete] = useState(false);

	const newTodoInputRef = useRef<HTMLInputElement>(null);
	const { confirm, ConfirmationDialog } = useConfirm();
	const { toast } = useToast();

	useEffect(() => {
		const initialize = async () => {
			await initDB();
			setDbReady(true);
		};
		initialize();
	}, []);

	useEffect(() => {
		if (!dbReady) return;

		const loadInitialData = async () => {
			// Load Todos
			const storedTodos = await loadData<Todo>('todos');
			if (storedTodos.length > 0) {
				setTodos(storedTodos);
			} else {
				initialTodos.forEach(todo => saveData('todos', todo));
				setTodos(initialTodos);
			}

			// Load Projects
			const storedProjects = await loadData<ProjectType>('projects');
			if (storedProjects.length > 0) {
				setProjects(storedProjects);
			} else {
				initialProjects.forEach(project => saveData('projects', project));
				setProjects(initialProjects);
			}

			// Load Theme
			const themeSetting = await loadData<SettingsType>('settings');
			const theme = themeSetting.find(s => s.key === 'theme');
			if (theme) {
				setIsDarkMode(theme.value === 'dark');
			} else {
				saveData('settings', { key: 'theme', value: 'dark' });
				setIsDarkMode(true);
			}
			setInitialLoadComplete(true);
		};

		loadInitialData();
	}, [dbReady]);


	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	useEffect(() => {
		if (initialLoadComplete) {
			saveData('settings', { key: 'theme', value: isDarkMode ? 'dark' : 'light' });
		}
	}, [isDarkMode, initialLoadComplete]);

	const handleAddTodo = async () => {
		if (newTodo.trim() !== '') {
			const newTodoItem = {
				id: Date.now(),
				text: newTodo,
				completed: false,
				date: 'Today',
			};
			await saveData('todos', newTodoItem);
			setTodos([...todos, newTodoItem]);
			setNewTodo('');
			toast.success(`Task "${newTodoItem.text}" added!`);
		}
	};

	const handleToggleTodo = async (id: number) => {
		const todoToToggle = todos.find(t => t.id === id);
		if (!todoToToggle) return;

		const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
		await saveData('todos', updatedTodo);
		setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
	};

	const handleDeleteTodo = async (id: number) => {
		const todoToDelete = todos.find(todo => todo.id === id);
		if (!todoToDelete) return;

		const confirmed = await confirm({
			title: 'Delete Task',
			message: `Are you sure you want to delete "${todoToDelete.text}"? This action cannot be undone.`,
			confirmText: 'Delete',
			cancelText: 'Cancel',
		});

		if (confirmed) {
			await deleteData('todos', id);
			setTodos(todos.filter(todo => todo.id !== id));
			toast.success(`Task "${todoToDelete.text}" deleted.`);
		} else {
			toast.info('Deletion cancelled.');
		}
	};

	const handleEditTodo = async (id: number, newText: string) => {
		const todoToEdit = todos.find(t => t.id === id);
		if (!todoToEdit) return;

		const updatedTodo = { ...todoToEdit, text: newText };
		await saveData('todos', updatedTodo);
		setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
		toast.success('Task updated!');
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
					title: `${isDarkMode ? "☀️" : "🌙"} Toggle Theme`,
					onSelect: () => setIsDarkMode(!isDarkMode),
				},
			],
		},
	];

	if (!initialLoadComplete) {
		return null;
	}

	return (
		<div className="w-full h-screen flex flex-col">
			<Toaster />
			<ConfirmationDialog />
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
			<div className="flex flex-grow h-full overflow-hidden">
				<div className="w-80 p-4 border-r border-outline overflow-y-auto">
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
					{projectsOpen && projects.length > 0 && (
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
							<TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
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
								<TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
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
							<Magnet padding={10} magnetStrength={5}>
								<Button onClick={handleAddTodo}>
									<PlusIcon className="h-5 w-5" />
								</Button>
							</Magnet>
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