// TODO: Setup and integrate swaggerhub so types are generated
export type FilterKey = string

export type FilterOperator = string
export type FilterOperators = FilterOperator[]

export interface FilterValue {
	id: string
	value: string
}
export type FilterValues = FilterValue[]

export interface Filter {
	key: FilterKey
	operator?: FilterOperator
	value: string[]
}
export type Filters = Filter[]

export interface FilterOption {
	key: FilterKey
	staticFilter?: boolean
	operator?: FilterOperators
	values?: FilterValues
}
export type FilterOptions = FilterOption[]

export interface FilterSuggestions {
	key: FilterKey
	operator: FilterOperators
	search?: string
	filters?: Filters
}
