import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '../components/accordion/Accordion'

const meta: Meta<typeof Accordion> = {
	title: 'components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	args: {
		className: 'w-96'
	}
}

export default meta

const AccordionItems = () => (
	<>
		<AccordionItem value="item-1">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent>
				Yes. It adheres to the WAI-ARIA design pattern.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Is it styled?</AccordionTrigger>
			<AccordionContent>
				Yes. It comes with default styles that matches the other components'
				aesthetic.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Is it animated?</AccordionTrigger>
			<AccordionContent>
				Yes. It's animated by default, but you can disable it if you prefer.
			</AccordionContent>
		</AccordionItem>
	</>
)

export const Default: StoryObj<typeof Accordion> = {
	args: {
		type: 'multiple',
		defaultValue: ['item-1'],
		children: <AccordionItems />
	}
}

export const Single: StoryObj<typeof Accordion> = {
	args: {
		type: 'single',
		collapsible: true,
		defaultValue: 'item-1',
		children: <AccordionItems />
	}
}
