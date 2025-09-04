import React from 'react';
import { animated, SpringValue } from '@react-spring/web';
import clsx from 'clsx';

export interface CustomDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	direction?: 'left' | 'right' | 'top' | 'bottom';
	x: SpringValue<number>;
	windowWidth: number;
	bind?: any;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
	children,
	open,
	onOpenChange,
	direction = "left",
	x,
	windowWidth,
	bind,
}) => {
	const overlayOpacity = x.to([
		-windowWidth,
		0,
	], [
		0,
		1,
	]);

	const drawerClasses = clsx(
		"fixed top-0 h-full bg-surface shadow-lg",
		direction === "left" && "left-0 w-80 rounded-r-lg",
		direction === "right" && "right-0 w-80",
		direction === "bottom" && "bottom-0 w-full h-1/2"
	);

	return (
		<>
			<animated.div
				className="fixed inset-0 bg-black/40"
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
				className="fixed inset-0"
				style={{
					pointerEvents: x.to((val: number) => (val === -windowWidth ? 'auto' : 'none')),
					touchAction: 'pan-x',
				}}
				onClick={(e: React.MouseEvent) => {
					const element = document.elementFromPoint(e.clientX, e.clientY);
					if (element && element !== e.currentTarget) {
						(element as HTMLElement).click();
					}
				}}
			/>
		</>
	);
}
