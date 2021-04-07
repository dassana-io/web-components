import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../../utils'
import uniqBy from 'lodash/uniqBy'
import { useFiltersContext } from '../../FiltersContext'
import { ValuesMultiSelectProps } from './types'
import { MultiSelect, MultiSelectProps, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ServerSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	index,
	onFilterChange,
	selectedFilterKey,
	optionsConfig
}: ValuesMultiSelectProps) => {
	const {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		filtersList,
		onSearchWrapper,
		pending
	} = useFiltersContext()

	const [dynamicFilterProps, setDynamicFilterProps] = useState<
		Pick<MultiSelectProps, 'searchPlaceholder' | 'onSearch' | 'pending'>
	>({})
	const [options, setOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']

		if (selectedFilterKey && filterOption.values) {
			// if filter is static, options will be the opts that BE initially gave
			if (filterOption.staticFilter) {
				const formattedOpts = formatFilterValsToSelectOpts(
					filterOption.values,
					!!optionsConfig
				)

				setOptions(formattedOpts)
			} else {
				// if filter is dynamic & state is pending, data is still being fetched. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						const formattedOpts = formatFilterValsToSelectOpts(
							filterOption.values,
							!!optionsConfig
						)

						setOptions(formattedOpts)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal) setOptions(dynamicOptions)
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

							const formattedOpts = uniqBy(
								[
									...formatFilterValsToSelectOpts(
										[...filterOption.values],
										!!optionsConfig
									),
									...selectedVals
								],
								'value'
							)

							setOptions(formattedOpts)
						}
					}
				}

				// these dynamic filter props should be there for all dynamic filters
				setDynamicFilterProps({
					onSearch: onSearchWrapper
						? onSearchWrapper(selectedFilterKey)
						: undefined,
					pending,
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
			{...dynamicFilterProps}
		/>
	)
}
