import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export interface PopoverProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	onHover?: boolean;
	className?: string;
}

function Popover({
	trigger,
	content,
	onHover = false,
	className,
}: PopoverProps) {
	const [open, setOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<number | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			popoverRef.current &&
			!popoverRef.current.contains(event.target as Node)
		) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (!onHover && open) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [open, onHover]);

	const handleMouseEnter = () => {
		if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		setOpen(true);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = window.setTimeout(() => setOpen(false), 100);
	};

	const triggerProps = onHover
		? {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
		}
		: {
			onClick: () => setOpen(!open),
		};

	return (
		<div
			className="relative inline-block"
			ref={popoverRef}
			{...(onHover ? { onMouseLeave: handleMouseLeave } : {})}
		>
			<div className="cursor-pointer" {...triggerProps}>
				{trigger}
			</div>

			<div
				onMouseEnter={onHover ? handleMouseEnter : undefined}
				onMouseLeave={onHover ? handleMouseLeave : undefined}
				className={clsx(
					"absolute z-10 mt-2 w-64 rounded-xl bg-surface border border-outline p-4 shadow-lg",
					"transition-all transform duration-200 ease-out",
					open
						? "opacity-100 scale-100 pointer-events-auto"
						: "opacity-0 scale-95 pointer-events-none",
					className
				)}
			>
				{content}
			</div>
		</div>
	);
}

export default Popover;