import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import Input from "../input/Input";
import { CommandMenuItem } from "./CommandMenuItem";

export interface CommandMenuItemType {
	id: string;
	title: string;
	onSelect: () => void;
}

export interface CommandMenuProps {
	items: CommandMenuItemType[];
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ items }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [animateIn, setAnimateIn] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const listRef = useRef<Array<HTMLLIElement | null>>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredItems = items.filter(item =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleClose = () => {
		setAnimateIn(false);
		setTimeout(() => {
			setIsOpen(false);
			setIsMounted(false);
		}, 200);
	};

	const handleSelect = (item: CommandMenuItemType) => {
		item.onSelect();
		handleClose();
	}

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				if (!isOpen) setIsOpen(true); else handleClose();
			}
			if (isOpen) {
				if (e.key === "Escape") handleClose();
				else if (e.key === "ArrowDown") {
					e.preventDefault();
					setActiveIndex((prev) => (prev + 1) % filteredItems.length);
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
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
	}, [isOpen, activeIndex, filteredItems.length]);

	useEffect(() => {
		if (isOpen) setIsMounted(true);
	}, [isOpen]);

	useEffect(() => {
		if (isMounted) {
			requestAnimationFrame(() => {
				setAnimateIn(true);
				inputRef.current?.focus();
			});
			setActiveIndex(0);
			setSearchQuery("");
		}
	}, [isMounted]);

	useEffect(() => {
		setActiveIndex(0);
	}, [searchQuery]);

	useEffect(() => {
		if (isMounted) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => { document.body.style.overflow = ""; };
	}, [isMounted]);

	useEffect(() => {
		if (isMounted && listRef.current[activeIndex]) {
			listRef.current[activeIndex]?.scrollIntoView({ block: "nearest" });
		}
	}, [isMounted, activeIndex]);

	if (!isMounted) return null;

	return (
		<>
			<div
				className={clsx("fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-200", animateIn ? "opacity-100" : "opacity-0")}
				onClick={handleClose}
			/>
			<div
				className="fixed inset-0 flex items-start justify-center z-50 p-4 pt-24"
				onClick={handleClose}
			>
				<div
					className={clsx("bg-surface border border-outline rounded-lg shadow-lg max-w-lg w-full relative transition-all duration-200 ease-out", animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="relative p-4">
						<Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
						<Input
							ref={inputRef}
							placeholder="Search..."
							className="pl-9 w-full"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="p-4 pt-0">
						{filteredItems.length > 0 ? (
							<ul>
								<p className="text-sm text-gray-500 px-2 pb-2">Suggestions</p>
								{filteredItems.map((item, index) => (
									<CommandMenuItem
										key={item.id}
										ref={(el) => { listRef.current[index] = el; }}
										isActive={activeIndex === index}
										onSelect={() => handleSelect(item)}
									>
										<p>{item.title}</p>
									</CommandMenuItem>
								))}
							</ul>
						) : (
							<p className="text-center text-sm text-gray-500 py-4">No results found.</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};