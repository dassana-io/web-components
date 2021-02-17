import { BaseMultipleChoice } from './BaseMultipleChoice'
import { SingleProps } from './types'
import React, { FC, useCallback, useEffect, useState } from 'react'

export const SingleMultipleChoice: FC<SingleProps> = (props: SingleProps) => {
	const { onChange, defaultValue = '', value } = props

	const [selectedValue, setSelectedValue] = useState<string>(
		value ? value : defaultValue
	)

	useEffect(() => {
		if (value) setSelectedValue(value)
	}, [value])

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
			{...props}
			isSelected={value => selectedValue === value}
			mode='single'
			onSelectedChange={onSelectedChange}
			value={selectedValue}
		/>
	)
}
