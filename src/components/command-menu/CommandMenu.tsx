import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import Input from "../input/Input";
import { CommandMenuItem } from "./CommandMenuItem";

function CommandMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [animateIn, setAnimateIn] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const listRef = useRef<Array<HTMLLIElement | null>>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const items = [
		{ title: "Search" },
		{ title: "Settings" },
		{ title: "Profile" },
	];

	const handleClose = () => {
		setAnimateIn(false);
		setTimeout(() => {
			setIsOpen(false);
			setIsMounted(false);
		}, 200);
	};

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				if (!isOpen) {
					setIsOpen(true);
				} else {
					handleClose();
				}
			}

			if (isOpen) {
				if (e.key === "Escape") {
					handleClose();
				} else if (e.key === "ArrowDown") {
					e.preventDefault();
					setActiveIndex((prev) => (prev + 1) % items.length);
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
				} else if (e.key === "Enter") {
					e.preventDefault();
					if (listRef.current[activeIndex]) {
						listRef.current[activeIndex]?.click();
					}
				}
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [isOpen, activeIndex, items.length]);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		} else {
			handleClose();
		}
	}, [isOpen]);

	useEffect(() => {
		if (isMounted) {
			requestAnimationFrame(() => {
				setAnimateIn(true);
				inputRef.current?.focus();
			});
			setActiveIndex(0);
		}
	}, [isMounted]);

	useEffect(() => {
		if (isMounted) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMounted]);

	// Scroll active item into view
	useEffect(() => {
		if (isMounted && listRef.current[activeIndex]) {
			listRef.current[activeIndex]?.scrollIntoView({ block: "nearest" });
		}
	}, [isMounted, activeIndex]);

	if (!isMounted) return null;

	return (
		<>
			<div
				className={clsx(
					"fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-200",
					animateIn ? "opacity-100" : "opacity-0"
				)}
				onClick={handleClose}
			/>
			<div
				className="fixed inset-0 flex items-start justify-center z-50 p-4 pt-24"
				onClick={handleClose}
			>
				<div
					className={clsx(
						"bg-surface border border-outline rounded-lg shadow-lg max-w-lg w-full relative transition-all duration-200 ease-out",
						animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
					)}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="relative p-4">
						<Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
						<Input ref={inputRef} placeholder="Search..." className="pl-9 w-full" />
					</div>
					<div className="p-4 pt-0">
						<ul>
							{items.map((item, index) => (
								<CommandMenuItem
									key={item.title}
									ref={(el) => { listRef.current[index] = el; }}
									isActive={activeIndex === index}
									onSelect={handleClose}
								>
									<p>{item.title}</p>
								</CommandMenuItem>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default CommandMenu;