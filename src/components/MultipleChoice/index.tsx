import { MultipleChoiceProps } from './types'
import { MultipleMultipleChoice } from './MultipleMultipleChoice'
import { SingleMultipleChoice } from './SingleMultipleChoice'
import React, { FC } from 'react'

export const MultipleChoice: FC<MultipleChoiceProps> = (
	props: MultipleChoiceProps
) => {
	return props.mode === 'single' ? (
		<SingleMultipleChoice {...props} mode={'single'} />
	) : (
		<MultipleMultipleChoice {...props} mode={'multiple'} />
	)
}

export type { MultipleChoiceItemConfig, MultipleChoiceProps } from './types'
