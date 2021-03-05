import { MultiSelectProps } from '../Select'
import { AxiosInstance, Emitter } from '@dassana-io/web-utils'

export interface Filter {
	key?: string
	value?: string
}

export interface FilterOption {
	filterKey?: string
	staticFilter?: boolean
	options?: Array<string>
}

export type FilterOptions = FilterOption[]

export interface FiltersListItem {
	id: string
	selectedKey?: string
	selectedValues?: string[]
}

type SelectedValsFilter = Required<FiltersListItem>

export type SelectedValsFilters = SelectedValsFilter[]

export type FiltersList = FiltersListItem[]

export interface ProcessedFilters {
	[key: string]: FilterOption
}

export interface FiltersProps {
	api: AxiosInstance
	emitter: Emitter
	endpoint: string
	onSelectedFiltersChange: (selectedFilters: Filter[]) => void
}

export interface OnSearchWrapper {
	(selectedFilterKey: string): MultiSelectProps['onSearch']
}
