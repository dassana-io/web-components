import { FilterOption } from 'api'
import { FiltersListItem } from '../../types'
import { SelectOptionsConfig } from '../../../Select'

export interface ValuesMultiSelectProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	filterOptValues?: FilterOption['values']
	optionsConfig?: SelectOptionsConfig
}
