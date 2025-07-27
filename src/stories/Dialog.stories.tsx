import React, { useState } from "react";
import { Dialog } from "../components/dialog/Dialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dialog> = {
	title: "Components/Dialog",
	component: Dialog,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Dialog öffnen
				</button>

				<Dialog open={open} onClose={() => setOpen(false)} title="Dialog Beispiel">
					<p>Das ist ein einfacher Dialog Inhalt.</p>
				</Dialog>
			</>
		);
	},
};