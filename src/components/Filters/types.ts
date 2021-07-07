import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
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
	}
}

export interface UseFiltersMethods {
	setFiltersList: React.Dispatch<React.SetStateAction<FiltersList>>
}

export interface SharedFiltersProps {
	config?: FiltersConfig
	onSelectedFiltersChange: (selectedFilters: Filters) => void
	filtersRef?: RefObject<UseFiltersMethods>
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
	api: AxiosInstance
	emitter: Emitter
	endpoint: string
	mode: FiltersMode.backend
	omittedFilterKeys?: string[]
}

export type FiltersProps = ClientSideFiltersProps | ServerSideFiltersProps

export interface OnSearchWrapper {
	(selectedFilterKey: string): MultiSelectProps['onSearch']
}
