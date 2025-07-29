import React, { useState, useEffect, useRef } from 'react';
import {
	useFloating,
	useInteractions,
	useClick,
	useRole,
	useDismiss,
	FloatingPortal,
	FloatingOverlay
} from '@floating-ui/react';
import { Search } from 'lucide-react';
import Input from '../input/Input';
import { CommandMenuItem } from './CommandMenuItem';

export const CommandMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const listRef = useRef<Array<HTMLLIElement | null>>([]);

	const { refs, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
	});

	const click = useClick(context);
	const role = useRole(context);
	const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		role,
		dismiss,
	]);

	const items = [
		{ title: 'Search' },
		{ title: 'Settings' },
		{ title: 'Profile' },
	];

	const handleSelect = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen((open) => !open);
			}

			if (isOpen) {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
				} else if (e.key === 'Enter') {
					e.preventDefault();
					if (listRef.current[activeIndex]) {
						listRef.current[activeIndex]?.click();
					}
				}
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [isOpen, activeIndex, items.length]);

	useEffect(() => {
		if (isOpen) {
			setActiveIndex(0);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && listRef.current[activeIndex]) {
			listRef.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
		}
	}, [isOpen, activeIndex]);

	return (
		<>
			<button ref={refs.setReference} {...getReferenceProps()} className="p-2 border rounded">
				Open Menu
			</button>
			<FloatingPortal>
				{isOpen && (
					<FloatingOverlay className="bg-black/40 fixed inset-0 z-50 flex items-start justify-center pt-24">
						<div
							ref={refs.setFloating}
							{...getFloatingProps()}
							className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4"
						>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
								<Input placeholder="Search..." className="pl-9 w-full" />
							</div>
							<div className="mt-4">
								<p className="text-sm text-gray-500 px-2 pb-2">Suggestions</p>
								<ul>
									{items.map((item, index) => (
										<CommandMenuItem
											key={item.title}
											ref={(el) => { listRef.current[index] = el; }}
											isActive={activeIndex === index}
											onSelect={handleSelect}
										>
											<p>{item.title}</p>
										</CommandMenuItem>
									))}
								</ul>
							</div>
						</div>
					</FloatingOverlay>
				)}
			</FloatingPortal>
		</>
	);
};