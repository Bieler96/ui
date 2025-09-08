import clsx from "clsx";
import { Clipboard, Check } from 'lucide-react'
import { useState } from 'react'
import { motion } from "motion/react";

export type Size = "sm" | "md";

export interface CopyButtonProps {
	text: string;
	label?: string;
	labelCopied?: string;
	size?: Size;
	successulCallback?: () => void;
}

export function CopyButton({
	text,
	label,
	labelCopied,
	size = "md",
	successulCallback
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const sizes = {
		sm: "size-4",
		md: "size-6"
	};
	const iconSizes = {
		sm: "size-4",
		md: "size-5"
	};
	const rounded = {
		sm: "rounded-[0.8rem]",
		md: "rounded-lg"
	};
	const labelSizes = {
		sm: "text-sm",
		md: "text-base"
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			successulCallback?.();
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Copy failed', err);
		}
	}

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<button
				onClick={handleCopy}
				className={clsx(rounded[size], "cursor-copy inline-flex items-center justify-center border border-outline-variant hover:border-outline hover:bg-primary/10 dark:hover:bg-primary/20 p-2 transition duration-150")}
				aria-label="Copy to clipboard"
			>
				<span className={clsx(sizes[size], "relative flex items-center justify-center")}>
					<Clipboard className={`${iconSizes[size]} absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
					<Check className={`${iconSizes[size]} absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} text-success`} />
				</span>

				{label && <span className={clsx(labelSizes[size], "ml-2 me-1")}>{copied ? labelCopied || label : label}</span>}
			</button>
		</motion.div >
	)
}