import { Drawer } from 'vaul';
import React, { Children } from 'react';


interface DrawerProps {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	trigger: React.ReactNode;
}

export function CustomDrawer({
	children,
	open,
	onOpenChange,
	trigger
}: DrawerProps) {
	return (
		<Drawer.Root open={open} onOpenChange={onOpenChange}>
			<Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-surface flex flex-col rounded-t-lg mt-24 max-h-[96%] fixed bottom-0 left-0 right-0 outline-none">
					<div aria-hidden className="mt-4 mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-surface-variant mb-8" />
					<div className="p-4 flex-1 overflow-y-auto">
						<div className="max-w-md mx-auto space-y-4">
							{children}
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}