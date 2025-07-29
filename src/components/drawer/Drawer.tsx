import { Drawer } from "vaul";
import clsx from "clsx";

interface DrawerProps {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	trigger: React.ReactNode;
	direction?: "left" | "right" | "bottom";
}

export function CustomDrawer({
	children,
	open,
	onOpenChange,
	trigger,
	direction = "bottom",
}: DrawerProps) {
	const contentBottomClass = "bg-surface flex flex-col rounded-t-lg mt-24 max-h-[96%] fixed bottom-0 left-0 right-0 outline-none";
	const contentSideClass = "top-2 bottom-2 fixed z-10 outline-none w-[364px] max-w-[96%] flex rounded-lg";
	const contentClass = direction === "bottom" ? contentBottomClass : contentSideClass;
	const side = direction === "right" ? "right-2" : direction === "left" ? "left-2" : ""
	const sideBg = direction === "right" || direction === "left" ? "bg-surface rounded-lg" : "mb-4";

	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			direction={direction}
		>
			<Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content
					className={clsx(contentClass, side)}
					style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
				>
					{direction === 'bottom' ? (
						<div aria-hidden className="my-4 mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-surface-variant" />
					) : null}

					<div className={clsx("p-2 flex-1 overflow-y-auto", sideBg)}>
						{children}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}