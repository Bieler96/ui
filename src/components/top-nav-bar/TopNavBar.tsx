import clsx from "clsx";
import React from "react";

export interface TopNavBarProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
}

export function TopNavBar({ children, className, ...props }: TopNavBarProps) {
	return (
		<nav
			className={clsx(
				"flex items-center justify-between py-2 px-4 w-full md:px-6 bg-surface text-on-surface shadow-sm",
				className
			)}
			{...props}
		>
			{children}
		</nav>
	);
}
