import { IconCellLabelType } from 'components/Table'
import { MultiSelectProps, SelectOption } from '../Select'
import React, { RefObject } from 'react'

/************************************/
// TODO: Setup and integrate swaggerhub so types are generated
export interface FilterKey {
	id: string
	value: string
}

export type FilterOperator = string
export type FilterOperators = FilterOperator[]

export interface FilterValue {
	id: string
	value: string
}
export type FilterValues = FilterValue[]

export interface Filter {
	key: FilterKey['id']
	operator?: FilterOperator
	value: string[]
}
export type Filters = Filter[]

export interface FilterOption {
	key: FilterKey
	staticFilter?: boolean
	operator?: FilterOperators
	type?: FilterValueType
	values?: FilterValues
}
export type FilterOptions = FilterOption[]

export interface FilterSuggestions {
	key: FilterKey
	operator: FilterOperators
	search?: string
	filters?: Filters
}

/************************************/

export interface FiltersListItem {
	id: string
	selectedOperator?: string
	selectedKey?: string
	selectedValues?: SelectOption[]
	type?: FilterValueType
}

type SelectedValsFilter = Required<FiltersListItem>

export type SelectedValsFilters = SelectedValsFilter[]

export type FiltersList = FiltersListItem[]

export interface ProcessedFilters {
	[key: string]: FilterOption
}

export interface FiltersConfig {
	[filterKey: string]: {
		iconMap?: {
			[key: string]: string
		}
		type?: IconCellLabelType
	}
}

export interface UseFiltersMethods {
	setFiltersList: React.Dispatch<React.SetStateAction<FiltersList>>
}

export interface SharedFiltersProps {
	config?: FiltersConfig
	defaultFilters?: FiltersList
	filtersRef?: RefObject<UseFiltersMethods>
	minKeySelectInputWidth?: number
	onSelectedFiltersChange: (selectedFilters: Filters) => void
	popoverClasses?: string[]
}

export type ClientSideFilterOption = Omit<
	FilterOption,
	'operator' | 'staticFilter'
>

export enum FiltersMode {
	backend = 'backend',
	frontend = 'frontend'
}

export interface ClientSideFiltersProps extends SharedFiltersProps {
	filterOptions: ClientSideFilterOption[]
	mode: FiltersMode.frontend
}

export interface ServerSideFiltersProps extends SharedFiltersProps {
	mode: FiltersMode.backend
	omittedFilterKeys?: string[]
	onFiltersFetch: () => Promise<FilterOptions>
	onFilterSuggest: (
		filterKey: string,
		searchVal: string
	) => Promise<FilterValue[]>
}

export type FiltersProps = ClientSideFiltersProps | ServerSideFiltersProps

export interface OnSearchWrapper {
	(selectedFilterKey: string): MultiSelectProps['onSearch']
}

export enum FilterValueType {
	boolean = 'boolean',
	date = 'date',
	input = 'input',
	multiSelect = 'multiSelect',
	number = 'number',
	severity = 'severity',
	string = 'string'
}
