import React from 'react';
import { Card } from "../card/Card";

export type LogProps<T> = {
	logs: T[];
	formatter?: (item: T) => string;
	style?: React.CSSProperties;
	className?: string;
};

const LogComponent = <T,>({
	logs,
	formatter,
	style,
	className,
}: LogProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
	const formatItem = (item: T) => {
		if (formatter) {
			return formatter(item);
		}
		return typeof item === 'string' ? item : JSON.stringify(item);
	};

	return (
		<Card style={style} className={className} ref={ref}>
			<ul>
				{logs.map((log, index) => (
					<li key={index}>{formatItem(log)}</li>
				))}
			</ul>
		</Card>
	);
};

export const Log = React.forwardRef(LogComponent) as <T>(props: LogProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;
