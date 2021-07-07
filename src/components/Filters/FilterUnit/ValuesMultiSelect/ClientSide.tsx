import { formatFilterValsToSelectOpts } from '../../utils'
import { getMultiSelectProps } from './utils'
import { ValuesMultiSelectProps } from './types'
import { MultiSelect, SelectOption } from '../../../Select'
import React, { FC, useEffect, useState } from 'react'

export const ClientSideValuesMS: FC<ValuesMultiSelectProps> = ({
	id,
	isMobile,
	filterOptValues,
	onFilterChange,
	optionsConfig,
	selectedKey,
	selectedValues = []
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
				isMobile,
				multiSelectProps: { options, optionsConfig },
				onFilterChange,
				selectedValues
			})}
		/>
	)
}
