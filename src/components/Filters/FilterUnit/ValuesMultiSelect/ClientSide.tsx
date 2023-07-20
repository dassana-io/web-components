import { formatFilterValsToSelectOpts } from '../../utils'
import { getMultiSelectProps } from './utils'
import { type ValuesMultiSelectProps } from './types'
import { MultiSelect, type SelectOption } from '../../../Select'
import React, { type FC, useEffect, useState } from 'react'

export const ClientSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	filterOptValues,
	onFilterChange,
	optionsConfig,
	selectedKey,
	selectedValues = [],
	windowWidth
}: ValuesMultiSelectProps) => {
	const [options, setOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		// if a filter key has been selected and the filter values exist,
		// format it and save it to state as options
		if (selectedKey && filterOptValues) {
			const formattedOpts = formatFilterValsToSelectOpts(
				filterOptValues,
				!!optionsConfig
			)

			setOptions(formattedOpts)
		}
	}, [filterOptValues, optionsConfig, selectedKey])

	return (
		<MultiSelect
			{...getMultiSelectProps({
				id,
				multiSelectProps: { options, optionsConfig },
				onFilterChange,
				selectedValues,
				windowWidth
			})}
		/>
	)
}
