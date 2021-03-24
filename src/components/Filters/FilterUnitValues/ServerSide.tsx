import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../utils'
import uniqBy from 'lodash/uniqBy'
import {
	FiltersList,
	FiltersListItem,
	OnSearchWrapper,
	ProcessedFilters
} from '../types'
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

	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	onSearchWrapper: OnSearchWrapper
	pending?: boolean
}

export const ServerSide: FC<Props> = ({
	allFilters,
	filtersList,
	id,
	index,
	onFilterChange,
	selectedFilterKey,
	dynamicOptions,
	dynamicSearchVal,
	onSearchWrapper,
	optionsConfig,
	pending
}: Props) => {
	const [valuesOptions, setValuesOptions] = useState<SelectOption[]>([])
	const [dynamicFilterProps, setDynamicFilterProps] = useState<
		Pick<MultiSelectProps, 'searchPlaceholder' | 'onSearch' | 'pending'>
	>({})

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']

		if (selectedFilterKey && filterOption.values) {
			// if filter is static, options will be the opts that BE initially gave
			if (filterOption.staticFilter) {
				const options = formatFilterValsToSelectOpts(
					filterOption.values,
					!!optionsConfig
				)

				setValuesOptions(options)
			} else {
				// if filter is dynamic & state is pending, data is still being fetched so options will be empty []. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						const options = formatFilterValsToSelectOpts(
							filterOption.values
						)

						setValuesOptions(options)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal) setValuesOptions(dynamicOptions)
						// if there is no search val but dynamic options exist - along with options that BE initially gave, make sure to add the selected values(if they exist)
						else {
							const filtersListItem = filtersList.find(
								item => item.selectedKey === selectedFilterKey
							)

							let selectedVals: SelectOption[] = []

							if (
								filtersListItem &&
								filtersListItem.selectedValues
							) {
								selectedVals = filtersListItem.selectedValues
							}

							const options = uniqBy(
								[
									...formatFilterValsToSelectOpts([
										...filterOption.values
									]),
									...selectedVals
								],
								'value'
							)

							setValuesOptions(options)
						}
					}
				}

				// these dynamic filter props should be there for all dynamic filters
				setDynamicFilterProps({
					onSearch: onSearchWrapper(selectedFilterKey),
					searchPlaceholder: 'This one hits BE...'
				})
			}
		}
	}, [
		allFilters,
		filtersList,
		optionsConfig,
		dynamicOptions,
		dynamicSearchVal,
		onSearchWrapper,
		pending,
		selectedFilterKey
	])

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
			pending={pending}
			placeholder='Select field'
			searchPlaceholder='Search'
			showSearch
			values={
				filtersList[index].selectedValues?.map(
					values => values.value
				) || []
			}
			{...dynamicFilterProps}
		/>
	)
}
