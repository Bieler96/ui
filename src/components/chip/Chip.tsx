import React, { useState } from 'react';
import cx from 'clsx';
import { X } from 'lucide-react';

export type ChipProps = {
	variant?: 'assist' | 'filter' | 'input' | 'suggestion';
	label: string;
	icon?: React.ReactNode;
	avatar?: React.ReactNode;
	onDelete?: () => void;
	onClick?: () => void;
	selected?: boolean;
	colors?: {
		backgroundColor?: string;
		textColor?: string;
		borderColor?: string;
		hoverBackgroundColor?: string;
		selectedBackgroundColor?: string;
		selectedTextColor?: string;
		selectedBorderColor?: string;
		selectedHoverBackgroundColor?: string;
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

	const baseClasses =
		'text-on-surface inline-flex items-center justify-center rounded-lg border border-outline-variant px-2 py-1 text-sm text-on-surface font-medium transition-colors duration-150';

	const variantClasses = {
		assist: 'hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer',
		filter: selected
			? 'border-transparent bg-primary-container text-on-primary-container cursor-pointer'
			: ' hover:bg-gray-50 cursor-pointer',
		input: '',
		suggestion: 'hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer',
	};

	const chipClasses = cx(baseClasses, variantClasses[variant]);

	const style: React.CSSProperties = {};

	if (selected) {
		if (colors?.selectedBackgroundColor)
			style.backgroundColor = colors.selectedBackgroundColor + ' !important';
		if (colors?.selectedTextColor)
			style.color = colors.selectedTextColor + ' !important';
		if (colors?.selectedBorderColor)
			style.borderColor = colors.selectedBorderColor + ' !important';
	} else {
		if (colors?.backgroundColor)
			style.backgroundColor = colors.backgroundColor + ' !important';
		if (colors?.textColor)
			style.color = colors.textColor + ' !important';
		if (colors?.borderColor)
			style.borderColor = colors.borderColor + ' !important';
	}

	if (isHovered) {
		if (selected && colors?.selectedHoverBackgroundColor) {
			style.backgroundColor = colors.selectedHoverBackgroundColor + ' !important';
		} else if (!selected && colors?.hoverBackgroundColor) {
			style.backgroundColor = colors.hoverBackgroundColor + ' !important';
		}
	}

	return (
		<div
			className={chipClasses}
			onClick={onClick}
			style={style}
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