import { FilterOption } from 'api'
import { formatFilterValsToSelectOpts } from '../../utils'
import uniqBy from 'lodash/uniqBy'
import { useFiltersContext } from '../../FiltersContext'
import { ValuesMultiSelectProps } from './types'
import { MultiSelect, MultiSelectProps, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ServerSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	onFilterChange,
	selectedKey,
	optionsConfig,
	selectedValues = []
}: ValuesMultiSelectProps) => {
	const {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		onSearchWrapper,
		pending
	} = useFiltersContext()

	const [dynamicFilterProps, setDynamicFilterProps] = useState<
		Pick<MultiSelectProps, 'searchPlaceholder' | 'onSearch' | 'pending'>
	>({})
	const [options, setOptions] = useState<SelectOption[]>(selectedValues)

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedKey || '']

		if (selectedKey && filterOption.values) {
			// if filter is static, options will be the opts that BE initially gave
			if (filterOption.staticFilter) {
				const formattedOpts = formatFilterValsToSelectOpts(
					filterOption.values,
					!!optionsConfig
				)

				setOptions(
					uniqBy([...selectedValues, ...formattedOpts], 'value')
				)
			} else {
				// if filter is dynamic & state is pending, data is still being fetched. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						const formattedOpts = formatFilterValsToSelectOpts(
							filterOption.values,
							!!optionsConfig
						)

						setOptions(
							uniqBy(
								[...selectedValues, ...formattedOpts],
								'value'
							)
						)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal)
							setOptions(
								uniqBy(
									[...selectedValues, ...dynamicOptions],
									'value'
								)
							)
						// if there is no search val but dynamic options exist - along with options that BE initially gave, make sure to add the selected values(if they exist)
						else {
							const formattedOpts = uniqBy(
								[
									...formatFilterValsToSelectOpts(
										[...filterOption.values],
										!!optionsConfig
									),
									...selectedValues
								],
								'value'
							)

							setOptions(
								uniqBy(
									[...selectedValues, ...formattedOpts],
									'value'
								)
							)
						}
					}
				}

				// these dynamic filter props should be there for all dynamic filters
				setDynamicFilterProps({
					onSearch: onSearchWrapper
						? onSearchWrapper(selectedKey)
						: undefined,
					pending,
					searchPlaceholder: 'This one hits BE...'
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		onSearchWrapper,
		optionsConfig,
		pending,
		selectedKey
	])

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
			{...dynamicFilterProps}
		/>
	)
}
