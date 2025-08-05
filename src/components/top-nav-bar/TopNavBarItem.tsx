import clsx from "clsx";
import React from "react";
import { Button } from "../button/Button";

export interface TopNavBarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
	children: React.ReactNode;
	href: string;
}

export function TopNavBarItem({
	children,
	className,
	href,
	...props
}: TopNavBarItemProps) {
	return (
		<li className={clsx("flex items-center", className)} {...props}>
			<a href={href}>
				<Button variant="ghost" size="sm">{children}</Button>
			</a>
		</li >
	);
}
