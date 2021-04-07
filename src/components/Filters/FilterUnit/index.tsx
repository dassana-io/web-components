import { FilterOption } from 'api'
import { FiltersListItem } from '../types'
import { IconButton } from '../../IconButton'
import { useFiltersContext } from '../FiltersContext'
import { useFilterUnitStyles } from '../styles'
import { ValuesMultiSelectProps } from './ValuesMultiSelect/types'
import { ClientSideValuesMS, ServerSideValuesMS } from './ValuesMultiSelect'
import { formatFilterStrToSelectOpts, getFilterKeysOptions } from '../utils'
import { MultiSelectProps, Select } from '../../Select'
import React, { FC, useEffect, useState } from 'react'

interface FilterUnitProps
	extends Pick<
		FiltersListItem,
		'id' | 'selectedKey' | 'selectedOperator' | 'selectedValues'
	> {
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
}

const FilterUnit: FC<FilterUnitProps> = ({
	id,
	onDelete,
	onFilterChange,
	selectedKey,
	selectedOperator,
	selectedValues
}: FilterUnitProps) => {
	const { allFilters, config, filtersList, mode } = useFiltersContext()

	const classes = useFilterUnitStyles()

	const [operators, setOperators] = useState(['='])
	const [optionsConfig, setOptionsConfig] = useState<
		MultiSelectProps['optionsConfig']
	>()

	useEffect(() => {
		const filterOption: FilterOption = allFilters[selectedKey || '']
		// When the selectedKey changes, get operators
		const operatorArr = filterOption?.operator

		// If BE provides operators, update the operators saved in state
		if (operatorArr && operatorArr.length) {
			setOperators(operatorArr)
		}

		// When selectedKey changes, the first item in operators should be selected
		// We need to call onFilterChange so we can keep track of the selected operator
		onFilterChange({
			id,
			selectedOperator: operatorArr ? operatorArr[0] : operators[0]
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allFilters, id, selectedKey])

	useEffect(() => {
		const iconConfig = config?.iconConfig

		// if iconConfig exists in FiltersConfig and the filterKey in the
		// iconConfig matches the selectedKey, use iconConfig.iconMap
		// to define optionsConfig and save it to state. It'll be passed to
		// Filter Values MultiSelect (rendered in renderValues()).
		if (iconConfig && selectedKey === iconConfig.filterKey) {
			setOptionsConfig({
				iconMap: iconConfig.iconMap
			})
		}
	}, [config, selectedKey])

	const renderOperator = () => (
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
			value={selectedOperator || operators[0]}
		/>
	)

	const renderKey = () => (
		<Select
			disabled={!!selectedKey}
			matchSelectedContentWidth={125}
			onChange={selectedKey => {
				onFilterChange({
					id,
					selectedKey: (selectedKey as unknown) as string
				})
			}}
			options={formatFilterStrToSelectOpts(
				getFilterKeysOptions(allFilters, filtersList)
			)}
			placeholder='Select Value'
			showSearch
			value={selectedKey}
		/>
	)

	const renderValues = () => {
		const commonProps: ValuesMultiSelectProps = {
			id,
			onFilterChange,
			optionsConfig,
			selectedKey,
			selectedValues
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
