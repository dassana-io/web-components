import { FilterOption } from 'api'
import { FiltersListItem } from '../types'
import { formatFilterValsToSelectOpts } from '../utils'
import { useFiltersContext } from '../FiltersContext'
import { MultiSelect, MultiSelectProps, SelectOption } from 'components/Select'
import React, { FC, useEffect, useState } from 'react'

interface Props {
	id: string
	index: number
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: MultiSelectProps['optionsConfig']
	selectedFilterKey?: string
}

export const ClientSide: FC<Props> = ({
	id,
	index,
	onFilterChange,
	optionsConfig,
	selectedFilterKey
}: Props) => {
	const { allFilters, filtersList } = useFiltersContext()

	const [valuesOptions, setValuesOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']

		if (selectedFilterKey && filterOption.values) {
			const options = formatFilterValsToSelectOpts(
				filterOption.values,
				!!optionsConfig
			)
			setValuesOptions(options)
		}
	}, [allFilters, optionsConfig, selectedFilterKey])

	return (
		<MultiSelect
			disabled={!valuesOptions.length}
			matchSelectedContentWidth={225}
			maxTagCount={5}
			onChange={(_, options) =>
				onFilterChange({
					id,
					selectedValues: options
				})
			}
			options={valuesOptions}
			optionsConfig={optionsConfig}
			placeholder='Select field'
			searchPlaceholder='Search'
			showSearch
			values={
				filtersList[index].selectedValues?.map(
					values => values.value
				) || []
			}
		/>
	)
}
