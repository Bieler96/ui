import { clsx } from 'clsx';
import { forwardRef } from 'react';

type TabProps = {
	label: string;
	value: string;
	children: React.ReactNode;
	isActive?: boolean;
	onClick?: () => void;
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(({ label, isActive, onClick }, ref) => {
	return (
		<button
			ref={ref}
			className={clsx(
				'px-4 py-2 font-medium text-on-surface-variant relative',
				isActive && 'text-primary'
			)}
			onClick={onClick}
		>
			{label}
		</button>
	);
});