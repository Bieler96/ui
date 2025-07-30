import clsx from "clsx";
import React from "react";

export type ButtonVariant = "filled" | "outlined" | "tonal" | "ghost";

export type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: Size;
	children: React.ReactNode;
}

export function Button({
	variant = "filled",
	size = "md",
	children,
	className,
	...props
}: ButtonProps) {
	const base = "cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";
	const sizes = {
		sm: "h-10 md:h-9 px-4 text-sm",
		md: "h-12 md:h-10 px-6 text-base",
		lg: "h-14 md:h-11 px-8 text-lg",
	};

	const variants = {
		filled: "bg-primary text-on-primary hover:bg-primary-dark",
		outlined: "border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
		tonal: "bg-primary/20 text-primary hover:bg-primary/30 dark:hover:bg-primary/40",
		ghost: "bg-transparent text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
	};

	return (
		<button className={clsx(base, sizes[size], variants[variant], className)} {...props}>
			{children}
		</button>
	);
}