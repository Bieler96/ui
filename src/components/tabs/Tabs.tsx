import { useState, Children, isValidElement, cloneElement, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface TabProps {
	value: string;
	children: React.ReactNode;
}

type TabsProps = {
	children: React.ReactNode;
	value: string;
	onChange: (value: string) => void;
};

export const Tabs = ({ children, value, onChange }: TabsProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
	const [containerWidth, setContainerWidth] = useState(0);
	const [tabWidths, setTabWidths] = useState<number[]>([]);
	const [tabOffsets, setTabOffsets] = useState<number[]>([]);
	const dragX = useMotionValue(0);

	useEffect(() => {
		const updateTabMetrics = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.offsetWidth);

				// Aktualisiere die Tab-Breiten und Offsets
				const widths = tabsRef.current.map(tab => tab?.offsetWidth || 0);
				const offsets = tabsRef.current.map(tab => tab?.offsetLeft || 0);
				setTabWidths(widths);
				setTabOffsets(offsets);
			}
		};

		updateTabMetrics();
		window.addEventListener('resize', updateTabMetrics);

		return () => {
			window.removeEventListener('resize', updateTabMetrics);
		};
	}, []);

	const activeTabIndex = Children.toArray(children).findIndex(
		(child) => isValidElement(child) && (child.props as TabProps).value === value
	);

	const handleTabClick = (tabValue: string) => {
		onChange(tabValue);
	};

	const handleDragStart = () => {
		// setIsDragging(true);
	};

	const handleDrag = () => {
		const currentPosition = dragX.get();
		const maxScroll = -(Children.count(children) - 1) * containerWidth;
		const minScroll = 0;

		// Begrenzen Sie die Position während des Drags
		if (currentPosition < maxScroll || currentPosition > minScroll) {
			dragX.set(Math.max(maxScroll, Math.min(minScroll, currentPosition)));
		}
	};

	const handleDragEnd = () => {
		// setIsDragging(false);

		// const offset = info.offset.x;
		// const velocity = info.velocity.x;

		// Bestimme die Richtung basierend auf Offset und Geschwindigkeit
		const direction = 0;

		// if (Math.abs(velocity) > 100 || Math.abs(offset) > containerWidth * 0.1) {
		// 	direction = offset > 0 ? -1 : 1;
		// }

		// Berechne den neuen Index
		let newIndex = activeTabIndex + direction;

		// Begrenze den Index auf gültige Werte
		newIndex = Math.max(0, Math.min(Children.count(children) - 1, newIndex));

		// Berechne die Zielposition
		const targetPosition = -newIndex * containerWidth;

		// Animiere zum Ziel
		animate(dragX, targetPosition, {
			type: "spring",
			stiffness: 400,
			damping: 40,
			restDelta: 0.01,
			onComplete: () => {
				if (newIndex !== activeTabIndex) {
					const childrenArray = Children.toArray(children);
					const child = childrenArray[newIndex];
					if (isValidElement(child)) {
						onChange((child.props as TabProps).value);
					}
				}
			}
		});
	};

	return (
		<div ref={containerRef}>
			<div className="flex border-b border-outline relative">
				{Children.map(children, (child, index) => {
					if (isValidElement(child)) {
						return cloneElement(child as React.ReactElement<TabProps>, {
							ref: (el: HTMLButtonElement) => {
								tabsRef.current[index] = el;
							},
							isActive: (child.props as TabProps).value === value,
							onClick: () => handleTabClick((child.props as TabProps).value),
						});
					}
					return null;
				})}
				<motion.div
					className="absolute bottom-0 h-0.5 bg-primary"
					style={{
						width: tabWidths[activeTabIndex] || 0,
						x: useTransform(
							dragX,
							[(Children.count(children) - 1) * -containerWidth, 0],
							[tabOffsets[Children.count(children) - 1] || 0, tabOffsets[0] || 0]
						),
					}}
				/>
			</div>
			<div className="relative overflow-hidden">
				<motion.div
					className="flex"
					style={{ x: dragX }}
					animate={{ x: -activeTabIndex * containerWidth }}
					transition={{
						type: 'spring',
						stiffness: 400,
						damping: 40,
						restDelta: 0.01
					}}
					drag="x"
					dragDirectionLock
					dragElastic={0}
					dragMomentum={false}
					onDragStart={handleDragStart}
					onDrag={handleDrag}
					onDragEnd={handleDragEnd}
					dragConstraints={{
						left: -(Children.count(children) - 1) * containerWidth,
						right: 0,
					}}
				>
					{Children.map(children, (child) => {
						if (isValidElement(child)) {
							return (
								<div
									style={{ width: containerWidth }}
									className="flex-shrink-0"
								>
									{(child.props as TabProps).children}
								</div>
							);
						}
						return null;
					})}
				</motion.div>
			</div>
		</div>
	);
};
