
import { useState, useMemo, useRef, useEffect, KeyboardEvent, useCallback } from "react"
import { Button } from "../button/Button"
import { Select } from "../select/Select"
import { Input } from "../input/Input"
import { Popover } from "../popover/Popover"
import { CommandMenuItem } from "../command-menu/CommandMenuItem"
import { X, Plus, Filter as FilterIcon } from "lucide-react"

export interface FilterCriteria {
	id: string
	field: string
	value: string
}

export interface FilterField {
	value: string;
	label: string;
	type: 'select' | 'date' | 'string' | 'number' | 'bool';
	options?: string[];
}

export interface FilterProps {
	fields: FilterField[];
	onApply?: (filters: FilterCriteria[]) => void;
}

export function Filter({ fields, onApply }: FilterProps) {
	const [filters, setFilters] = useState<FilterCriteria[]>([])
	const [fieldSelectorOpen, setFieldSelectorOpen] = useState(false)
	const [addFilterSearch, setAddFilterSearch] = useState("")
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const listRef = useRef<Array<HTMLLIElement | null>>([])
	const searchInputRef = useRef<HTMLInputElement>(null)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

	const getAvailableFields = useCallback(() => {
		const selectedFields = filters.map((filter) => filter.field).filter(Boolean)
		return fields.filter((field) => !selectedFields.includes(field.value))
	}, [filters, fields])

	const availableFields = useMemo(() => {
		return getAvailableFields().filter(field => field.label.toLowerCase().includes(addFilterSearch.toLowerCase()))
	}, [getAvailableFields, addFilterSearch])

	useEffect(() => {
		setHighlightedIndex(0)
	}, [addFilterSearch])

	useEffect(() => {
		if (fieldSelectorOpen) {
			listRef.current[highlightedIndex]?.scrollIntoView({ block: "nearest" })
			searchInputRef.current?.focus()
		}
	}, [fieldSelectorOpen, highlightedIndex])

	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				setFieldSelectorOpen(false)
			}
		}

		if (fieldSelectorOpen) {
			document.addEventListener("keydown", handleKeyDown)
		} else {
			document.removeEventListener("keydown", handleKeyDown)
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [fieldSelectorOpen])

	const addFilter = (selectedField?: string) => {
		const fieldConfig = fields.find(f => f.value === selectedField);
		let newValue = "";
		if (fieldConfig && fieldConfig.type === 'select' && fieldConfig.options && fieldConfig.options.length > 0) {
			newValue = fieldConfig.options[0];
		} else if (fieldConfig && fieldConfig.type === 'bool') {
			newValue = "true";
		}

		const newFilter: FilterCriteria = {
			id: Date.now().toString(),
			field: selectedField || "",
			value: newValue,
		}
		setFilters([...filters, newFilter])
		setFieldSelectorOpen(false)
		setAddFilterSearch("")
		setHasUnsavedChanges(true)
	}

	const removeFilter = (id: string) => {
		setFilters(filters.filter((filter) => filter.id !== id))
		setHasUnsavedChanges(true)
	}

	const updateFilter = (id: string, updates: Partial<FilterCriteria>) => {
		setFilters(filters.map((filter) => (filter.id === id ? { ...filter, ...updates } : filter)))
		setHasUnsavedChanges(true)
	}

	const clearAllFilters = () => {
		setFilters([])
		setHasUnsavedChanges(true)
	}

	const applyFilters = () => {
		const activeFilters = filters.filter(f => f.field && f.value);
		if (onApply) {
			onApply(activeFilters);
		}
		setHasUnsavedChanges(false)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowDown") {
			e.preventDefault()
			setHighlightedIndex((prev) => (prev + 1) % availableFields.length)
		} else if (e.key === "ArrowUp") {
			e.preventDefault()
			setHighlightedIndex((prev) => (prev - 1 + availableFields.length) % availableFields.length)
		} else if (e.key === "Enter") {
			e.preventDefault()
			const selectedField = availableFields[highlightedIndex]
			if (selectedField) {
				addFilter(selectedField.value)
			}
		}
	}

	const getValueInput = (filter: FilterCriteria) => {
		const { field, value, id } = filter

		if (!field) {
			return (
				<Input
					placeholder="Select field first"
					disabled
					variant="ghost"
					className="text-xs p-0 h-auto"
				/>
			)
		}

		const fieldConfig = fields.find((f) => f.value === field)
		if (!fieldConfig) return null

		if (fieldConfig.type === "select") {
			const selectOptions = fieldConfig.options?.map(opt => ({ label: opt, value: opt })) || []
			return (
				<Select
					value={value}
					onChange={(newValue) => updateFilter(id, { value: newValue as string })}
					options={selectOptions}
					placeholder="Select value"
				/>
			)
		}

		if (fieldConfig.type === "bool") {
			const selectOptions = [{ label: "true", value: "true" }, { label: "false", value: "false" }];
			return (
				<Select
					value={value}
					onChange={(newValue) => updateFilter(id, { value: newValue as string })}
					options={selectOptions}
					placeholder="Select value"
				/>
			)
		}

		if (fieldConfig.type === "date") {
			return (
				<Input
					type="date"
					value={value}
					onChange={(e) => updateFilter(id, { value: e.target.value })}
					variant="ghost"
					className="text-sm p-0 h-auto"
				/>
			)
		}

		if (fieldConfig.type === "number") {
			return (
				<Input
					type="number"
					value={value}
					onChange={(e) => updateFilter(id, { value: e.target.value })}
					placeholder="Enter number"
					variant="ghost"
					className="text-sm p-0 h-auto"
				/>
			)
		}

		return (
			<Input
				type="text"
				value={value}
				onChange={(e) => updateFilter(id, { value: e.target.value })}
				placeholder="Enter text"
				variant="ghost"
				className="text-sm p-0 h-auto"
			/>
		)
	}

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="text-lg font-medium text-on-surface">Filters</h2>
					{activeFiltersCount > 0 && (
						<span className="rounded-md px-2 py-0.5 text-xs font-normal bg-surface-variant text-on-surface-variant border-0">
							{activeFiltersCount}
						</span>
					)}
				</div>

				<Popover
					open={fieldSelectorOpen}
					onOpenChange={setFieldSelectorOpen}
					placement="bottom-end"
					content={
						<div className="flex flex-col gap-2 p-1">
							<Input
								ref={searchInputRef}
								placeholder="Search..."
								value={addFilterSearch}
								onChange={e => setAddFilterSearch(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
							{availableFields.length === 0 ? (
								<p className="text-sm text-on-surface-variant py-2 text-center">No fields found.</p>
							) : (
								<ul className="flex flex-col gap-1 max-h-60 overflow-auto">
									{availableFields.map((field, index) => (
										<CommandMenuItem
											key={field.value}
											ref={(el) => { listRef.current[index] = el; }}
											isActive={highlightedIndex === index}
											onSelect={() => addFilter(field.value)}
										>
											<div className="flex items-center justify-between w-full">
												<span>{field.label}</span>
												<span className="text-xs px-1.5 py-0.5 rounded bg-surface-variant text-on-surface-variant ml-2">{field.type}</span>
											</div>
										</CommandMenuItem>
									))}
								</ul>
							)}
						</div>
					}
					trigger={
						<Button
							variant="ghost"
							size="sm"
						>
							<Plus className="h-4 w-4 mr-1.5" />
							Add filter
						</Button>
					}
				/>
			</div>

			{filters.length === 0 ? (
				<div className="text-center py-8 text-on-surface-variant">
					<div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-surface flex items-center justify-center">
						<FilterIcon className="h-6 w-6 text-outline" />
					</div>
					<p className="text-sm font-medium mb-1 text-on-surface">No filters applied</p>
					<p className="text-xs text-on-surface-variant">Add filters to refine your results</p>
				</div>
			) : (
				<div className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{filters.map((filter, index) => (
							<div key={filter.id} className="flex items-center">
								{index > 0 && (
									<span className="text-xs text-outline mr-2 px-1.5 py-0.5 bg-surface-variant rounded text-center min-w-[32px]">
										AND
									</span>
								)}

								<div className="flex items-center gap-1 bg-surface border border-outline-variant rounded-md px-2 py-1.5 text-sm hover:border-outline transition-colors">
									{/* <Select
										value={filter.field}
										onChange={(value) =>
											updateFilter(filter.id, {
												field: value as string,
												value: "",
											})
										}
										options={fieldOptions}
										placeholder="Field"
									/> */}
									<p>{filter.field}</p>

									<div className="min-w-[250px]">{getValueInput(filter)}</div>

									<Button
										variant="ghost"
										onClick={() => removeFilter(filter.id)}
										className="!size-fit !p-1"
									>
										<X className="size-5" />
									</Button>
								</div>
							</div>
						))}
					</div>

					<div className="flex items-center justify-between pt-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={clearAllFilters}
						>
							Clear all
						</Button>
						<Button
							onClick={applyFilters}
							size="sm"
						>
							Apply{hasUnsavedChanges && "*"}
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
