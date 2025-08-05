
import React, { useState } from 'react';
import { Chip } from '../chip/Chip';
import { Input } from '../input/Input';

export interface TagInputProps {
	tags: string[];
	setTags: (tags: string[]) => void;
	placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			setTags([...tags, inputValue.trim()]);
			setInputValue('');
		} else if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			setTags(tags.slice(0, -1));
		}
	};

	const removeTag = (tagToRemove: string) => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};

	return (
		<div
			className='px-1 flex flex-wrap items-center gap-1 rounded-lg transition duration-150 disabled:opacity-50 disabled:pointer-events-none border border-outline-variant outline-none focus-visible:ring-primary/50 focus-visible:ring-[3px]'
		>
			<div className="h-fit flex flex-wrap gap-1">
				{tags.map(tag => (
					<Chip key={tag} variant="input" onDelete={() => removeTag(tag)} label={tag} />
				))}
			</div>
			<Input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				placeholder={placeholder || 'Add a tag'}
				variant='ghost'
			/>
		</div>
	);
};
