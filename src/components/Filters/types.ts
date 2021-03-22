import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
import { FilterOption, Filters } from 'api'
import { MultiSelectProps, SelectOption } from '../Select'

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

export interface FiltersProps {
	api: AxiosInstance
	emitter: Emitter
	endpoint: string
	onSelectedFiltersChange: (selectedFilters: Filters) => void
}

export interface OnSearchWrapper {
	(selectedFilterKey: string): MultiSelectProps['onSearch']
}
