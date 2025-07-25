import clsx from "clsx";

export type ButtonVariant = "filled" | "outlined" | "tonal";

export type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: Size;
	children: React.ReactNode;
}

function Button({
	variant = "filled",
	size = "md",
	children,
	className,
	...props
}: ButtonProps) {
	const base = "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
	const sizes = {
		sm: "h-10 px-4 text-sm",
		md: "h-12 px-6 text-base",
		lg: "h-14 px-8 text-lg",
	};

	const variants = {
		filled: "bg-primary text-white hover:bg-primary-dark",
		outlined: "border border-primary text-primary hover:bg-primary-light",
		tonal: "bg-secondary text-white hover:bg-secondary-dark",
	};

	return (
		<button className={clsx(base, sizes[size], variants[variant], className)} {...props}>
			{children}
		</button>
	);
}

export default Button;