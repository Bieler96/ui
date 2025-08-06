import { createContext, forwardRef, HTMLAttributes, useContext } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

type AccordionContextProps = {
	value: string[]
	onValueChange: (value: string) => void
}

const AccordionContext = createContext<AccordionContextProps | null>(null)

const useAccordion = () => {
	const context = useContext(AccordionContext)

	if (!context) {
		throw new Error('useAccordion must be used within an Accordion')
	}

	return context
}

type AccordionProps = {
	value: string[]
	onValueChange: (value: string) => void
} & HTMLAttributes<HTMLDivElement>

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	({ children, className, value, onValueChange, ...props }, ref) => {
		return (
			<AccordionContext.Provider value={{ value, onValueChange }}>
				<div
					ref={ref}
					className={clsx('overflow-hidden rounded-lg border border-outline', className)}
					{...props}
				>
					{children}
				</div>
			</AccordionContext.Provider>
		)
	}
)

type AccordionItemContextProps = {
	value: string
}

const AccordionItemContext = createContext<AccordionItemContextProps | null>(null)

const useAccordionItem = () => {
	const context = useContext(AccordionItemContext)

	if (!context) {
		throw new Error('useAccordionItem must be used within an AccordionItem')
	}

	return context
}

type AccordionItemProps = {
	value: string
} & HTMLAttributes<HTMLDivElement>

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, className, value, ...props }, ref) => {
		return (
			<AccordionItemContext.Provider value={{ value }}>
				<div
					ref={ref}
					className={clsx('border-b last-of-type:border-b-0 border-outline', className)}
					{...props}
				>
					{children}
				</div>
			</AccordionItemContext.Provider>
		)
	}
)

export const AccordionTrigger = forwardRef<
	HTMLButtonElement,
	HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
	const { onValueChange, value: accordionValue } = useAccordion()
	const { value } = useAccordionItem()

	const isOpen = accordionValue.includes(value)

	return (
		<button
			ref={ref}
			className={clsx(
				'flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-surface-variant [&[data-state=open]>svg]:rotate-180',
				className
			)}
			onClick={() => onValueChange(value)}
			{...props}
		>
			{children}
			<ChevronDown
				className={clsx(
					'h-4 w-4 shrink-0 transition-transform duration-150',
					isOpen && 'rotate-180'
				)}
			/>
		</button>
	)
})

export const AccordionContent = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
	const { value: accordionValue } = useAccordion()
	const { value } = useAccordionItem()

	const isOpen = accordionValue.includes(value)

	if (!isOpen) {
		return
	}

	return (
		<div
			ref={ref}
			className={clsx(
				'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
				className
			)}
			{...props}
		>
			<div className="pb-4 pl-4 pr-4">{children}</div>
		</div>
	)
})
