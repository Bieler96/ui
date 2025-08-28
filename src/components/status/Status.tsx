import cx from 'clsx';

export type StatusProps = {
	variant?: "online" | "offline" | "maintenance" | "degraded";
	text: string;
}

export function Status({
	variant = "online",
	text
}: StatusProps) {
	const baseClasses = "flex flex-row gap-1 text-on-surface inline-flex items-center justify-center rounded-lg border border-outline-variant px-2 py-1 text-sm text-on-surface font-medium";

	const variantClasses = {
		online: "bg-green-500",
		offline: "bg-red-500",
		maintenance: "bg-blue-500",
		degraded: "bg-orange-500",
	};

	return (
		<div className={cx(baseClasses)}>
			<div className="relative">
				<div className={cx(variantClasses[variant], "size-2 rounded-full")}></div>
				<div className={cx(variantClasses[variant], "size-2 rounded-full absolute left-0 top-0 animate-ping")}></div>
			</div>
			<span>{text}</span>
		</div>
	);
}