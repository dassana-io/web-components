import { BaseMultipleChoice } from './BaseMultipleChoice'
import { type MultipleProps } from './types'
import {
	getInitialSelectedValues,
	getSelectedValuesArr,
	type MultipleSelectedValues,
	selectedValsArrToObj
} from './utils'
import React, { type FC, useCallback, useEffect, useState } from 'react'

export const MultipleMultipleChoice: FC<MultipleProps> = (
	props: MultipleProps
) => {
	const { defaultValues, items, onChange, values } = props

	const [selectedValues, setSelectedValues] =
		useState<MultipleSelectedValues>(
			getInitialSelectedValues(values ?? defaultValues)
		)

	useEffect(() => {
		if (values) setSelectedValues(selectedValsArrToObj(values))
	}, [values])

	const onSelectedChange = useCallback(
		(value: string) => {
			const newSelectedValues = {
				...selectedValues,
				[value]: !selectedValues[value]
			}

			if (onChange) {
				onChange(getSelectedValuesArr(items, newSelectedValues))
			} else {
				setSelectedValues(newSelectedValues)
			}
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
