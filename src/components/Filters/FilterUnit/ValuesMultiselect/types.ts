import { FiltersListItem } from '../../types'
import { SelectOptionsConfig } from '../../../Select'

export interface ValuesMultiSelectProps {
	id: string
	index: number
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: SelectOptionsConfig
	selectedFilterKey?: string
}
