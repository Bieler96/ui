import React from "react";
import { Card } from "../card/Card";
import clsx from "clsx";

const DataCardContext = React.createContext<any>(null);

export type DataCardFieldConfig<TData> = {
	key: keyof TData & string;
	cell?: (value: any, row: TData) => React.ReactNode;
};

export type DataCardConfig<TData> = {
	visibleFields: (keyof TData & string | DataCardFieldConfig<TData>)[];
	hiddenFields: (keyof TData & string | DataCardFieldConfig<TData>)[];
};

type DataCardProps<TData> = {
	data?: TData;
	config?: DataCardConfig<TData>;
	variant?: 'elevated' | 'filled' | 'outlined';
} & React.ComponentProps<typeof Card>;

const DataCard = <TData,>({ data, config, variant, children, className, ...props }: DataCardProps<TData>) => {
	return (
		<DataCardContext.Provider value={data}>
			<Card
				className={clsx("p-4 h-fit", className)}
				variant={variant}
				{...props}
			>
				{children}
				{config && data && (
					<DataCardBody config={config} data={data} />
				)}
			</Card>
		</DataCardContext.Provider>
	);
};

const DataCardBody = <TData,>({ config, data }: { config: DataCardConfig<TData>, data: TData }) => {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement>(null);

	const renderField = (field: keyof TData & string | DataCardFieldConfig<TData>) => {
		const key = typeof field === 'string' ? field : field.key;
		const value = data[key];
		const cellRenderer = typeof field === 'object' ? field.cell : null;

		const displayValue = cellRenderer ? cellRenderer(value, data) : String(value);

		return (
			<div key={key} className="flex justify-between text-sm">
				<span className="text-muted-foreground capitalize">{key}</span>
				<span>{displayValue}</span>
			</div>
		);
	};

	return (
		<div className="space-y-2 pt-4">
			{config.visibleFields.map(renderField)}
			<div
				ref={contentRef}
				className="overflow-hidden transition-all duration-300 ease-in-out"
				style={{ maxHeight: isExpanded ? contentRef.current?.scrollHeight : 0 }}
			>
				<div className="space-y-2 pt-2">
					{config.hiddenFields.map(renderField)}
				</div>
			</div>
			{config.hiddenFields.length > 0 && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-sm text-primary hover:underline mt-2"
				>
					{isExpanded ? "Show less" : "Show more"}
				</button>
			)}
		</div>
	);
};

const DataCardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={clsx("flex flex-row items-center justify-between space-y-0 pb-2", className)}
		{...props}
	/>
));
DataCardHeader.displayName = "DataCardHeader";

type DataCardTitleProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
	children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardTitle = React.forwardRef<HTMLHeadingElement, DataCardTitleProps>(({ className, children, ...props }, ref) => {
	const data = React.useContext(DataCardContext);
	return (
		<h3
			ref={ref}
			className={clsx("text-sm font-medium leading-none", className)}
			{...props}
		>
			{typeof children === 'function' ? children(data) : children}
		</h3>
	);
});
DataCardTitle.displayName = "DataCardTitle";

const DataCardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={clsx("pt-2", className)} {...props} />
));
DataCardContent.displayName = "DataCardContent";

type DataCardValueProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
	children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardValue = React.forwardRef<HTMLDivElement, DataCardValueProps>(({ className, children, ...props }, ref) => {
	const data = React.useContext(DataCardContext);
	return (
		<div
			ref={ref}
			className={clsx("text-2xl font-bold", className)}
			{...props}
		>
			{typeof children === 'function' ? children(data) : children}
		</div>
	);
});
DataCardValue.displayName = "DataCardValue";

type DataCardDescriptionProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> & {
	children?: React.ReactNode | ((data: any) => React.ReactNode);
};

const DataCardDescription = React.forwardRef<HTMLParagraphElement, DataCardDescriptionProps>(({ className, children, ...props }, ref) => {
	const data = React.useContext(DataCardContext);
	return (
		<p
			ref={ref}
			className={clsx("text-xs text-muted-foreground", className)}
			{...props}
		>
			{typeof children === 'function' ? children(data) : children}
		</p>
	);
});
DataCardDescription.displayName = "DataCardDescription";

export { DataCard, DataCardHeader, DataCardTitle, DataCardContent, DataCardValue, DataCardDescription };
