import React from "react";

type DataTableProps = {
	data: Array<Record<string, any>>;
	headerAlignment?: Alignment;
	cellAlignment?: Alignment;
};

type HeaderGroup = {
	parent: string;
	children: string[];
};

export enum Alignment {
	LEFT = "left",
	CENTER = "center",
	RIGHT = "right",
}

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

const DataTable: React.FC<DataTableProps> = ({ data, headerAlignment = Alignment.CENTER, cellAlignment = Alignment.LEFT }) => {
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

	const headerGroups = getHeaderGroups(data);

	const flatColumns = headerGroups.flatMap((group) =>
		group.children.length > 0
			? group.children.map((child) => `${group.parent}.${child}`)
			: [group.parent]
	);

	const firstIdx = 0;
	const lastIdx = headerGroups.length - 1;

	return (
		<div className="overflow-x-auto rounded-lg shadow-sm bg-surface">
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
						<tr
							key={idx}
							className="transition-colors hover:bg-hover cursor-pointer"
						>
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
		</div>
	);
};

export default DataTable;