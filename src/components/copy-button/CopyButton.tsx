import { Clipboard, Check } from 'lucide-react'
import { useState } from 'react'

export interface CopyButtonProps {
	text: string
}

function CopyButton({ text }: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Copy failed', err)
		}
	}

	return (
		<button
			onClick={handleCopy}
			className="cursor-copy inline-flex items-center justify-center border border-outline-variant hover:border-outline hover:bg-primary/10 dark:hover:bg-primary/20 p-2 rounded-lg transition duration-150"
			aria-label="Copy to clipboard"
		>
			<span className="relative w-6 h-6 flex items-center justify-center">
				<Clipboard className={`absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
				<Check className={`absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} text-success`} />
			</span>
		</button>
	)
}

export default CopyButton;