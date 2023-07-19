import { type FiltersListItem } from '../../types'

export interface ValuesInputProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	windowWidth?: number
}
