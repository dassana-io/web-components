import { BaseMultipleChoice } from './BaseMultipleChoice'
import { getInitialSelectedValue } from './utils'
import { SingleMultiChoiceProps } from './types'
import React, { FC, Key, useCallback, useState } from 'react'

export const SingleMultipleChoice: FC<SingleMultiChoiceProps> = ({
	classes = [],
	dataTag,
	defaultValue,
	getEventTarget,
	items,
	loading = false,
	onChange,
	popupContainerSelector,
	skeletonItemCount = 4,
	value
}: SingleMultiChoiceProps) => {
	const [selectedValue, setSelectedValue] = useState<Key>(
		getInitialSelectedValue(value ? value : defaultValue)
	)

	const onSelectedChange = useCallback(
		(value: Key) => {
			setSelectedValue(value)

			if (onChange) onChange(value)
		},
		[onChange]
	)

	if (value && !onChange) {
		throw new Error('Controlled components require an onChange prop')
	}

	return (
		<BaseMultipleChoice
			classes={classes}
			dataTag={dataTag}
			getEventTarget={getEventTarget}
			items={items}
			loading={loading}
			mode={'single'}
			onSelectedChange={onSelectedChange}
			popupContainerSelector={popupContainerSelector}
			skeletonItemCount={skeletonItemCount}
			value={selectedValue}
		/>
	)
}
