import { FilterOption } from 'api'
import { FiltersListItem } from '../types'
import { IconButton } from 'components/IconButton'
import { useFiltersContext } from '../FiltersContext'
import { useFilterUnitStyles } from '../styles'
import { ClientSideValuesMS, ServerSideValuesMS } from './ValuesMultiselect'
import { formatFilterStrToSelectOpts, getFilterKeysOptions } from '../utils'
import { MultiSelectProps, Select } from 'components/Select'
import React, { FC, useEffect, useState } from 'react'

interface FilterUnitProps {
	id: string
	index: number
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	mode: 'backend' | 'frontend'
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
		if (filtersList[index] && filtersList[index].selectedKey)
			setSelectedFilterKey(filtersList[index].selectedKey as string)
	}, [filtersList, index])

	useEffect(() => {
		const iconConfig = config?.iconConfig

		let optionsConfig

		if (iconConfig && selectedFilterKey === iconConfig.filterKey) {
			optionsConfig = {
				iconMap: iconConfig.iconMap
			}
		}

		setOptionsConfig(optionsConfig)
	}, [config, selectedFilterKey])

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
			<div>{renderOperators()}</div>
			<div className={classes.multiSelectContainer}>{renderValues()}</div>
			<IconButton onClick={() => onDelete(id)} />
		</div>
	)
}

export default FilterUnit
