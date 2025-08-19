import { CircleAlert, Cloud, Search } from "lucide-react";
import { Button } from "../button/Button";
import { Card } from "../card/Card";

export const EmptyState = ({ title, message, buttonText, onButtonClick }: { title: string, message: string, buttonText?: string, onButtonClick?: () => void }) => (
	<Card variant='outlined' className='border-dashed w-2xl flex flex-col gap-4 items-center justify-center py-16 group hover:bg-surface-variant/50 transition-colors duration-300 grow-hover'>
		<div className="flex flex-row">
			<Card className='!p-2 border h-fit border-outline -rotate-15 -me-4 group-hover:me-2 transition-all duration-300'><Cloud /></Card>
			<Card className='!p-2 border h-fit border-outline z-1 -mt-1 group-hover:-mt-2 transition-all duration-300'><Search /></Card>
			<Card className='!p-2 border h-fit border-outline rotate-15 -ms-4 group-hover:ms-2 transition-all duration-300'><CircleAlert /></Card>
		</div>
		<h2 className='text-2xl font-semibold'>{title}</h2>
		<p>{message}</p>
		{buttonText && <Button onClick={onButtonClick}>{buttonText}</Button>}
	</Card>
);