import React from 'react';
import clsx from "clsx";

export type CardProps = {
	variant?: 'elevated' | 'filled' | 'outlined';
} & React.ComponentProps<"div">;

export const Card = React.forwardRef<HTMLDivElement, CardProps>((
	{ variant = 'filled', children, className, ...props }, ref) => {
	const baseClasses = 'rounded-lg p-4';

	const variantClasses = {
		elevated: 'shadow shadow-md',
		filled: 'bg-surface-variant',
		outlined: 'border border-outline',
	};

	const cardClasses = clsx(baseClasses, variantClasses[variant], className);

	return <div ref={ref} className={cardClasses} {...props}>{children}</div>;
});
Card.displayName = "Card";
