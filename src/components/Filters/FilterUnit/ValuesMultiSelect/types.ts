import { type SelectOptionsConfig } from '../../../Select'
import { type FilterOption, type FiltersListItem } from '../../types'

export interface ValuesMultiSelectProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	filterOptValues?: FilterOption['values']
	optionsConfig?: SelectOptionsConfig
	windowWidth?: number
}
