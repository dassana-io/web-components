import { BaseMultipleChoice } from './BaseMultipleChoice'
import { getInitialSelectedValue } from './utils'
import { SingleMultiChoiceProps } from './types'
import React, { FC, useCallback, useState } from 'react'

export const SingleMultipleChoice: FC<SingleMultiChoiceProps> = (
	props: SingleMultiChoiceProps
) => {
	const { onChange, defaultValue, value } = props

	const [selectedValue, setSelectedValue] = useState<string>(
		getInitialSelectedValue(value ? value : defaultValue)
	)

	const onSelectedChange = useCallback(
		(value: string) => {
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
			onSelectedChange={onSelectedChange}
			value={selectedValue}
			{...props}
		/>
	)
}
