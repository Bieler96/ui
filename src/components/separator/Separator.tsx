import clsx from "clsx";

type Orientation = "horizontal" | "vertical";

export interface SeparatorProps {
	orientation?: Orientation;
	className?: string;
}

function Separator({
	orientation = "horizontal",
	className,
}: SeparatorProps) {
	return (
		<div
			role="separator"
			className={clsx(
				"shrink-0 bg-outline",
				orientation === "horizontal"
					? "h-px w-full"
					: "w-px h-full",
				className
			)}
		/>
	);
}

export default Separator;