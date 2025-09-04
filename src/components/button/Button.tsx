import clsx from "clsx";
import React from "react";
import { motion } from "motion/react";

export type ButtonVariant = "filled" | "outlined" | "tonal" | "ghost";

export type Size = "sm" | "md" | "lg" | "icon";

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
	const base = "group cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:!pointer-events-none";
	const sizes = {
		sm: "h-10 md:h-9 px-4 text-sm",
		md: "h-12 md:h-10 px-6 text-base",
		lg: "h-14 md:h-11 px-8 text-lg",
		icon: "!size-10 md:!size-9 flex items-center justify-center",
	};
	const variants = {
		filled: "bg-primary text-on-primary hover:bg-primary-dark",
		outlined: "border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
		tonal: "bg-primary/20 text-primary hover:bg-primary/30 dark:hover:bg-primary/40",
		ghost: "bg-transparent text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
	};

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={clsx(base, variants[variant], className)}
		>
			<button {...props} className={clsx(sizes[size], "w-full h-full cursor-pointer")}>
				{children}
			</button>
		</motion.div>
	);
}