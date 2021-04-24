import Fuse from 'fuse.js'
import { MultiSelectProps } from './types'
import { SelectOption } from '../SingleSelect/types'
import sortBy from 'lodash/sortBy'

const filterOptions = (
	fuse: Fuse<SelectOption>,
	options: SelectOption[],
	value?: string
) => {
	if (!value) {
		return options
	}

	const filteredOptions = fuse
		.search(value)
		.map(({ item }: Fuse.FuseResult<SelectOption>): SelectOption => item)

	return filteredOptions
}

// ----------------------------------------

export const groupOptions = (
	ungroupedOpts: SelectOption[],
	localValues: string[]
) => {
	const selected: SelectOption[] = []
	const unselected: SelectOption[] = []

	for (const opt of ungroupedOpts) {
		localValues.find(checkedVal => checkedVal === opt.value)
			? selected.push(opt)
			: unselected.push(opt)
	}

	return { selected, unselected }
}

const groupAndSortOptions = (
	ungroupedOpts: SelectOption[],
	localValues: string[]
) => {
	const { selected, unselected } = groupOptions(ungroupedOpts, localValues)

	return [
		...sortBy(selected, [option => option.text.toUpperCase()]),
		...sortBy(unselected, [option => option.text.toUpperCase()])
	]
}

// ----------------------------------------

interface GetSortedAndFilteredValuesArgs
	extends Pick<MultiSelectProps, 'onSearch' | 'options'> {
	fuse: Fuse<SelectOption>
	localValues: string[]
	searchTerm: string
}

export const getSortedAndFilteredValues = ({
	fuse,
	onSearch,
	options,
	localValues,
	searchTerm
}: GetSortedAndFilteredValuesArgs) => {
	const sortedValues = groupAndSortOptions(options, localValues)

	const sortedAndFilteredValues = onSearch
		? sortedValues
		: filterOptions(fuse, sortedValues, searchTerm)

	return sortedAndFilteredValues
}

// ----------------------------------------
