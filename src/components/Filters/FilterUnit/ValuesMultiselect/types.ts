import { FiltersListItem } from '../../types'
import { SelectOptionsConfig } from '../../../Select'

export interface ValuesMultiSelectProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: SelectOptionsConfig
}
