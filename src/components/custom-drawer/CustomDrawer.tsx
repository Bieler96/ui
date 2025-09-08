import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import clsx from 'clsx';

export interface CustomDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	direction?: 'left' | 'right' | 'top' | 'bottom';
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
	children,
	open,
	onOpenChange,
	direction = "left",
}) => {
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const [{ x }, api] = useSpring(() => ({
		x: open ? 0 : -windowWidth,
	}));

	const overlayOpacity = x.to(
		[-windowWidth, 0],
		[0, 1]
	);

	const bind = useDrag(
		({ down, movement: [mx], velocity: [vx], direction: [dx] }) => {
			const startX = open ? 0 : -windowWidth;

			if (down) {
				api.start({ x: startX + mx });
			} else {
				const openThreshold = windowWidth / 3;
				const velocityThreshold = 0.5;
				const shouldOpen = open
					? !(Math.abs(mx) > openThreshold || (Math.abs(vx) > velocityThreshold && dx < 0))
					: (Math.abs(mx) > openThreshold || (Math.abs(vx) > velocityThreshold && dx > 0));

				api.start({ x: shouldOpen ? 0 : -windowWidth });
				onOpenChange(shouldOpen);
			}
		},
		{ from: () => [x.get(), 0], bounds: { left: -windowWidth, right: 0 }, rubberband: true, filterTaps: true, threshold: 10, axis: 'x' }
	);

	useEffect(() => {
		if (windowWidth > 0) {
			api.start({ x: open ? 0 : -windowWidth });
		}
	}, [open, api, windowWidth]);


	const drawerClasses = clsx(
		"fixed top-0 h-full bg-surface shadow-lg z-50",
		direction === "left" && "left-0 w-80 rounded-r-lg",
		direction === "right" && "right-0 w-80",
		direction === "bottom" && "bottom-0 w-full h-1/2"
	);

	const dragHandleClasses = clsx(
		"fixed top-0 h-full w-full z-20",
		{
			"left-0": direction === 'left',
			"right-0": direction === 'right',
		}
	);

	if (!windowWidth) {
		return null;
	}

	return (
		<>
			<animated.div
				className="fixed inset-0 bg-black/40 z-40"
				style={{
					opacity: overlayOpacity,
					pointerEvents: open ? 'auto' : 'none',
				}}
				onClick={() => onOpenChange(false)}
			/>
			<animated.div
				{...bind()}
				style={{ x }}
				className={drawerClasses}
				onClick={(e: React.MouseEvent) => e.stopPropagation()}
			>
				{children}
			</animated.div>
			<animated.div
				{...bind()}
				className={dragHandleClasses}
				style={{
					pointerEvents: open ? 'none' : 'auto',
					touchAction: 'pan-x',
				}}
			/>
		</>
	);
}
