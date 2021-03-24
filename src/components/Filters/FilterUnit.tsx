import { FilterOption } from 'api'
import { IconButton } from 'components/IconButton'
import uniqBy from 'lodash/uniqBy'
import { useFilterUnitStyles } from './styles'
import {
	FiltersConfig,
	FiltersList,
	FiltersListItem,
	OnSearchWrapper,
	ProcessedFilters
} from './types'
import {
	formatFilterStrToSelectOpts,
	formatFilterValsToSelectOpts,
	getFilterKeysOptions
} from './utils'
import { MultiSelect, Select, SelectOption } from 'components/Select'
import React, { FC } from 'react'

interface SharedProps {
	allFilters: ProcessedFilters
	config?: FiltersConfig
	id: string
	index: number
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	filtersList: FiltersList
}

interface ClientProps extends SharedProps {
	type: 'frontend'
}

interface ServerProps extends SharedProps {
	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	onSearchWrapper: OnSearchWrapper
	pending?: boolean
	type: 'backend'
}

type FilterUnitProps = ClientProps | ServerProps

const FilterUnit: FC<FilterUnitProps> = ({
	id,
	index,
	allFilters = {},
	config,
	filtersList = [],
	onDelete,
	onFilterChange,
	...rest
}: FilterUnitProps) => {
	const classes = useFilterUnitStyles()

	const selectedFilterKey = filtersList[index].selectedKey

	const renderOperators = () => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']
		const operators = filterOption?.operator || ['=']

		return (
			<Select
				disabled={operators.length === 1}
				matchSelectedContentWidth={50}
				onChange={selectedOperator =>
					onFilterChange({
						id,
						selectedOperator: (selectedOperator as unknown) as string
					})
				}
				options={formatFilterStrToSelectOpts(operators)}
				showSearch
				value={filtersList[index]?.selectedOperator || operators[0]}
			/>
		)
	}

	const renderKey = () => (
		<Select
			disabled={!!selectedFilterKey}
			matchSelectedContentWidth={125}
			onChange={selectedKey =>
				onFilterChange({
					id,
					selectedKey: (selectedKey as unknown) as string
				})
			}
			options={formatFilterStrToSelectOpts(
				getFilterKeysOptions(allFilters, filtersList)
			)}
			placeholder='Select Value'
			showSearch
			value={selectedFilterKey}
		/>
	)

	const renderValues = () => {
		const iconConfig = config?.iconConfig

		let optionsConfig

		if (iconConfig && selectedFilterKey === iconConfig.filterKey) {
			optionsConfig = {
				iconMap: iconConfig.iconMap
			}
		}

		const filterOption: FilterOption = allFilters[selectedFilterKey || '']

		let options: SelectOption[] = []
		let dynamicFilterProps = {}

		if (selectedFilterKey && filterOption.values) {
			// if filter is static, options will be the opts that BE initially gave
			if (filterOption.staticFilter || rest.type === 'frontend') {
				options = formatFilterValsToSelectOpts(
					filterOption.values,
					!!optionsConfig
				)
			} else {
				const {
					dynamicOptions,
					dynamicSearchVal,
					onSearchWrapper,
					pending
				} = rest
				// if filter is dynamic & state is pending, data is still being fetched so options will be empty []. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						options = formatFilterValsToSelectOpts(
							filterOption.values
						)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal) options = dynamicOptions
						// if there is no search val but dynamic options exist - along with options that BE initially gave, make sure to add the selected values(if they exist)
						else {
							const filtersListItem = filtersList.find(
								item => item.selectedKey === selectedFilterKey
							)

							let selectedVals: SelectOption[] = []

							if (
								filtersListItem &&
								filtersListItem.selectedValues
							)
								selectedVals = filtersListItem.selectedValues

							options = uniqBy(
								[
									...formatFilterValsToSelectOpts([
										...filterOption.values
									]),
									...selectedVals
								],
								'value'
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

	return (
		<div className={classes.container}>
			<div className={classes.singleSelectContainer}>{renderKey()}</div>
			<div>{renderOperators()}</div>
			<div className={classes.multiSelectContainer}>{renderValues()}</div>
			<IconButton onClick={() => onDelete(id)} />
		</div>
	)
}

export default FilterUnit
