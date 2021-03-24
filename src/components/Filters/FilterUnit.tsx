import { FilterOption } from 'api'
import { IconButton } from 'components/IconButton'
import { useFilterUnitStyles } from './styles'
import { ClientSide, ServerSide } from './FilterUnitValues'
import {
	FiltersConfig,
	FiltersList,
	FiltersListItem,
	OnSearchWrapper,
	ProcessedFilters
} from './types'
import { formatFilterStrToSelectOpts, getFilterKeysOptions } from './utils'
import { MultiSelectProps, Select, SelectOption } from 'components/Select'
import React, { FC, useEffect, useState } from 'react'

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
		/>
	)

	const renderValues = () => {
		const commonProps = {
			allFilters,
			config,
			filtersList,
			id,
			index,
			onFilterChange,
			optionsConfig,
			selectedFilterKey
		}

		return rest.type === 'frontend' ? (
			<ClientSide {...commonProps} />
		) : (
			<ServerSide {...commonProps} {...rest} />
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
