import { FilterOption } from 'api'
import { IconButton } from '../../IconButton'
import { useFiltersContext } from '../FiltersContext'
import { useFilterUnitStyles } from '../styles'
import { ClientSideValuesMS, ServerSideValuesMS } from './ValuesMultiselect'
import { FiltersListItem, FiltersModeProps } from '../types'
import { formatFilterStrToSelectOpts, getFilterKeysOptions } from '../utils'
import { MultiSelectProps, Select } from '../../Select'
import React, { FC, useEffect, useState } from 'react'

interface FilterUnitProps extends FiltersModeProps {
	id: string
	index: number
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
}

const FilterUnit: FC<FilterUnitProps> = ({
	id,
	index,
	onDelete,
	onFilterChange,
	mode
}: FilterUnitProps) => {
	const { allFilters, config, filtersList } = useFiltersContext()

	const classes = useFilterUnitStyles()

	const [optionsConfig, setOptionsConfig] = useState<
		MultiSelectProps['optionsConfig']
	>()
	const [selectedFilterKey, setSelectedFilterKey] = useState<string>()

	useEffect(() => {
		if (filtersList[index] && 'selectedKey' in filtersList[index]) {
			setSelectedFilterKey(filtersList[index].selectedKey)
		}
	}, [filtersList, index])

	useEffect(() => {
		const iconConfig = config?.iconConfig

		// if iconConfig exists in FiltersConfig and the filterKey in the
		// iconConfig matches the selectedFilterKey, use iconConfig.iconMap
		// to define optionsConfig and save it to state. It'll be passed to
		// Filter Values MultiSelect (rendered in renderValues()).
		if (iconConfig && selectedFilterKey === iconConfig.filterKey) {
			setOptionsConfig({
				iconMap: iconConfig.iconMap
			})
		}
	}, [config, selectedFilterKey])

	const renderOperator = () => {
		const filterOption: FilterOption = allFilters[selectedFilterKey || '']
		// If BE doesn't provide an operator array, the operator will be '='.
		// The operator will also be '=' for Client Side filters.
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
		const commonProps = {
			id,
			index,
			onFilterChange,
			optionsConfig,
			selectedFilterKey
		}

		return mode === 'frontend' ? (
			<ClientSideValuesMS {...commonProps} />
		) : (
			<ServerSideValuesMS {...commonProps} />
		)
	}

	return (
		<div className={classes.container}>
			<div className={classes.singleSelectContainer}>{renderKey()}</div>
			<div>{renderOperator()}</div>
			<div className={classes.multiSelectContainer}>{renderValues()}</div>
			<IconButton onClick={() => onDelete(id)} />
		</div>
	)
}

export default FilterUnit
