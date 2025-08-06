import type { Meta, StoryObj } from '@storybook/react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '../components/accordion/Accordion'
import { useCallback, useState } from 'react'

const meta: Meta<typeof Accordion> = {
	title: 'components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	args: {
		className: 'w-96'
	}
}

export default meta

export const Default: StoryObj<typeof Accordion> = {
	render: function Render(args) {
		const [value, setValue] = useState(['item-1'])

		const onValueChange = useCallback((item: string) => {
			setValue((prev) => {
				if (prev.includes(item)) {
					return prev.filter((i) => i !== item)
				}

				return [...prev, item]
			})
		}, [])

		return (
			<Accordion {...args} onValueChange={onValueChange} value={value}>
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
			</Accordion>
		)
	}
}
