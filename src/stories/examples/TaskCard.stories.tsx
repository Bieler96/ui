import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../components/card/Card';
import { Chip } from '../../components/chip/Chip';
import { Check, Play } from 'lucide-react';

const meta: Meta = {
	title: 'Examples/TaskCard',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllTaskCards: Story = {
	render: (args, context) => {
		return (
			<div className="flex flex-col gap-4">
				{TaskCardDone.render && TaskCardDone.render(args, context)}
				{TaskCardInProgress.render && TaskCardInProgress.render(args, context)}
				{TaskCardTodo.render && TaskCardTodo.render(args, context)}
			</div>
		);
	}
};

export const TaskCardTodo: Story = {
	render: () => {
		return (
			<Card className='w-[800px] dark:!bg-gray-500/20 border dark:border-gray-500'>
				<div className="flex flex-row items-start gap-2">
					<div className="size-6 bg-gray-500 rounded-full mt-1"></div>

					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-row items-center justify-between gap-2 w-full">
							<div className='font-bold dark:text-gray-300'>Task 3</div>
						</div>

						<div className='dark:text-gray-400'>Styling the application with Tailwind CSS</div>
						<div className="flex flex-row gap-1">
							<div className='text-gray-200 font-bold'>Requirements:</div>
							<div className='text-gray-200 '>1.1, 2.1</div>
						</div>
					</div>
				</div>
			</Card>
		);
	}
};

export const TaskCardInProgress: Story = {
	render: () => {
		return (
			<Card className='w-[800px] dark:!bg-blue-500/20 border dark:border-blue-500'>
				<div className="flex flex-row items-start gap-2">
					<div className="size-6 bg-blue-500 rounded-full mt-1 flex items-center justify-center">
						<Play className='size-4 dark:text-green-100' />
					</div>

					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-row items-center justify-between gap-2 w-full">
							<div className='font-bold dark:text-blue-300'>Task 2</div>
							<div className="w-fit">
								<Chip
									variant="suggestion"
									label='In Progress'
									colors={{
										backgroundColorClass: 'bg-blue-500',
										hoverBackgroundColorClass: '!bg-blue-500',
										borderColorClass: '!border-blue-500',
									}}
								/>
							</div>
						</div>

						<div className='dark:text-blue-400'>Create basic functionality for the application</div>
						<div className="flex flex-row gap-1">
							<div className='text-blue-200 font-bold'>Requirements:</div>
							<div className='text-blue-200 '>1.1, 2.1</div>
						</div>
					</div>
				</div>
			</Card>
		);
	}
};

export const TaskCardDone: Story = {
	render: () => {
		return (
			<Card className='w-[800px] dark:!bg-green-500/20 border dark:border-green-500'>
				<div className="flex flex-row items-start gap-2">
					<div className="size-6 bg-green-500 rounded-full mt-1 flex items-center justify-center">
						<Check className='size-4 dark:text-green-100' />
					</div>

					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-row items-center justify-between gap-2 w-full">
							<div className='font-bold dark:text-green-300'>Task 1</div>
							<div className="w-fit">
								<Chip
									variant="suggestion"
									label='Done'
									colors={{
										backgroundColorClass: 'bg-green-500',
										hoverBackgroundColorClass: '!bg-green-500',
										borderColorClass: '!border-green-500'
									}}
								/>
							</div>
						</div>

						<div className='dark:text-green-400'>Create project structure and dependencies file</div>
						<div className="flex flex-row gap-1">
							<div className='text-green-200 font-bold'>Requirements:</div>
							<div className='text-green-200 '>1.1, 2.1</div>
						</div>
					</div>
				</div>
			</Card>
		);
	}
};