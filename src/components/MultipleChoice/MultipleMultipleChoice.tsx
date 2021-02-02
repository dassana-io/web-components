import { BaseMultipleChoice } from './BaseMultipleChoice'
import { MultipleProps } from './types'
import { getInitialSelectedValues, getSelectedValuesArr } from './utils'
import React, { FC, useCallback, useState } from 'react'

export const MultipleMultipleChoice: FC<MultipleProps> = (
	props: MultipleProps
) => {
	const { defaultValues, items, onChange, values } = props

	const [selectedValues, setSelectedValues] = useState<
		Record<string, boolean>
	>(getInitialSelectedValues(values ? values : defaultValues))

	const onSelectedChange = useCallback(
		(value: string) => {
			const newSelectedValues = {
				...selectedValues,
				[value]: !selectedValues[value]
			}

			setSelectedValues(newSelectedValues)

			if (onChange)
				onChange(getSelectedValuesArr(items, newSelectedValues))
		},
		[items, onChange, selectedValues]
	)

	if (values && !onChange) {
		throw new Error('Controlled components require an onChange prop')
	}

	return (
		<BaseMultipleChoice
			{...props}
			isSelected={value => selectedValues[value]}
			items={items}
			mode='multiple'
			onSelectedChange={onSelectedChange}
			values={selectedValues}
		/>
	)
}