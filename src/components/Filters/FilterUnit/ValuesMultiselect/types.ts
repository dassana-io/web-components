import { FiltersListItem } from '../../../Filters/types'
import { SelectOptionsConfig } from '../../../Select'

export interface ValuesMultiselectProps {
	id: string
	index: number
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: SelectOptionsConfig
	selectedFilterKey?: string
}
