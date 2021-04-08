import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../../utils'
import { useFiltersContext } from '../../FiltersContext'
import { ValuesMultiSelectProps } from './types'
import { MultiSelect, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ClientSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	onFilterChange,
	optionsConfig,
	selectedKey,
	selectedValues = []
}: ValuesMultiSelectProps) => {
	const { allFilters } = useFiltersContext()

	const [options, setOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedKey || '']
		// if a filter key has been selected and the filter values exist,
		// format it and save it to state as options
		if (selectedKey && filterOption.values) {
			const formattedOpts = formatFilterValsToSelectOpts(
				filterOption.values,
				!!optionsConfig
			)

			setOptions(formattedOpts)
		}
	}, [allFilters, optionsConfig, selectedKey])

	return (
		<MultiSelect
			disabled={!options.length}
			matchSelectedContentWidth={225}
			maxTagCount={5}
			onChange={vals =>
				onFilterChange({
					id,
					selectedValues: options.filter(opt =>
						vals.includes(opt.value)
					)
				})
			}
			options={options}
			optionsConfig={optionsConfig}
			placeholder='Select field'
			searchPlaceholder='Search'
			showSearch
			values={selectedValues.map(values => values.value)}
		/>
	)
}
