import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../utils'
import { FiltersList, FiltersListItem, ProcessedFilters } from '../types'
import { MultiSelect, MultiSelectProps, SelectOption } from 'components/Select'
import React, { FC, useEffect, useState } from 'react'

interface Props {
	allFilters: ProcessedFilters
	id: string
	index: number
	onFilterChange: (filtersListItem: FiltersListItem) => void
	optionsConfig?: MultiSelectProps['optionsConfig']
	filtersList: FiltersList
	selectedFilterKey?: string
}

export const ClientSide: FC<Props> = ({
	allFilters,
	filtersList,
	id,
	index,
	onFilterChange,
	optionsConfig,
	selectedFilterKey
}: Props) => {
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
