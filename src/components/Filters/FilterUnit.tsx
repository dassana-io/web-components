import { faEquals } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import uniq from 'lodash/uniq'
import { useFilterUnitStyles } from './styles'
import {
	FilterOption,
	FiltersList,
	OnSearchWrapper,
	ProcessedFilters
} from './types'
import { formatFilterOptions, getFilterKeysOptions } from './utils'
import { MultiSelect, Select, SelectOption } from 'components/Select'
import React, { FC } from 'react'

interface FilterUnitProps {
	allFilters: ProcessedFilters
	dynamicOptions?: SelectOption[]
	dynamicSearchVal: string
	id: string
	index: number
	onDelete: (selectedId: string) => void
	onFilterChange: (selectedId: string, selection: string | string[]) => void
	filtersList: FiltersList
	onSearchWrapper: OnSearchWrapper
	pending: boolean
}

const FilterUnit: FC<FilterUnitProps> = ({
	id,
	index,
	allFilters = {},
	dynamicOptions,
	dynamicSearchVal,
	filtersList = [],
	onDelete,
	onFilterChange,
	onSearchWrapper,
	pending
}: FilterUnitProps) => {
	const classes = useFilterUnitStyles()

	const selectedFilterKey = filtersList[index].selectedKey

	const renderKey = () => (
		<Select
			disabled={!!selectedFilterKey}
			matchSelectedContentWidth={125}
			onChange={selectedValue =>
				onFilterChange(id, (selectedValue as unknown) as string)
			}
			options={formatFilterOptions(
				getFilterKeysOptions(allFilters, filtersList)
			)}
			placeholder='Select Value'
			showSearch
			value={selectedFilterKey}
		/>
	)

	const renderValues = () => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']

		let options: SelectOption[] = []
		let dynamicFilterProps = {}

		if (selectedFilterKey && filterOption.options) {
			// if filter is static, options will be the opts that BE initially gave
			if (filterOption.staticFilter) {
				options = formatFilterOptions(filterOption.options)
			} else {
				// if filter is dynamic & state is pending, data is still being fetched so options will be empty []. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						options = formatFilterOptions(filterOption.options)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal) options = dynamicOptions
						// if there is no search val but dynamic options exist - along with options that BE initially gave, make sure to add the selected values(if they exist)
						else {
							const filtersListItem = filtersList.find(
								item => item.selectedKey === selectedFilterKey
							)

							let selectedVals: string[] = []

							if (
								filtersListItem &&
								filtersListItem.selectedValues
							)
								selectedVals = filtersListItem.selectedValues

							options = formatFilterOptions(
								uniq([...filterOption.options, ...selectedVals])
							)
						}
					}
				}

				// these dynamic filter props should be there for all dynamic filters
				dynamicFilterProps = {
					onSearch: onSearchWrapper(selectedFilterKey),
					pending,
					searchPlaceholder: 'This one hits BE...'
				}
			}
		}

		return (
			<MultiSelect
				disabled={!options.length && !pending}
				matchSelectedContentWidth={225}
				maxTagCount={5}
				onChange={(values: string[]) => onFilterChange(id, values)}
				options={options}
				placeholder='Select field'
				searchPlaceholder='Search'
				showSearch
				values={filtersList[index].selectedValues || []}
				{...dynamicFilterProps}
			/>
		)
	}

	return (
		<div className={classes.container}>
			<div className={classes.singleSelectContainer}>{renderKey()}</div>
			<FontAwesomeIcon icon={faEquals} size='xs' />
			<div className={classes.multiSelectContainer}>{renderValues()}</div>
			<IconButton onClick={() => onDelete(id)} />
		</div>
	)
}

export default FilterUnit
