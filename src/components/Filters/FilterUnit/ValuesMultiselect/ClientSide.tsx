import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../../utils'
import { useFiltersContext } from '../../FiltersContext'
import { ValuesMultiselectProps } from './types'
import { MultiSelect, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ClientSideValuesMS: FC<ValuesMultiselectProps> = ({
	id,
	index,
	onFilterChange,
	optionsConfig,
	selectedFilterKey
}: ValuesMultiselectProps) => {
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
