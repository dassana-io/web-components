import { MultipleMultipleChoice } from './MultipleMultipleChoice'
import { SingleMultipleChoice } from './SingleMultipleChoice'
import { MultipleChoiceProps, MultipleProps, SingleProps } from './types'
import React, { FC } from 'react'

export const MultipleChoice: FC<MultipleChoiceProps> = ({
	defaultValue,
	value,
	mode,
	onChange,
	...rest
}: MultipleChoiceProps) => {
	const singleProps = {
		defaultValue,
		onChange,
		value
	}

	const multipleProps = {
		defaultValues: defaultValue,
		onChange,
		values: value
	}

	return mode === 'single' ? (
		<SingleMultipleChoice
			{...rest}
			{...(singleProps as Partial<SingleProps>)}
		/>
	) : (
		<MultipleMultipleChoice
			{...rest}
			{...(multipleProps as Partial<MultipleProps>)}
		/>
	)
}

export type { MultipleChoiceItemConfig, MultipleChoiceProps } from './types'
