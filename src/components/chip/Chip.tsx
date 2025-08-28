import React, { useState } from 'react';
import cx from 'clsx';
import { X } from 'lucide-react';

export type ChipProps = {
	variant?: 'assist' | 'filter' | 'input' | 'suggestion';
	label: string;
	icon?: React.ReactNode;
	avatar?: React.ReactNode;
	onDelete?: (e: any) => void;
	onClick?: () => void;
	selected?: boolean;
	colors?: {
		backgroundColorClass?: string;
		textColorClass?: string;
		borderColorClass?: string;
		hoverBackgroundColorClass?: string;
		selectedBackgroundColorClass?: string;
		selectedTextColorClass?: string;
		selectedBorderColorClass?: string;
		selectedHoverBackgroundColorClass?: string;
	};
};

export const Chip: React.FC<ChipProps> = ({
	variant = 'assist',
	label,
	icon,
	avatar,
	onDelete,
	onClick,
	selected,
	colors,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const baseClasses = 'text-on-surface inline-flex items-center justify-center rounded-lg border border-outline-variant px-2 py-1 text-sm text-on-surface font-medium transition-colors duration-150';

	const variantClasses = {
		assist: 'hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer',
		filter: selected
			? 'border-transparent bg-primary-container text-on-primary-container cursor-pointer'
			: ' hover:bg-gray-50 cursor-pointer',
		input: '',
		suggestion: 'hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer',
	};

	const chipClasses = cx(baseClasses, variantClasses[variant]);

	const dynamicClasses = cx({
		[colors?.backgroundColorClass ?? '']: !selected && !isHovered,
		[colors?.textColorClass ?? '']: !selected,
		[colors?.borderColorClass ?? '']: !selected,
		[colors?.hoverBackgroundColorClass ?? '']: !selected && isHovered,

		[colors?.selectedBackgroundColorClass ?? '']: selected && !isHovered,
		[colors?.selectedTextColorClass ?? '']: selected,
		[colors?.selectedBorderColorClass ?? '']: selected,
		[colors?.selectedHoverBackgroundColorClass ?? '']: selected && isHovered,
	});

	return (
		<div
			className={cx(chipClasses, dynamicClasses)}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{avatar}
			{icon && <span className="me-2">{icon}</span>}
			<span>{label}</span>
			{onDelete && (
				<button
					onClick={onDelete}
					className="ms-2 p-[0.2rem] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
				>
					<X className="size-4" />
				</button>
			)}
		</div>
	);
};