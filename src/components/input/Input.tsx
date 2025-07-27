import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	variant?: "default" | "ghost";
}

function Input({ label, className, variant = "default", ...props }: InputProps) {
	const base =
		"w-full rounded-md transition duration-150 disabled:opacity-50 disabled:pointer-events-none";
	const size = "h-12 md:h-10 px-3 py-1 text-base";

	const variants = {
		default:
			"border border-outline-variant outline-none focus-visible:ring-primary/50 focus-visible:ring-[3px]",
		ghost: "border-none outline-none focus-visible:ring-0",
	};

	return (
		<div>
			{label && (
				<label
					htmlFor={props.id}
					className="block text-sm font-medium text-on-surface"
				>
					{label}
				</label>
			)}
			<input
				className={clsx(base, size, variants[variant], className)}
				{...props}
			/>
		</div>
	);
}

export default Input;