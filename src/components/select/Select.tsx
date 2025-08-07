import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../checkbox/Checkbox";
import { Chip } from "../chip/Chip";

export interface SelectOption<T> {
	value: T;
	label: string;
}

export interface SelectProps<T> {
	options: SelectOption<T>[];
	value?: T | T[];
	onChange: (value: T | T[]) => void;
	multiple?: boolean;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export function Select<T>({
	options,
	value,
	onChange,
	multiple = false,
	placeholder = "Select...",
	className,
	disabled = false,
}: SelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [ref]);

	const handleSelect = (optionValue: T) => {
		if (multiple && Array.isArray(value)) {
			const newValue = value.includes(optionValue)
				? value.filter((v) => v !== optionValue)
				: [...value, optionValue];
			onChange(newValue);
		} else {
			onChange(optionValue);
			setIsOpen(false);
		}
	};

	const getLabel = (val: T) => options.find((o) => o.value === val)?.label || String(val);

	const renderValue = () => {
		if (multiple && Array.isArray(value) && value.length > 0) {
			return (
				<div className="flex flex-wrap gap-1">
					{value.map((v) => (
						<Chip variant="input" key={String(v)} onDelete={() => handleSelect(v)} label={getLabel(v)} />
					))}
				</div>
			);
		}
		if (!multiple && value !== undefined && !Array.isArray(value)) {
			return getLabel(value as T);
		}
		return <span className="text-on-surface-variant">{placeholder}</span>;
	};

	return (
		<div ref={ref} className={clsx("relative w-full", className)}>
			<div
				className={clsx(
					"flex items-center justify-between w-full rounded-lg transition duration-150 border border-outline-variant outline-none focus-visible:ring-primary/50 focus-visible:ring-[3px] px-3 py-1 min-h-[2.5rem]",
					disabled ? "opacity-50 pointer-events-none" : "cursor-pointer",
				)}
				onClick={() => !disabled && setIsOpen(!isOpen)}
			>
				<div className="flex-grow">{renderValue()}</div>
				<ChevronDown
					className={clsx(
						"w-5 h-5 text-on-surface-variant transition-transform duration-200",
						isOpen && "rotate-180"
					)}
				/>
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-surface border border-outline rounded-lg shadow-lg">
					<ul className="py-1 max-h-60 overflow-auto">
						{options.map((option) => (
							<li
								key={String(option.value)}
								className="px-3 py-2 cursor-pointer hover:bg-primary/10"
							>
								{multiple && Array.isArray(value) ? (
									<Checkbox
										checked={value.includes(option.value)}
										onChange={() => handleSelect(option.value)}
										label={option.label}
									/>
								) : (
									<span onClick={() => handleSelect(option.value)}>{option.label}</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}