
import React from 'react';
import clsx from 'clsx';

export interface ButtonGroupProps {
	children: React.ReactNode;
	className?: string;
}

function ButtonGroup({
	children,
	className
}: ButtonGroupProps) {
	return (
		<div
			className={`inline-flex gap-1 rounded-full overflow-hidden ${className || ''
				}`}
			role="group"
		>
			{React.Children.map(children, (child, index) => {
				if (
					React.isValidElement(child) &&
					typeof child.type !== 'string' &&
					(child.type as React.ComponentType).name === 'Button'
				) {
					const isFirst = index === 0
					const element = child as React.ReactElement<any>;
					return React.cloneElement(element, {
						className: clsx(element.props.className, {
							'border-l': !isFirst,
							'border-outline': !isFirst,
						}),
					});
				}
				return child;
			})}
		</div>
	);
};

export default ButtonGroup;