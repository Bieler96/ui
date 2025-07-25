import React from "react";

export enum Alignment {
	LEFT = "left",
	CENTER = "center",
	RIGHT = "right",
}

export type ColumnDef<TData> = {
	accessorKey: keyof TData | string;
	header: React.ReactNode | (({ column }: { column: ColumnDef<TData> }) => React.ReactNode);
	cell?: ({ row }: { row: TData }) => React.ReactNode;
};

export type DataTableProps<TData> = {
	data: TData[];
	columns?: ColumnDef<TData>[];
	headerAlignment?: Alignment;
	cellAlignment?: Alignment;
};

type HeaderGroup = {
	parent: string;
	children: string[];
};

function getHeaderGroups(data: Array<Record<string, any>>): HeaderGroup[] {
	const allKeys = new Set<string>();
	data.forEach((row) => {
		Object.keys(row).forEach((key) => {
			if (row[key] && typeof row[key] === "object" && !Array.isArray(row[key])) {
				Object.keys(row[key]).forEach((childKey) => {
					allKeys.add(`${key}.${childKey}`);
				});
			} else {
				allKeys.add(key);
			}
		});
	});

	const groups: Record<string, string[]> = {};
	allKeys.forEach((fullKey) => {
		const [parent, child] = fullKey.split(".");
		if (child) {
			if (!groups[parent]) groups[parent] = [];
			groups[parent].push(child);
		} else {
			if (!groups[fullKey]) groups[fullKey] = [];
		}
	});

	return Object.entries(groups).map(([parent, children]) => ({
		parent,
		children,
	}));
}

function getValue(obj: Record<string, any>, path: string): any {
	return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function DataTable<TData extends Record<string, any>>({
	data,
	columns,
	headerAlignment = Alignment.CENTER,
	cellAlignment = Alignment.LEFT,
}: DataTableProps<TData>) {
	const getAlignmentClass = (alignment: Alignment) => {
		switch (alignment) {
			case Alignment.LEFT: return "text-left";
			case Alignment.CENTER: return "text-center";
			case Alignment.RIGHT: return "text-right";
			default: return "text-left";
		}
	};

	if (!data || data.length === 0) {
		return (
			<div className="text-center py-8 text-on-surface-variant">
				Keine Daten vorhanden.
			</div>
		);
	}

	const renderLegacyTable = () => {
		const headerGroups = getHeaderGroups(data);
		const flatColumns = headerGroups.flatMap((group) =>
			group.children.length > 0
				? group.children.map((child) => `${group.parent}.${child}`)
				: [group.parent]
		);
		const firstIdx = 0;
		const lastIdx = headerGroups.length - 1;

		return (
			<table className="min-w-full border-separate border-spacing-0 rounded-lg">
				<thead>
					<tr>
						{headerGroups.map((group, idx) => {
							const roundedClass =
								idx === firstIdx && idx === lastIdx
									? "rounded-tl-lg rounded-tr-lg"
									: idx === firstIdx
										? "rounded-tl-lg"
										: idx === lastIdx
											? "rounded-tr-lg"
											: "";
							const isLastGroup = idx === lastIdx;
							const shouldHaveBorderR = !isLastGroup;
							return group.children.length > 0 ? (
								<th
									key={group.parent}
									colSpan={group.children.length}
									className={`font-medium px-4 py-3 border-b ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(headerAlignment)} bg-surface-variant text-on-surface border-outline ${roundedClass}`}
								>
									{group.parent}
								</th>
							) : (
								<th
									key={group.parent}
									rowSpan={2}
									className={`font-medium px-4 py-3 border-b ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(headerAlignment)} align-middle bg-surface-variant text-on-surface border-outline ${roundedClass}`}
								>
									{group.parent}
								</th>
							);
						})}
					</tr>
					<tr>
						{headerGroups.map((group) =>
							group.children.length > 0
								? group.children.map((child, childIdx, childArray) => {
									const isLastChild = childIdx === childArray.length - 1;
									const isLastGroup = headerGroups.indexOf(group) === headerGroups.length - 1;
									const shouldHaveBorderR = !(isLastChild && isLastGroup);
									return (
										<th
											key={`${group.parent}.${child}`}
											className={`font-normal px-4 py-2 border-b ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(headerAlignment)} bg-surface text-on-surface border-outline-variant`}
										>
											{child}
										</th>
									);
								}) : null
						)}
					</tr>
				</thead>
				<tbody>
					{data.map((row, idx) => (
						<tr key={idx} className="transition-colors hover:bg-hover cursor-pointer">
							{flatColumns.map((col, colIdx) => {
								const value = getValue(row, col);
								const isLastRow = idx === data.length - 1;
								const isLastCol = colIdx === flatColumns.length - 1;
								const shouldHaveBorderR = !isLastCol;
								return (
									<td
										key={col}
										className={`px-4 py-3 ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(cellAlignment)} text-on-surface border-outline-variant ${isLastRow ? "" : "border-b"}`}
									>
										{value != null ? value.toString() : ""}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	const renderConfigurableTable = () => {
		return (
			<table className="min-w-full border-separate border-spacing-0 rounded-lg">
				<thead>
					<tr>
						{columns!.map((column, idx) => {
							const firstIdx = 0;
							const lastIdx = columns!.length - 1;
							const roundedClass =
								idx === firstIdx && idx === lastIdx
									? "rounded-tl-lg rounded-tr-lg"
									: idx === firstIdx
										? "rounded-tl-lg"
										: idx === lastIdx
											? "rounded-tr-lg"
											: "";
							const shouldHaveBorderR = idx !== lastIdx;

							return (
								<th
									key={column.accessorKey as string}
									className={`font-medium px-4 py-3 border-b ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(headerAlignment)} bg-surface-variant text-on-surface border-outline ${roundedClass}`}
								>
									{typeof column.header === 'function'
										? column.header({ column })
										: column.header}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIdx) => (
						<tr key={rowIdx} className="transition-colors hover:bg-hover cursor-pointer">
							{columns!.map((column, colIdx) => {
								const isLastRow = rowIdx === data.length - 1;
								const isLastCol = colIdx === columns!.length - 1;
								const shouldHaveBorderR = !isLastCol;
								const cellContent = column.cell
									? column.cell({ row })
									: getValue(row, column.accessorKey as string);

								return (
									<td
										key={column.accessorKey as string}
										className={`px-4 py-3 ${shouldHaveBorderR ? 'border-r' : ''} ${getAlignmentClass(cellAlignment)} text-on-surface border-outline-variant ${isLastRow ? "" : "border-b"}`}
									>
										{cellContent}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="overflow-x-auto rounded-lg shadow-sm bg-surface">
			{columns ? renderConfigurableTable() : renderLegacyTable()}
		</div>
	);
}

export default DataTable;
