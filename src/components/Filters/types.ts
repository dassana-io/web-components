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

export interface FiltersConfig {
	iconConfig?: {
		filterKey: string
		iconMap: {
			[key: string]: string
		}
	}
}

export interface SharedFiltersProps {
	config?: FiltersConfig
	onSelectedFiltersChange: (selectedFilters: Filters) => void
}

export type ClientSideFilterOption = Omit<
	FilterOption,
	'operator' | 'staticFilter'
>

export interface ClientSideFiltersProps extends SharedFiltersProps {
	filterOptions: ClientSideFilterOption[]
	mode: 'frontend'
}

export interface ServerSideFiltersProps extends SharedFiltersProps {
	api: AxiosInstance
	emitter: Emitter
	endpoint: string
	mode: 'backend'
}

export type FiltersProps = ClientSideFiltersProps | ServerSideFiltersProps

export interface OnSearchWrapper {
	(selectedFilterKey: string): MultiSelectProps['onSearch']
}
