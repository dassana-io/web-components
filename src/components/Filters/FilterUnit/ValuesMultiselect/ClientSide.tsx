import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../../utils'
import { useFiltersContext } from '../../FiltersContext'
import { ValuesMultiSelectProps } from './types'
import { MultiSelect, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ClientSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	index,
	onFilterChange,
	optionsConfig,
	selectedFilterKey
}: ValuesMultiSelectProps) => {
	const { allFilters, filtersList } = useFiltersContext()

	const [options, setOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']
		// if a filter key has been selected and the filter values exist,
		// format it and save it to state as options
		if (selectedFilterKey && filterOption.values) {
			const formattedOpts = formatFilterValsToSelectOpts(
				filterOption.values,
				!!optionsConfig
			)

			setOptions(formattedOpts)
		}
	}, [allFilters, optionsConfig, selectedFilterKey])

	return (
		<MultiSelect
			disabled={!options.length}
			matchSelectedContentWidth={225}
			maxTagCount={5}
			onChange={(_, options) =>
				onFilterChange({
					id,
					selectedValues: options
				})
			}
			options={options}
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
