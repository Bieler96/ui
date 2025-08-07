import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../checkbox/Checkbox";
import { Chip } from "../chip/Chip";
import { CommandMenuItem } from "../command-menu/CommandMenuItem";
import { Popover } from "../popover/Popover";

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
				<div className="h-fit flex flex-wrap gap-1">
					{value.map((v) => (
						<Chip variant="input" key={String(v)} onDelete={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleSelect(v);
						}} label={getLabel(v)} />
					))}
				</div>
			);
		}
		if (!multiple && value !== undefined && !Array.isArray(value)) {
			return getLabel(value as T);
		}
		return <span className="text-on-surface-variant">{placeholder}</span>;
	};

	const popoverContent = (
		<ul className="py-1 max-h-60 overflow-auto">
			{options.map((option) => (
				<CommandMenuItem
					key={String(option.value)}
					onSelect={() => handleSelect(option.value)}
				>
					{multiple && Array.isArray(value) ? (
						<Checkbox
							checked={value.includes(option.value)}
							onChange={() => handleSelect(option.value)}
							label={option.label}
						/>
					) : (
						<span>{option.label}</span>
					)}
				</CommandMenuItem>
			))}
		</ul>
	);

	return (
		<Popover
			fullWidth
			open={isOpen}
			onOpenChange={setIsOpen}
			className={clsx("w-full", className)}
			placement="bottom-start"
			trigger={
				<div
					className={clsx(
						"flex items-center justify-between w-full rounded-lg transition duration-150 border border-outline-variant outline-none focus-visible:ring-primary/50 focus-visible:ring-[3px] px-1 py-1 min-h-[2.5rem]",
						disabled ? "opacity-50 pointer-events-none" : "cursor-pointer",
					)}
				>
					<div className="flex-grow w-full">{renderValue()}</div>
					<ChevronDown
						className={clsx(
							"w-5 h-5 text-on-surface-variant transition-transform duration-200",
							isOpen && "rotate-180"
						)}
					/>
				</div>
			}
			content={popoverContent}
		/>
	);
}