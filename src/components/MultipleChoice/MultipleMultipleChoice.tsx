import { BaseMultipleChoice } from './BaseMultipleChoice'
import { MultipleMultipleChoiceProps } from './types'
import { getInitialSelectedValues, getSelectedValuesArr } from './utils'
import React, { FC, useCallback, useState } from 'react'

export const MultipleMultipleChoice: FC<MultipleMultipleChoiceProps> = ({
	classes = [],
	dataTag,
	defaultValues,
	getEventTarget,
	items,
	loading = false,
	onChange,
	popupContainerSelector,
	skeletonItemCount = 4,
	values
}: MultipleMultipleChoiceProps) => {
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
			classes={classes}
			dataTag={dataTag}
			getEventTarget={getEventTarget}
			items={items}
			loading={loading}
			mode={'multiple'}
			onSelectedChange={onSelectedChange}
			popupContainerSelector={popupContainerSelector}
			skeletonItemCount={skeletonItemCount}
			values={selectedValues}
		/>
	)
}
