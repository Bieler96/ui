import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

function Input({ label, className, ...props }: InputProps) {
	const base = "w-full rounded-md border border-outline-variant outline-none transition duration-150 focus-visible:ring-primary/50 focus-visible:ring-[3px] disabled:opacity-50 disabled:pointer-events-none";
	const size = "h-12 md:h-10 px-3 py-1 text-base";

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
				className={clsx(base, size, className)}
				{...props}
			/>
		</div>
	);
}

export default Input;