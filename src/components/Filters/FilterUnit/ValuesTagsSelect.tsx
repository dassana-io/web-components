import { type FiltersListItem } from '../types'
import { TagsSelect } from 'components/Select'
import React, { type FC, useMemo } from 'react'

interface ValuesTagsSelectProps
	extends Pick<FiltersListItem, 'id' | 'selectedKey' | 'selectedValues'> {
	onFilterChange: (filtersListItem: FiltersListItem) => void
	windowWidth?: number
}

export const ValuesTagsSelect: FC<ValuesTagsSelectProps> = ({
	id,
	onFilterChange,
	selectedValues = []
}: ValuesTagsSelectProps) => {
	const inputValues = useMemo(
		() => selectedValues.map(values => values.value),
		[selectedValues]
	)

	const handleInputChange = (values: string[]) => {
		onFilterChange({
			id,
			selectedValues: values.map(value => ({ text: value, value }))
		})
	}

	return <TagsSelect onChange={handleInputChange} values={inputValues} />
}
