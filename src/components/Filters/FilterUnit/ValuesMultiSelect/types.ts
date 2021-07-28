import { SelectOptionsConfig } from '../../../Select'
import { FilterOption, FiltersListItem } from '../../types'

export interface ValuesMultiSelectProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	filterOptValues?: FilterOption['values']
	optionsConfig?: SelectOptionsConfig
	windowWidth?: number
}
