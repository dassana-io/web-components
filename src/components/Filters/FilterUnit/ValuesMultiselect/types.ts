import { FiltersListItem } from '../../../Filters/types'
import { MultiSelectProps } from '../../../Select'

export interface ValuesMultiselectProps {
	id: string
	index: number
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: MultiSelectProps['optionsConfig']
	selectedFilterKey?: string
}
