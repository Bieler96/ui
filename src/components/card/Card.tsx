import React from 'react';
import clsx from "clsx";

export type CardProps = {
	variant?: 'elevated' | 'filled' | 'outlined';
	children: React.ReactNode;
	className?: string;
};

export const Card: React.FC<CardProps> = ({
	variant = 'filled',
	children,
	className,
}) => {
	const baseClasses = 'rounded-lg p-4';

	const variantClasses = {
		elevated: 'shadow shadow-md',
		filled: 'bg-surface-variant',
		outlined: 'border border-outline-variant',
	};

	const cardClasses = clsx(baseClasses, variantClasses[variant], className);

	return <div className={cardClasses}>{children}</div>;
};